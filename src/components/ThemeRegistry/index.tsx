"use client";

import {AppRouterCacheProvider} from "@mui/material-nextjs/v14-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import {ThemeProvider, responsiveFontSizes} from "@mui/material/styles";
import {SnackbarProvider} from "notistack";

import theme from "@Components/ThemeRegistry/theme";
interface Props {
  children: React.ReactNode;
}
export default function ThemeRegistry({children}: Props) {
  return (
    <AppRouterCacheProvider options={{enableCssLayer: true}}>
      <ThemeProvider theme={responsiveFontSizes(theme)}>
        <CssBaseline />
        <SnackbarProvider>{children}</SnackbarProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
