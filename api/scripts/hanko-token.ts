/**
 * Generate a Hanko session access token (JWT) for a user by email.
 *
 * Talks to the Hanko *Admin* API (port 8001 by default — see
 * deployment/backend.yml). It looks up the Hanko user by email, creates one
 * if none exists, then creates a session and prints the resulting
 * `session_token`. That token is a JWT signed by the same keys the API's
 * AuthGuard validates via JWKS, so it can be used as
 * `Authorization: Bearer <token>` against the API.
 *
 * Usage (from the `api` directory, after Hanko is up):
 *   npm run token:hanko -- admin@example.com
 *   npm run token:hanko -- --email=admin@example.com --no-create
 *
 * The token is printed on stdout (and nothing else), so it is safe to
 * capture:  TOKEN=$(npm run --silent token:hanko -- admin@example.com)
 * All diagnostics go to stderr.
 *
 * Config:
 *   HANKO_ADMIN_API_URL   Hanko Admin API base URL
 *                         (default http://localhost:8001)
 *
 * Flags:
 *   --no-create           Fail instead of creating a missing Hanko user.
 *   --user-agent=<ua>     Recorded on the created session (optional).
 *   --ip=<addr>           Recorded on the created session (optional).
 */

import { loadEnv, parseArgs, isValidEmail, resolveEmail } from './lib';

const DEFAULT_ADMIN_URL = 'http://localhost:8001';

interface HankoEmail {
  address: string;
  is_primary?: boolean;
}
interface HankoUser {
  id: string;
  emails?: HankoEmail[];
}
interface CreateSessionResponse {
  session_token?: string;
}

function usage(): void {
  console.error(
    [
      'Generate a Hanko session access token (JWT) for a user by email.',
      '',
      'Usage:',
      '  npm run token:hanko -- <email>',
      '  npm run token:hanko -- --email=<email> [--no-create] [--user-agent=<ua>] [--ip=<addr>]',
      '',
      'Environment:',
      `  HANKO_ADMIN_API_URL   Hanko Admin API base URL (default ${DEFAULT_ADMIN_URL})`,
    ].join('\n'),
  );
}

/** Throw a helpful error if a fetch failed to even connect. */
function wrapConnError(err: unknown, base: string): Error {
  const msg = err instanceof Error ? err.message : String(err);
  return new Error(
    `Could not reach the Hanko Admin API at ${base} (${msg}). ` +
      'Is Hanko running, and is HANKO_ADMIN_API_URL pointing at the admin ' +
      'port (8001)?',
  );
}

async function readError(res: Response): Promise<string> {
  const body = await res.text().catch(() => '');
  return `${res.status} ${res.statusText}${body ? ` — ${body}` : ''}`;
}

async function findUserByEmail(
  base: string,
  email: string,
): Promise<HankoUser | undefined> {
  const url = `${base}/users?email=${encodeURIComponent(email)}&per_page=1`;
  let res: Response;
  try {
    res = await fetch(url);
  } catch (err) {
    throw wrapConnError(err, base);
  }
  if (!res.ok) {
    throw new Error(`Failed to look up user: ${await readError(res)}`);
  }
  const data: unknown = await res.json();
  const list: HankoUser[] = Array.isArray(data)
    ? (data as HankoUser[])
    : Array.isArray((data as { data?: unknown }).data)
      ? (data as { data: HankoUser[] }).data
      : [];
  const wanted = email.toLowerCase();
  return (
    list.find((u) =>
      u.emails?.some((e) => e.address?.toLowerCase() === wanted),
    ) ?? list[0]
  );
}

async function createUser(base: string, email: string): Promise<HankoUser> {
  let res: Response;
  try {
    res = await fetch(`${base}/users`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        emails: [{ address: email, is_primary: true, is_verified: true }],
      }),
    });
  } catch (err) {
    throw wrapConnError(err, base);
  }
  if (!res.ok) {
    throw new Error(`Failed to create user: ${await readError(res)}`);
  }
  const user = (await res.json()) as HankoUser;
  if (!user?.id) {
    throw new Error('Hanko create-user response did not include an id.');
  }
  return user;
}

async function createSession(
  base: string,
  userId: string,
  extras: { user_agent?: string; ip_address?: string },
): Promise<string> {
  let res: Response;
  try {
    res = await fetch(`${base}/sessions`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ user_id: userId, ...extras }),
    });
  } catch (err) {
    throw wrapConnError(err, base);
  }
  if (!res.ok) {
    throw new Error(`Failed to create session: ${await readError(res)}`);
  }
  const body = (await res.json()) as CreateSessionResponse;
  if (!body.session_token) {
    throw new Error('Hanko create-session response did not include a token.');
  }
  return body.session_token;
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

  const base = (process.env.HANKO_ADMIN_API_URL ?? DEFAULT_ADMIN_URL).replace(
    /\/+$/,
    '',
  );
  const allowCreate = flags['no-create'] !== true;
  const extras: { user_agent?: string; ip_address?: string } = {};
  if (typeof flags['user-agent'] === 'string')
    extras.user_agent = flags['user-agent'];
  if (typeof flags.ip === 'string') extras.ip_address = flags.ip;

  let user = await findUserByEmail(base, email);
  if (!user) {
    if (!allowCreate) {
      throw new Error(
        `No Hanko user found for ${email} and --no-create was set.`,
      );
    }
    console.error(`No Hanko user for ${email}; creating one...`);
    user = await createUser(base, email);
    console.error(`Created Hanko user (id=${user.id}).`);
  } else {
    console.error(`Found Hanko user for ${email} (id=${user.id}).`);
  }

  const token = await createSession(base, user.id, extras);
  console.error('Session token (JWT):');
  // The token itself is the only thing on stdout, so it can be piped.
  process.stdout.write(`${token}\n`);
}

main().catch((err: unknown) => {
  console.error(
    'Failed to generate token:',
    err instanceof Error ? err.message : err,
  );
  process.exitCode = 1;
});
