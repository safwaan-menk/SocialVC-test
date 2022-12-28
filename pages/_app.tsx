import "../styles/globals.css";
import "../styles/styles.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";

import { Hydrate, QueryClientProvider } from "react-query";
import { queryClient } from "../src/api";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydrateSte}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme: "dark",
          }}
        >
          <Component {...pageProps} />{" "}
        </MantineProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
