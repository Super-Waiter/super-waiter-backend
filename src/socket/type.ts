import { Socket } from "socket.io";
import { Client, Room } from "../types";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

export type CreateRoomEventType = {
  room: string;
  waiter: string;
  // firebaseAuthUid: string;
  organisation: string;
};

export type ServerToClientEvents = {
  "user-joined": (userId: string) => void;
  "client-created": (client: Client) => void;
  "client-closed": (id: string) => void;
  "qrCode-checked": (userId: string) => void;
  "client-checked-by-room-id": (ok: boolean) => void;
  "client-checked": (ok: boolean) => void;
  "room-created": (room: Room) => void;
  "room-busy": (id: string) => void;
  "room-book": (id: string) => void;
  "room-call": (id: string) => void;
  "room-updated": (room: Room) => void;
};

export type ClientToServerEvents = {
  "join-user": (userId: string) => void;
  "create-client": (client: Client) => void;
  "create-room": (room: Room) => void;
  "close-room": (id: string) => void;
  "check-qrCode": (data: CreateRoomEventType) => void;
  "check-client-by-room-id": (id: string) => void;
  "check-client": (id: string) => void;
  "busy-room": (id: string) => void;
  "book-room": (id: string) => void;
  "call-room": (id: string) => void;
  "edit-room": (room: Room) => void;
};

export type SocketType = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  DefaultEventsMap,
  any
>;
