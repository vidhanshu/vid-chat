type TMessage = {
  _id: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  sender: string;
  receiver: string;
  read: boolean;
};

export type TChatContext = {
  activeChat: string | null;
  setActiveChat: Dispatch<SetStateAction<string | null>>;
  messages: TMessage[];
  setMessages: Dispatch<SetStateAction<TMessage[]>>;
  loading: boolean;
};
