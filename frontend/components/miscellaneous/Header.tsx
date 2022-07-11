import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Button,
  Kbd,
  MediaQuery,
  Menu,
  Text,
  Tooltip,
  useMantineColorScheme,
} from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { Bell, Logout, Moon, Search, Settings, Sun } from "tabler-icons-react";
import { ChatState } from "../../context/ChatProvider";
import { Chat, Context, User } from "../../props";
import ProfileModal from "./modals/ProfileModal";
import SearchDrawer from "./SearchDrawer";

interface UserData {
  data: Array<User>;
}

interface ChatData {
  data: Chat;
}

interface Props {
  user: User | undefined;
  setOpenDrawer: (openDrawer: boolean) => void;
  setOpened: (open: boolean) => void;
  logOut: () => void;
}

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState<User[]>();
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [opened, setOpened] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const {
    user,
    setIsLoggedIn,
    setSelectedChat,
    selectedChat,
    chats,
    setChats,
  }: Context = ChatState();
  const route = useRouter();
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  useHotkeys([["ctrl+K", () => setOpenDrawer((v) => !v)]]);

  const logOut = () => {
    localStorage.removeItem("userInfo");
    showNotification({
      title: "Success",
      message: "Successfully logged out",
      color: "green",
    });
    setIsLoggedIn(false);
  };

  const accessChat = async (id: string) => {
    localStorage.setItem("selectedChat", JSON.stringify(id));
    try {
      setLoadingChat(true);

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const { data }: ChatData = await axios.post(
        `/api/chat`,
        {
          userId: id,
        },
        config
      );

      if (!chats?.find((chat) => chat._id === data._id)) {
        setChats([...chats!, data]);
      }

      setSelectedChat(data);
      setLoadingChat(false);
      setOpenDrawer(false);
    } catch (err) {
      console.log(err);
      showNotification({
        title: "Error",
        message: "Something went wrong",
        color: "red",
      });
    }
  };

  const handleSearch = async () => {
    if (!search) {
      showNotification({
        title: "Error",
        message: "Please fill the search field",
        color: "red",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };

      const { data }: UserData = await axios.get(
        `/api/user?search=${search}`,
        config
      );

      console.log(data);

      setSearchResult(data);
      setLoading(false);
    } catch (err) {
      showNotification({
        title: "Error",
        message: "Something went wrong",
        color: "red",
      });
    }
  };

  return (
    <Box
      p={10}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: dark ? "#1a1b1e" : "white",
        height: "48px",
      }}
    >
      <LeftSide user={user} setOpened={setOpened} logOut={logOut} />
      <MediaQuery smallerThan="md" styles={{ display: "none" }}>
        <Button variant="default" radius="md">
          <Text style={{ textAlign: "center", fontFamily: "nunito" }}>
            Privator
          </Text>
          <Badge radius="sm" size="xs" color="red" ml={10}>
            V1.0.0
          </Badge>
        </Button>
      </MediaQuery>
      <MediaQuery largerThan="md" styles={{ display: "none" }}>
        <Text style={{ textAlign: "center", fontFamily: "nunito" }}>
          Privator{" "}
          <Badge radius="sm" size="xs" color="red" ml={10}>
            V1.0.0
          </Badge>
        </Text>
      </MediaQuery>
      <RightSide setOpenDrawer={setOpenDrawer} />
      <ProfileModal opened={opened} user={user} setOpened={setOpened} />
      <SearchDrawer
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        loadingChat={loadingChat}
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
        loading={loading}
        searchResult={searchResult}
        accessChat={accessChat}
      />
    </Box>
  );
};

const RightSide = ({ setOpenDrawer }: any) => {
  const { toggleColorScheme, colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  return (
    <Box
      style={{
        display: "flex",
      }}
    >
      <Tooltip
        label="Search User to Chat"
        radius="md"
        position="bottom"
        placement="end"
        withArrow
      >
        <MediaQuery smallerThan="md" styles={{ display: "none" }}>
          <Button
            variant="default"
            color="gray"
            radius="md"
            leftIcon={<Search size={18} style={{ marginLeft: -11 }} />}
            onClick={() => setOpenDrawer(true)}
            rightIcon={
              <Text pl={25} style={{ marginRight: -11 }}>
                <Box style={{ display: "flex", alignItems: "center" }}>
                  <Kbd style={{ fontSize: "0.6em" }}>Ctrl</Kbd>
                  <Box style={{ margin: "3px" }}>+</Box>
                  <Kbd style={{ fontSize: "0.6em" }}>K</Kbd>
                </Box>
              </Text>
            }
          >
            <Text style={{ overflow: "hidden" }}>Search</Text>
          </Button>
        </MediaQuery>
        <MediaQuery largerThan="md" styles={{ display: "none" }}>
          <ActionIcon
            size="lg"
            radius="md"
            variant="default"
            onClick={() => setOpenDrawer(true)}
          >
            <Search size={18} />
          </ActionIcon>
        </MediaQuery>
      </Tooltip>
      <ActionIcon
        size="lg"
        radius="md"
        variant="default"
        ml={10}
        onClick={() => toggleColorScheme()}
      >
        {dark ? <Sun /> : <Moon />}
      </ActionIcon>
    </Box>
  );
};

const LeftSide = ({ user, setOpened, logOut }: any) => {
  return (
    <Box style={{ display: "flex" }}>
      <ActionIcon size="lg" radius="md" variant="default" mr={10}>
        <Bell />
      </ActionIcon>
      <Menu
        withArrow
        control={
          <Box>
            <MediaQuery smallerThan="md" styles={{ display: "none" }}>
              <Button
                variant="default"
                color="gray"
                radius="md"
                style={{
                  maxWidth: 187.81,
                  width: 187.81,
                }}
                leftIcon={
                  <Avatar
                    src={user?.pic}
                    radius="md"
                    size={30}
                    style={{
                      marginLeft: -16,
                    }}
                  />
                }
              >
                <Text
                  style={{
                    width: 187.16 - 55,
                    display: "flex",
                    alignItems: "center",
                    marginLeft: -1,
                  }}
                >
                  {user?.name}
                </Text>
              </Button>
            </MediaQuery>
            <MediaQuery largerThan="md" styles={{ display: "none" }}>
              <ActionIcon size="lg" radius="md" variant="default">
                <Avatar src={user?.pic} radius="md" size={30} />
              </ActionIcon>
            </MediaQuery>
          </Box>
        }
      >
        <Menu.Label>Profile</Menu.Label>
        <Menu.Item
          onClick={() => setOpened(true)}
          icon={<Settings size={14} />}
        >
          My Profile
        </Menu.Item>
        <Menu.Item icon={<Logout size={14} />} onClick={() => logOut()}>
          Logout
        </Menu.Item>
      </Menu>
    </Box>
  );
};

export { RightSide, LeftSide };
export default SideDrawer;
