import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Input,
  InputWrapper,
  Modal,
  Text,
} from "@mantine/core";
import { useState } from "react";
import { Users, X } from "tabler-icons-react";
import { ChatState } from "../../../context/ChatProvider";
import { Context, User } from "../../../props";
import { ChatRounded } from "@mui/icons-material";
import axios from "axios";
import { showNotification } from "@mantine/notifications";
import ChatLoading from "../../ChatLoading";
import UserListItem from "../../Users/UserListItem";

const GroupChatModal = ({
  opened,
  setOpened,
}: {
  opened: boolean;
  setOpened: any;
}) => {
  const [groupName, setGroupName] = useState("");
  const [selectedUsers, setSelectedUsers]: any = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState<User[]>();
  const [loading, setLoading] = useState(false);

  const { user, chats, setChats }: Context = ChatState();

  const handleSearch = async (query: any) => {
    setSearch(query);
    if (!query) return;
    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };

      const { data }: { data: User[] } = await axios.get(
        `/api/user?search=${search}`,
        config
      );
      console.log(data);
      setLoading(false);
      setSearchResult(data);
    } catch (err) {
      console.log(err);
      showNotification({
        title: "Error",
        message: "Something went wrong",
        color: "red",
      });
    }
  };

  const handleGroup = (_user: User) => {
    if (selectedUsers?.includes(_user)) {
      showNotification({
        title: "Error",
        message: "User already selected",
        color: "red",
      });
      return;
    }

    setSelectedUsers([...selectedUsers, _user]);
  };

  const handleSubmit = () => {};

  return (
    <Modal
      opened={opened}
      centered
      size="xl"
      onClose={() => setOpened(false)}
      title={<Text>Create a group Chat</Text>}
      overlayOpacity={0.2}
      overlayBlur={5}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <InputWrapper label="Group Name" required>
            <Input
              icon={<ChatRounded />}
              placeholder="Group Name"
              radius="md"
              size="md"
            />
          </InputWrapper>
          <InputWrapper
            label="Add Users eg: Rick Astley, Yuvraj, John"
            required
            mt={5}
          >
            <Input
              icon={<Users />}
              placeholder="Add Users"
              radius="md"
              size="md"
              mb={search && 10}
              onChange={(e: any) => handleSearch(e.target.value)}
            />
          </InputWrapper>
          {selectedUsers?.map((_user: User) => (
            <Badge
              radius="sm"
              ml={5}
              mb={10}
              key={_user._id}
              rightSection={
                <ActionIcon
                  size="xs"
                  color="blue"
                  radius="xl"
                  variant="transparent"
                  onClick={() => {
                    setSelectedUsers(
                      selectedUsers.filter((sel: User) => sel._id !== _user._id)
                    );
                  }}
                >
                  <X size={15} />
                </ActionIcon>
              }
            >
              {_user.name}
            </Badge>
          ))}
          {loading ? (
            <ChatLoading />
          ) : (
            searchResult
              ?.slice(0.4)
              .map((_user) => (
                <UserListItem
                  user={_user}
                  onClick={() => handleGroup(_user)}
                  key={_user._id}
                />
              ))
          )}
        </form>
        <Button radius="md" fullWidth mt={20} color="red">
          Create Group
        </Button>
      </Box>
    </Modal>
  );
};

export default GroupChatModal;
