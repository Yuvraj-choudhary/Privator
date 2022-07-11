import { Stack } from "@mantine/core";
import { useState } from "react";
import Form from "./Form";
import { useRouter } from "next/dist/client/router";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { Context } from "../../props";
import { ChatState } from "../../context/ChatProvider";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmpassword, setConfirmpassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const { setIsLoggedIn }: Context = ChatState();

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      showNotification({
        title: "Error",
        color: "red",
        message: "Please fill all the fields",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "POST",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      setIsLoggedIn(true);

      showNotification({
        title: "Success",
        color: "green",
        message: "You have successfully logged in",
      });
    } catch (error: any) {
      showNotification({
        title: "Error",
        color: "red",
        message: error.response.data.message,
      });
      setLoading(false);
    }
  };

  return (
    <Stack>
      <Form
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        loading={loading}
        setLoading={setLoading}
        confirmpassword={confirmpassword}
        setConfirmpassword={setConfirmpassword}
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        submitHandler={submitHandler}
      />
    </Stack>
  );
};

export default LogIn;
