import {
  ActionIcon,
  Box,
  Container,
  SegmentedControl,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { Moon, Sun } from "tabler-icons-react";
import LogIn from "./components/auth/Login";
import Signup from "./components/auth/Signup";

const HomePage: NextPage = () => {
  const [isLoginTab, setIsLoginTab] = useState("Log In");

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <>
      <ActionIcon
        size="lg"
        radius="md"
        variant="default"
        onClick={() => toggleColorScheme()}
        style={{
          position: "absolute",
          top: 10,
          left: 10,
        }}
      >
        {dark ? <Sun /> : <Moon />}
      </ActionIcon>
      <Container
        size="sm"
        style={{
          display: "grid",
          placeItems: "center",
        }}
      >
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            padding: 20,
            width: "100%",
            margin: "20px 0 0 0",
            borderRadius: "20px",
            borderWidth: "1px",
            backgroundColor: dark ? "#1a1b1e" : "white",
            boxShadow: "0px 0px 100px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Text
            style={{
              fontSize: "2rem",
              textAlign: "center",
              fontFamily: "Nunito",
            }}
          >
            Privator
          </Text>
        </Box>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: 33,
            width: "100%",
            margin: "20px 0 15px 0",
            borderRadius: "20px",
            borderWidth: "1px",
            backgroundColor: dark ? "#1a1b1e" : "white",
            boxShadow: "0px 0px 100px rgba(0, 0, 0, 0.1)",
          }}
        >
          <SegmentedControl
            size="lg"
            radius={10}
            value={isLoginTab}
            onChange={setIsLoginTab}
            transitionDuration={500}
            transitionTimingFunction="linear"
            data={[
              { label: "Log In", value: "Log In" },
              { label: "Sign Up", value: "Sign Up" },
            ]}
          />
          {isLoginTab === "Log In" ? <LogIn /> : <Signup />}
        </Box>
      </Container>
    </>
  );
};

export default HomePage;
