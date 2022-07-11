import { Avatar, Box, Text, useMantineColorScheme } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import React from "react";
import { Users } from "tabler-icons-react";
import { getSenderName, getSenderPic } from "../config/logics";
import { ChatState } from "../context/ChatProvider";
import { Chat, Context, User } from "../props";

const ChatItem = ({ chat, loggedUser }: { chat: Chat; loggedUser?: User }) => {
  const { setSelectedChat, selectedChat }: Context = ChatState();
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  const { hovered, ref } = useHover();

  return (
    <div
      ref={ref}
      onClick={() => setSelectedChat(chat)}
      style={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        borderRadius: "10px",
        width: "100%",
        padding: "10px",
        backgroundColor:
          hovered || selectedChat?._id === chat._id
            ? dark
              ? "#212226"
              : "#f5f5f5"
            : "transparent",
        marginBottom: "10px",
        borderWidth: "1.6px",
        borderStyle: "solid",
        borderColor: dark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
      }}
      key={chat._id}
    >
      <Avatar
        radius="md"
        mr={10}
        src={
          !chat.isGroupChat ? getSenderPic(loggedUser, chat.users) : chat.pic
        }
      >
        <Users />
      </Avatar>
      <Text>
        {!chat.isGroupChat
          ? getSenderName(loggedUser, chat.users)
          : chat.chatName}
      </Text>
    </div>
  );
};

export default ChatItem;
