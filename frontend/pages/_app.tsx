import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { AppProps } from "next/app";
import "../styles/globals.css";
import { getCookie, setCookies } from "cookies-next";
import { NotificationsProvider } from "@mantine/notifications";
import ChatProvider from "../context/ChatProvider";
import { useState } from "react";
import { GetServerSidePropsContext } from "next";

function MyApp(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    props.colorScheme
  );
  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme =
      value || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(nextColorScheme);
    // when color scheme is updated save it to cookie
    setCookies("privator-color-scheme", nextColorScheme, {
      maxAge: 60 * 60 * 24 * 30,
    });
  };

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <ChatProvider>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            fontFamily: "Nunito",
            colorScheme,
          }}
        >
          <NotificationsProvider
            transitionDuration={699}
            limit={100}
            containerWidth={500}
            notificationMaxHeight={150}
          >
            <Component {...pageProps} />
          </NotificationsProvider>
        </MantineProvider>
      </ChatProvider>
    </ColorSchemeProvider>
  );
}

MyApp.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  // get color scheme from cookie
  colorScheme: getCookie("privator-color-scheme", ctx) || "light",
});

export default MyApp;
