import { createContext, useContext, useEffect, useState } from "react";
import { Chat } from "../props";

const ChatContext = createContext({});

const ChatProvider = ({ children }: any) => {
  const [selectedChat, setSelectedChat] = useState<Chat>();
  const [user, setUser] = useState();
  const [userPic, setUserPic] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo")!);
    setUser(userInfo);
    if (userInfo) {
      setIsLoggedIn(true);
    } else setIsLoggedIn(false);
  }, [isLoggedIn]);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
        userPic,
        setUserPic,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
