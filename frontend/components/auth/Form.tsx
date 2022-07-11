import {
  Badge,
  Box,
  Button,
  Divider,
  Input,
  InputWrapper,
  PasswordInput,
  Popover,
  Progress,
  Text,
} from "@mantine/core";
import {
  At,
  BrandGithub,
  BrandGoogle,
  Lock,
  Photo,
  User,
} from "tabler-icons-react";
import { useState } from "react";
import { CheckIcon, Cross1Icon } from "@modulz/radix-icons";

interface Props {
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  confirmpassword: string;
  setConfirmpassword: (confirmpassword: string) => void;
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
  postDetails?: any;
  submitHandler: any;
}

const PasswordRequirement = ({
  meets,
  label,
}: {
  meets: boolean;
  label: string;
}) => {
  return (
    <Text
      color={meets ? "teal" : "red"}
      sx={{ display: "flex", alignItems: "center" }}
      mt={7}
      size="sm"
    >
      {meets ? <CheckIcon /> : <Cross1Icon />} <Box ml={10}>{label}</Box>
    </Text>
  );
};

const requirements = [
  { re: /[0-9]/, label: "Includes number" },
  { re: /[a-z]/, label: "Includes lowercase letter" },
  { re: /[A-Z]/, label: "Includes uppercase letter" },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Includes special symbol" },
];

const getStrength = (password: string) => {
  let multiplier = password?.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
};

const Form = ({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  loading,
  setLoading,
  confirmpassword,
  setConfirmpassword,
  isLogin,
  setIsLogin,
  postDetails,
  submitHandler,
}: Props) => {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(password)}
    />
  ));

  const strength = getStrength(password);
  const color = strength === 100 ? "teal" : strength > 50 ? "yellow" : "red";

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitHandler();
        }}
      >
        {isLogin === false && (
          <InputWrapper label="Name" id="first-name" required>
            <Input
              icon={<User />}
              placeholder="Name"
              radius="md"
              size="md"
              value={name}
              onChange={(e: any) => setName(e.target.value)}
            />
          </InputWrapper>
        )}
        <InputWrapper label="Email" id="email" required>
          <Input
            icon={<At />}
            placeholder="Name"
            type="email"
            radius="md"
            size="md"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
          />
        </InputWrapper>
        <Divider my="xs" label="Or Get The Email with" labelPosition="center" />
        <Button
          style={{
            boxShadow: "0px 0px 10px 1px rgba(0,0,0,0.2)",
          }}
          radius="md"
          size="md"
          fullWidth
          variant="default"
          leftIcon={<BrandGoogle strokeWidth={3} />}
        >
          Google 👌
        </Button>
        <Divider my="md" labelPosition="center" />
        <Button
          radius="md"
          size="md"
          style={{
            boxShadow: "0px 0px 10px 6px rgba(0,0,0,0.2)",
          }}
          fullWidth
          variant="default"
          leftIcon={<BrandGithub />}
        >
          Github 💻 <div style={{ fontSize: "12.5px" }}>(for programmer)</div>
        </Button>
        <Popover
          opened={popoverOpened}
          position="bottom"
          placement="start"
          withArrow
          style={{ width: "100%" }}
          trapFocus={false}
          transition="pop-top-left"
          onFocusCapture={() => setPopoverOpened(true)}
          onBlurCapture={() => setPopoverOpened(false)}
          target={
            <InputWrapper label="Password" id="password" required>
              <PasswordInput
                icon={<Lock />}
                placeholder="Password"
                radius="md"
                size="md"
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
              />
            </InputWrapper>
          }
        >
          <Progress
            color={color}
            value={strength}
            size={5}
            style={{ marginBottom: 10 }}
          />
          <PasswordRequirement
            label="Includes at least 6 characters"
            meets={password?.length > 5}
          />
          {checks}
        </Popover>
        {isLogin === false && (
          <>
            <InputWrapper
              label="Confirm Password"
              id="confirmpassword"
              required
            >
              <PasswordInput
                icon={<Lock />}
                placeholder="Confirm Password"
                radius="md"
                size="md"
                value={confirmpassword}
                onChange={(e: any) => setConfirmpassword(e.target.value)}
              />
            </InputWrapper>
            <InputWrapper label="Pic" id="pic" required>
              <Input
                icon={<Photo />}
                placeholder="Name"
                accept="image/*"
                type="file"
                radius="md"
                size="md"
                onChange={(e: any) => postDetails(e.target.files[0])}
              />
            </InputWrapper>
          </>
        )}
      </form>
      <Button
        color="red"
        radius="md"
        size="md"
        onClick={submitHandler}
        fullWidth
        loading={loading}
        style={{
          boxShadow: "0px 0px 10px 5px rgba(0,0,0,0.2)",
        }}
      >
        {isLogin ? "Log In" : "Sign Up"}
      </Button>
      {!isLogin && loading && (
        <Box
          style={{
            textAlign: "center",
            marginTop: "10px",
            boxShadow: "0px 0px 10px 1px rgba(0,0,0,0.2)",
          }}
        >
          Loading... Encrypting your password to the max level this can take up
          to a minute according to your internet
        </Box>
      )}
      {isLogin && (
        <Button
          color="indigo"
          radius="md"
          size="md"
          fullWidth
          style={{
            boxShadow: "0px 0px 10px 1px rgba(0,0,0,0.2)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Get Guest User Credentials
          <Badge radius="sm" size="sm" color="cyan" ml={10} variant="filled">
            Beta
          </Badge>
        </Button>
      )}
    </>
  );
};

export default Form;
