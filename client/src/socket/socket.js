import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_AXIOS_BASE_URL, {
    transports: ["websocket"],
    upgrade: false,
});

export default socket;
