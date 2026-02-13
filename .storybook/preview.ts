import type { Preview } from "@storybook/nextjs-vite";
import { createElement } from "react";
import { Geist } from "next/font/google";
import "../app/globals.css";

const geistSans = Geist({
  weight: ["400", "500", "600", "700"],
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const preview: Preview = {
  decorators: [
    (Story) =>
      createElement(
        "div",
        {
          className: geistSans.variable,
          style: {
            fontFamily:
              'var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          },
        },
        createElement(Story),
      ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
};

export default preview;
