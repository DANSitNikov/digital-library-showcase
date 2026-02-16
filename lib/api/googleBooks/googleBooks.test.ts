import { beforeAll, describe, expect, it } from "vitest";

let getGoogleBooksCover: (imageLinks?: {
  smallThumbnail?: string;
  thumbnail?: string;
  small?: string;
  medium?: string;
  large?: string;
  extraLarge?: string;
}) => string | undefined;

describe("getGoogleBooksCover", () => {
  beforeAll(async () => {
    process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_URL =
      "https://www.googleapis.com/books/v1";

    ({ getGoogleBooksCover } = await import("./index"));
  });

  it("prefers thumbnail over other image sizes", () => {
    const cover = getGoogleBooksCover({
      medium: "http://books.google.com/medium.jpg",
      smallThumbnail: "http://books.google.com/small-thumbnail.jpg",
      thumbnail: "http://books.google.com/thumbnail.jpg",
    });

    expect(cover).toBe("https://books.google.com/thumbnail.jpg");
  });

  it("returns undefined when image links are missing", () => {
    expect(getGoogleBooksCover(undefined)).toBeUndefined();
    expect(getGoogleBooksCover({})).toBeUndefined();
  });
});
