import { Skeleton, Stack } from "@mantine/core";
import React from "react";

const ChatLoading = () => {
  return (
    <Stack>
      <Skeleton height={40} radius="md" />
      <Skeleton height={40} radius="md" />
      <Skeleton height={40} radius="md" />
      <Skeleton height={40} radius="md" />
      <Skeleton height={40} radius="md" />
      <Skeleton height={40} radius="md" />
      <Skeleton height={40} radius="md" />
      <Skeleton height={40} radius="md" />
    </Stack>
  );
};

export default ChatLoading;
