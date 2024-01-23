import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import socket from "../../socket/socket";
import ScrollToBottom from "react-scroll-to-bottom";
import "./Chat.css";

const Chat = () => {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const currentUser = useSelector((state) => state.user.userData);
    const { username } = useParams();
    const { id } = useParams();

    useEffect(() => {
        socket.emit("get_chat_history", { senderId: currentUser._id, receiverId: id });

        // Listen for the "chat_history" event
        socket.on("chat_history", (chatHistory) => {
            // console.log("chat history: ", chatHistory);
            setMessageList(chatHistory);
        });

        // Listen for the "receive_message" event
        socket.on("receive_message", (data) => {
            // console.log("receive_message: ", data);
            setMessageList((list) => [...list, data]);
        });

        // Cleanup function when component unmounts
        return () => {
            socket.off("chat_history");
            socket.off("receive_message");
        };
    }, [currentUser._id, id]);

    const sendMessage = () => {
        if (currentMessage.trim() !== "") {
            // Emit the message to the server
            socket.emit("send_message", {
                senderId: currentUser._id,
                receiverId: id,
                message: currentMessage,
                username: currentUser.username,
                time: new Date().toLocaleTimeString(),
            });

            setCurrentMessage("");
        }
    };

    return (
        <div className="chat-window">
            <div className="chat-header">
                <p>
                    <i className="bi bi-circle-fill text-success me-1"></i>
                    {username}
                </p>
            </div>
            <div className="chat-body">
                <ScrollToBottom className="message-container">
                    {messageList.map((messageContent) => {
                        return (
                            <div
                                className="message"
                                id={currentUser._id === messageContent?.senderId ? "you" : "other"}
                            >
                                <div>
                                    <div className="message-content">
                                        <p>{messageContent.message}</p>
                                    </div>
                                    <div className="message-meta">
                                        <p id="time">{new Date(messageContent.timestamp).toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <input
                    type="text"
                    value={currentMessage}
                    className="chat-input"
                    placeholder="Type something..."
                    onChange={(event) => {
                        setCurrentMessage(event.target.value);
                    }}
                    onKeyDown={(event) => {
                        event.key === "Enter" && sendMessage();
                    }}
                />
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    );
};

export default Chat;
