import { Avatar, Box, Text, useMantineColorScheme } from "@mantine/core";
import React from "react";
import { User } from "../../props";
import { css, jsx } from "@emotion/react";
import { useHover } from "@mantine/hooks";

interface Props {
  user: User;
  onClick: () => void;
}

const UserListItem = ({ user, onClick }: Props) => {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  const { hovered, ref } = useHover();

  return (
    <div
      ref={ref}
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        borderRadius: "10px",
        width: "100%",
        padding: "3px",
        marginBottom: "10px",
        borderWidth: "1px",
        borderStyle: "solid",
        backgroundColor: hovered
          ? dark
            ? "#212226"
            : "#f5f5f5"
          : "transparent",
        borderColor: dark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
      }}
      className="button-hover"
    >
      <Avatar src={user.pic} mr={10} radius="md" ml={1.5} />
      <Box>
        <Text>{user.name}</Text>
        <Text style={{ fontSize: "11px" }}>
          <b>Email: </b> {user.email}
        </Text>
      </Box>
    </div>
  );
};

export default UserListItem;
