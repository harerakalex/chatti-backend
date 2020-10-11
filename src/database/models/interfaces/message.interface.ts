export interface IMessage {
  id?: number;
  senderId?: number;
  receiverId?: number;
  message?: string;
  read?: boolean;
}
