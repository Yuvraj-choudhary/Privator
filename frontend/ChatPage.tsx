import { AppShell, Navbar, Header, MediaQuery, Text, Box } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { NextPage } from "next";
import { useState } from "react";
import ChatBox from "./components/ChatBox";
import Chats from "./components/Chats";
import SideDrawer from "./components/miscellaneous/Header";
import { ChatState } from "./context/ChatProvider";
import { Context } from "./props";

const ChatPage: NextPage = () => {
  const { user, selectedChat }: Context = ChatState();
  const matches = useMediaQuery("(max-width: 992px)");

  return (
    // <Box
    //   style={{
    //     width: "100%",
    //   }}
    // >
    //   {user && <SideDrawer />}
    //   <Box
    //     style={{
    //       display: "flex",
    //       justifyContent: "space-between",
    //       width: "100%",
    //       height: "calc(100vh - 48px)",
    //     }}
    //   >
    //     {user && <Chats />}
    //     {user && <ChatBox />}
    //   </Box>
    // </Box>
    <AppShell
      navbar={
        <MediaQuery
          smallerThan="md"
          styles={{ display: selectedChat ? "none" : "flex" }}
        >
          <Navbar
            width={{ base: selectedChat ? "0%" : "100%", md: "400px" }}
            height="calc(100vh - 50px)"
          >
            <Chats />
          </Navbar>
        </MediaQuery>
      }
      header={
        <MediaQuery
          smallerThan="md"
          styles={{ display: selectedChat ? "none" : "flex" }}
        >
          <Header
            height={50}
            style={{
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <SideDrawer />
          </Header>
        </MediaQuery>
      }
      padding={0}
    >
      <MediaQuery
        smallerThan="md"
        styles={{
          display: !selectedChat ? "none" : "flex",
        }}
      >
        <Box
          style={{
            width: "100%",
            height: matches ? "100vh" : "calc(100vh - 50px)",
          }}
        >
          <ChatBox />
        </Box>
      </MediaQuery>
    </AppShell>
  );
};

export default ChatPage;
