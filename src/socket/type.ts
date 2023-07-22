import { Client, Room } from "../types";

export type CreateRoomEventType = {
  room: string;
  waiter: string;
  // firebaseAuthUid: string;
  organisation: string;
};

export type ServerToClientEvents = {
  "user-joined": (userId: string) => void;
  "client-created": (client: Client) => void;
  "qrCode-checked": (userId: string) => void;
  "room-created": (room: Room) => void;
  "room-busy": (id: string) => void;
  "room-empy": (id: string) => void;
  "room-book": (id: string) => void;
  "room-call": (id: string) => void;
};

export type ClientToServerEvents = {
  "join-user": (userId: string) => void;
  "create-client": (client: Client) => void;
  "create-room": (room: Room) => void;
  "check-qrCode": (data: CreateRoomEventType) => void;
  "busy-room": (id: string) => void;
  "empy-room": (id: string) => void;
  "book-room": (id: string) => void;
  "call-room": (id: string) => void;
};
