import { TUser } from "@/src/auth/context/types";

export type TChat = {
  _id: string;
  participants: TUser[];
  last_message: string;
  createdAt: string;
  updatedAt: string;
};
