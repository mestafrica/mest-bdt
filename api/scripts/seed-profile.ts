/**
 * Seed a Profile record into the API database.
 *
 * A web admin can only reach the platform once a `Profile` row exists for
 * their signed-in email: `GET /profiles/me` throws 404 otherwise (see
 * src/profiles/profiles.controller.ts). Nothing in the app creates the
 * first Profile automatically, so this script bootstraps it.
 *
 * Usage (from the `api` directory, after MongoDB is up):
 *   npm run seed:profile -- admin@example.com
 *   npm run seed:profile -- --email=admin@example.com
 *
 * Config:
 *   MONGO_URI   MongoDB connection string
 *               (default mongodb://localhost:27017/bdt)
 *
 * The operation is idempotent: re-running for an existing email is a no-op.
 * The email is stored exactly as provided — it must match the address the
 * admin signs in with (Hanko), so use the same value here and at sign-in.
 */

import 'reflect-metadata';
import mongoose from 'mongoose';
import { loadEnv, parseArgs, isValidEmail, resolveEmail } from './lib';
import { Profile, ProfileSchema } from '../src/profiles/schemas/profile.schema';

const DEFAULT_MONGO_URI = 'mongodb://localhost:27017/bdt';

function usage(): void {
  console.error(
    [
      'Seed a Profile record so a web admin can access the platform.',
      '',
      'Usage:',
      '  npm run seed:profile -- <email>',
      '  npm run seed:profile -- --email=<email>',
      '',
      'Environment:',
      `  MONGO_URI   MongoDB connection string (default ${DEFAULT_MONGO_URI})`,
    ].join('\n'),
  );
}

async function main(): Promise<void> {
  loadEnv();

  const { positionals, flags } = parseArgs(process.argv);
  if (flags.help || flags.h) {
    usage();
    return;
  }

  const email = resolveEmail(positionals, flags);
  if (!email) {
    console.error('Error: an email address is required.\n');
    usage();
    process.exitCode = 1;
    return;
  }
  if (!isValidEmail(email)) {
    console.error(
      `Error: "${email}" does not look like a valid email address.`,
    );
    process.exitCode = 1;
    return;
  }

  const uri = process.env.MONGO_URI ?? DEFAULT_MONGO_URI;

  await mongoose.connect(uri);
  try {
    // Reuse the app's schema so this stays in sync with the real model
    // (collection name "Profile", unique email, timestamps).
    const ProfileModel = mongoose.model(Profile.name, ProfileSchema);

    const existing = await ProfileModel.findOne({ email }).exec();
    if (existing) {
      console.log(`Profile already exists for ${email} (id=${existing.id}).`);
      return;
    }

    try {
      const created = await ProfileModel.create({ email });
      console.log(`Created profile for ${email} (id=${created.id}).`);
    } catch (err: unknown) {
      // Lost a race against a concurrent seed: the unique index rejected
      // the insert. Treat as success — the row we wanted now exists.
      if (
        typeof err === 'object' &&
        err !== null &&
        'code' in err &&
        (err as { code?: number }).code === 11000
      ) {
        console.log(`Profile already exists for ${email}.`);
        return;
      }
      throw err;
    }
  } finally {
    await mongoose.disconnect();
  }
}

main().catch((err: unknown) => {
  console.error(
    'Failed to seed profile:',
    err instanceof Error ? err.message : err,
  );
  process.exitCode = 1;
});
