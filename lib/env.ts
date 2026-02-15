const requireEnv = (value: string | undefined, name: string) => {
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}. Add it to .env.local and restart the app.`,
    );
  }

  return value;
};

const requireUrlEnv = (value: string | undefined, name: string) => {
  const raw = requireEnv(value, name);

  try {
    new URL(raw);
  } catch {
    throw new Error(
      `Invalid URL in environment variable: ${name}. Received "${raw}".`,
    );
  }

  return raw;
};

export const env = {
  NEXT_PUBLIC_GOOGLE_BOOKS_API_URL: requireUrlEnv(
    process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_URL,
    "NEXT_PUBLIC_GOOGLE_BOOKS_API_URL",
  ),
};
