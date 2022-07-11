import { NextPage } from "next";
import ChatPage from "../ChatPage";
import { ChatState } from "../context/ChatProvider";
import HomePage from "../HomePage";
import { Context } from "../props";
import { useOs } from "@mantine/hooks";

const Home = () => {
  const os = useOs();
  const { isLoggedIn }: Context = ChatState();

  return os === "android" ? (
    "Go download the android app"
  ) : isLoggedIn ? (
    <ChatPage />
  ) : (
    <HomePage />
  );
};

export default Home;
