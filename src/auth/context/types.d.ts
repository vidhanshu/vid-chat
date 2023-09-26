export type TUser = {
  _id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type TAuthContext = {
  user: null | TUser;
  setUser: Dispatch<SetStateAction<{ user: TUser }>>;
  loading: boolean;
};
