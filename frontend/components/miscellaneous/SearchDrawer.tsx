import {
  Box,
  Button,
  Divider,
  Drawer,
  Input,
  InputWrapper,
  Loader,
  Text,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import React from "react";
import { Users } from "tabler-icons-react";
import { User } from "../../props";
import ChatLoading from "../ChatLoading";
import UserListItem from "../Users/UserListItem";

interface Props {
  openDrawer: boolean;
  setOpenDrawer: (value: boolean) => void;
  search: string;
  loading: boolean;
  loadingChat: boolean;
  setSearch: (value: string) => void;
  handleSearch: () => void;
  searchResult?: User[];
  accessChat: (id: string) => void;
}

const SearchDrawer = ({
  openDrawer,
  setOpenDrawer,
  search,
  setSearch,
  handleSearch,
  loading,
  searchResult,
  accessChat,
  loadingChat,
}: Props) => {
  return (
    <Drawer
      opened={openDrawer}
      onClose={() => setOpenDrawer(false)}
      title={<Text>Search User</Text>}
      padding="xl"
      position="right"
      transitionDuration={699}
      size={800}
      overlayOpacity={0.2}
      overlayBlur={5}
    >
      <>
        <Box mb={10}>
          <Box
            style={{
              display: "flex",
              paddingBottom: 2,
              width: "100%",
              flexDirection: "column",
            }}
          >
            <InputWrapper required label="Name of the user">
              <Input
                icon={<Users />}
                placeholder="Enter the name of the User"
                radius="md"
                size="md"
                value={search}
                onChange={(e: any) => setSearch(e.target.value)}
              />
            </InputWrapper>
          </Box>
          <Divider my="sm" />
          <Button fullWidth onClick={() => handleSearch()}>
            Go
          </Button>
        </Box>
        {loading ? (
          <ChatLoading />
        ) : (
          searchResult?.map((user) => (
            <UserListItem
              key={user._id}
              onClick={() => accessChat(user._id)}
              user={user}
            />
          ))
        )}
        {loadingChat && <Loader color="red" />}
      </>
    </Drawer>
  );
};

export default SearchDrawer;
