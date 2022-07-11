import { Box, Button, Group, Image, Modal, Text } from "@mantine/core";
import { AppProps } from "next/app";
import { useState } from "react";
import { User } from "../../../props";

interface Props {
  opened: boolean;
  setOpened: (value: boolean) => void;
  user?: User;
}

const ProfileModal = ({ opened, setOpened, user }: Props) => {
  return (
    <>
      <Modal
        opened={opened}
        centered
        size="xl"
        onClose={() => setOpened(false)}
        title={<Text>{user?.name}</Text>}
        overlayOpacity={0.2}
        overlayBlur={5}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            style={{
              width: "350px",
              padding: "17px",
            }}
          >
            <Image radius="md" src={user?.pic} alt="Random unsplash image" />
          </Box>
          <Text>{user?.email}</Text>
        </Box>
      </Modal>
    </>
  );
};

export default ProfileModal;
