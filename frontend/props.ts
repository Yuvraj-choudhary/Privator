export interface User {
  email: string;
  message: string;
  name: string;
  pic: string;
  password: string;
  token: string;
  _id: string;
}

export interface Chat {
  _id: string;
  chatName: string;
  users: User[];
  pic: string;
  isGroupChat: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Context {
  selectedChat?: Chat;
  setSelectedChat?: any;
  user?: User;
  setUser?: (user: User) => void;
  notification?: object;
  setNotification?: any;
  chats?: Array<Chat>;
  setChats?: any;
  userPic?: string;
  setUserPic?: any;
  isLoggedIn?: boolean;
  setIsLoggedIn?: any;
}
