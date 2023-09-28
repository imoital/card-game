import Gun from "gun";

export const gun = Gun({
  peers: ["http://localhost:3030/gun"],
});
