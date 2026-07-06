/**
 * Small shared helpers for the operational scripts in this folder.
 *
 * These scripts are meant to be run from the `api` directory once the
 * supporting services (MongoDB, Hanko) are up, e.g.
 *
 *   npm run seed:profile -- admin@example.com
 *   npm run token:hanko  -- admin@example.com
 */

import * as fs from 'fs';
import * as path from 'path';

/**
 * Best-effort load of `api/.env` into `process.env` so the scripts pick up
 * the same configuration the Nest app reads via `@nestjs/config`. Existing
 * `process.env` values always win (so `MONGO_URI=... npm run ...` overrides
 * the file). Uses `dotenv` when available (it ships transitively with
 * `@nestjs/config`); silently falls back to `process.env` only if it isn't.
 */
export function loadEnv(): void {
  const envPath = path.resolve(__dirname, '..', '.env');
  if (!fs.existsSync(envPath)) return;
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const dotenv = require('dotenv') as { config: (o: object) => void };
    dotenv.config({ path: envPath });
  } catch {
    // dotenv not resolvable — rely on the ambient environment instead.
  }
}

/**
 * Parse `process.argv` into positional args and `--key[=value]` flags.
 * A bare `--flag` (no `=`, or followed by another flag / end of args)
 * is treated as a boolean `true`.
 */
export function parseArgs(argv: string[]): {
  positionals: string[];
  flags: Record<string, string | boolean>;
} {
  const positionals: string[] = [];
  const flags: Record<string, string | boolean> = {};
  const rest = argv.slice(2);

  for (let i = 0; i < rest.length; i++) {
    const token = rest[i];
    if (!token.startsWith('--')) {
      positionals.push(token);
      continue;
    }
    const body = token.slice(2);
    const eq = body.indexOf('=');
    if (eq !== -1) {
      flags[body.slice(0, eq)] = body.slice(eq + 1);
      continue;
    }
    const next = rest[i + 1];
    if (next !== undefined && !next.startsWith('--')) {
      flags[body] = next;
      i++;
    } else {
      flags[body] = true;
    }
  }

  return { positionals, flags };
}

/** Minimal, deliberately permissive email sanity check. */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Resolve the target email from positionals or an `--email` flag. */
export function resolveEmail(
  positionals: string[],
  flags: Record<string, string | boolean>,
): string | undefined {
  const fromFlag = typeof flags.email === 'string' ? flags.email : undefined;
  const email = (fromFlag ?? positionals[0])?.trim();
  return email && email.length > 0 ? email : undefined;
}
