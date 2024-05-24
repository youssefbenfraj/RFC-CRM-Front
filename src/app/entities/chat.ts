import { Message } from "./message";
import { User } from "./user";

export interface Chat {
  chatId: number;
  sender: User;
  receiver: User;
  messageList: Message[];
}
