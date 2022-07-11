import { Stack } from "@mantine/core";
import { useState } from "react";
import Form from "./Form";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { Context } from "../../props";
import { ChatState } from "../../context/ChatProvider";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [password, setPassword] = useState("");
  const [pic, setPic] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const { setIsLoggedIn }: Context = ChatState();

  const postDetails = (pics: any) => {
    setLoading(true);
    if (pics === undefined) {
      showNotification({
        title: "Please select a image",
        color: "red",
        message: "Please select a image",
      });
    }

    if (pics.type === "image/png" || pics === "image/jpeg") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app-mern");
      data.append("cloud_name", "yuvraj-choudahry-dev");
      fetch(
        "https://api.cloudinary.com/v1_1/yuvraj-choudahry-dev/image/upload",
        {
          method: "post",
          body: data,
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((givenData) => {
          console.log(givenData.url.toString());
          setPic(givenData.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      showNotification({
        title: "Please select a image",
        color: "red",
        message: "Please select a image",
      });
      setLoading(false);
    }
  };

  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      showNotification({
        title: "Error",
        color: "red",
        message: "Please fill all the fields",
      });
      setLoading(false);
      console.log(name);
      console.log(email);
      console.log(password);
      console.log(confirmpassword);
      return;
    }

    if (password !== confirmpassword) {
      showNotification({
        title: "Error",
        color: "red",
        message: "Password and Confirm Password does not match",
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
        "/api/user",
        {
          name,
          email,
          password,
          pic,
        },
        config
      );

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      setIsLoggedIn(true);

      showNotification({
        title: "Success",
        color: "green",
        message: "You have successfully signed up",
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
        name={name}
        setName={setName}
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
        postDetails={postDetails}
        submitHandler={submitHandler}
      />
    </Stack>
  );
};

export default Signup;
