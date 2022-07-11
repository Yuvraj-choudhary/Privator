import {
  ActionIcon,
  Box,
  Burger,
  Input,
  MediaQuery,
  Stack,
  Text,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useEffect, useState } from "react";
import { ChatState } from "../context/ChatProvider";
import { Chat, Context, User } from "../props";
import { Adjustments, Plus, Users } from "tabler-icons-react";
import ChatLoading from "./ChatLoading";
import ChatItem from "./ChatItem";
import GroupChatModal from "./miscellaneous/modals/GroupChatModal";
import { getSender, getSenderName } from "../config/logics";

const Chats = () => {
  const { user, setChats, selectedChat, chats }: Context = ChatState();
  const [loggedUser, setLoggedUser] = useState<User>();
  const [opened, setOpened] = useState(false);
  const [searchChat, setSearchChat] = useState("");

  const fetchChats = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };

    const { data } = await axios.get("/api/chat", config);
    console.log(data);
    setChats(data);
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")!));
    fetchChats();
    // eslint-disable-next-line
  }, []);

  return (
    <MediaQuery
      smallerThan="md"
      styles={{ display: selectedChat ? "none" : "flex" }}
    >
      <>
        <Box
          pb={3}
          px={10}
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Input
            icon={<Users />}
            placeholder="Find The Chat"
            style={{ width: "100%" }}
            radius="md"
            value={searchChat}
            onChange={(e: any) => setSearchChat(e.target.value)}
          />
          <ActionIcon
            size="lg"
            m={5}
            radius="md"
            variant="default"
            onClick={() => setOpened((val) => !val)}
          >
            <Plus />
          </ActionIcon>
        </Box>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            overflow: "auto",
            height: "calc(100vh - 100px)",
          }}
          px={10}
          py={3}
        >
          {chats ? (
            chats
              ?.filter((chat) => {
                if (searchChat === "") {
                  return chat;
                } else if (
                  !chat.isGroupChat
                    ? getSenderName(loggedUser, chat.users)
                        .toLowerCase()
                        .includes(searchChat.toLowerCase())
                    : chat.chatName
                        .toLowerCase()
                        .includes(searchChat.toLowerCase())
                ) {
                  return chat;
                }
              })
              .map((chat) => (
                <>
                  <ChatItem
                    key={chat._id}
                    chat={chat}
                    loggedUser={loggedUser}
                  />
                </>
              ))
          ) : (
            <ChatLoading />
          )}
        </Box>
        <GroupChatModal opened={opened} setOpened={setOpened} />
      </>
    </MediaQuery>
  );
};

export default Chats;
