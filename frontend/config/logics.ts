import { User } from "../props";

export const getSender = (loggedUser: User | undefined, users: User[]) => {
  return users[0]._id === loggedUser?._id ? users[1] : users[0];
};

export const getSenderName = (loggedUser: User | undefined, users: User[]) => {
  return users[0]._id === loggedUser?._id ? users[1].name : users[0].name;
};

export const getSenderPic = (loggedUser: User | undefined, users: User[]) => {
  return users[0]._id === loggedUser?._id ? users[1].pic : users[0].pic;
};
