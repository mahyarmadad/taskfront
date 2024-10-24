import StoreProvider from "@Components/StoreProvider";
import ThemeRegistry from "@Components/ThemeRegistry";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import type {Metadata} from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TODO List",
  description: "a todo list app",
};
export const viewport = {
  width: 1,
  themeColor: "dark",
};

interface Props {
  children: React.ReactNode;
}
export default function RootLayout({children}: Props) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <StoreProvider>{children}</StoreProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
