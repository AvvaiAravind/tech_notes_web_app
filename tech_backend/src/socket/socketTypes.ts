interface ServerToClientEvents {
  "note:deleted": () => void;
  "note:created": () => void;
  "note:updated": () => void;
  "user:deleted": () => void;
  "user:created": () => void;
  "user:updated": () => void;
}

interface ClientToServerEvents {}

interface InterServerEvents {}

interface SocketData {}

export {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
};
