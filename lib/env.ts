const requireEnv = (value: string | undefined, name: string) => {
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}. Add it to .env.local and restart the app.`,
    );
  }

  return value;
};

export const env = {
  NEXT_PUBLIC_OPEN_LIBRARY_API_URL: requireEnv(
    process.env.NEXT_PUBLIC_OPEN_LIBRARY_API_URL,
    "NEXT_PUBLIC_OPEN_LIBRARY_API_URL",
  ),
};
