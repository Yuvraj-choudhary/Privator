import { MediaQuery, Text } from "@mantine/core";
import { ChatState } from "../context/ChatProvider";
import { Context } from "../props";

const ChatBox = () => {
    const { selectedChat }: Context = ChatState();
    return (
        <MediaQuery
            smallerThan="md"
            styles={{
                display: !selectedChat ? "none" : "flex",
            }}
        >
            <>{selectedChat ? selectedChat._id : <Text>Please select a chat</Text>}</>
        </MediaQuery>
    );
};

export default ChatBox;
