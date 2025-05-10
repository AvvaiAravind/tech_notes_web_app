import { io } from "socket.io-client";
const socket = io("http://localhost:3500");

socket.on("connect", () => {
  console.log("Connected");
});

socket.on("user:updated", () => {
  console.log("note updated");
});
