import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import socket from "../../socket/socket";
import EmojiPicker from "emoji-picker-react";
import { getMessageTime } from "../../utils/dateutil";
import { updateMessagesReadStatus } from "../../api/userApi";
import "./Chat.css";

const Chat = () => {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const [showScrollButton, setShowScrollButton] = useState(false);

    const currentUser = useSelector((state) => state.user.userData);
    const { username } = useParams();
    const { id } = useParams();

    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const handleToggleEmojiPicker = () => {
        setShowEmojiPicker((prev) => !prev);
    };

    const handleSelectEmoji = (emoji) => {
        setCurrentMessage((prev) => prev + emoji.emoji);
    };

    useEffect(() => {
        socket.emit("get_chat_history", { senderId: currentUser?._id, receiverId: id });

        // Listen for the "chat_history" event
        socket.on("chat_history", (chatHistory) => {
            setMessageList(chatHistory);
            scrollToBottom();
        });

        // Listen for the "receive_message" event
        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list, data]);
            checkScrollPosition();
        });

        // Cleanup function when component unmounts
        return () => {
            socket.off("chat_history");
            socket.off("receive_message");
        };
    }, [currentUser?._id, id]);

    useEffect(() => {
        const messageContainer = document.querySelector(".message-container");

        const handleScroll = () => {
            checkScrollPosition();
        };

        messageContainer.addEventListener("scroll", handleScroll);

        return () => {
            messageContainer.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const checkScrollPosition = () => {
        const messageContainer = document.querySelector(".message-container");
        if (messageContainer) {
            const isAtBottom = messageContainer.scrollHeight - messageContainer.scrollTop === messageContainer.clientHeight;
            setShowScrollButton(!isAtBottom);
        }
    };

    const scrollToBottom = () => {
        const messageContainer = document.querySelector(".message-container");
        if (messageContainer) {
            const lastMessage = messageContainer.lastChild;
            if (lastMessage) {
                setTimeout(() => {
                    lastMessage.scrollIntoView({ behavior: "smooth" });
                }, 50);
            }
        }
    };

    const sendMessage = () => {
        if (currentMessage.trim() !== "") {
            setMessageList((list) => [
                ...list,
                {
                    senderId: currentUser?._id,
                    receiverId: id,
                    message: currentMessage,
                    username: currentUser?.username,
                    time: new Date().toLocaleString("en-US", { hour12: true, timeZone: "UTC" }),
                },
            ]);

            socket.emit("send_message", {
                senderId: currentUser?._id,
                receiverId: id,
                message: currentMessage,
                username: currentUser?.username,
                time: new Date().toLocaleString("en-US", { hour12: true, timeZone: "UTC" }),
            });

            setCurrentMessage("");
            scrollToBottom();
            setShowEmojiPicker(false);
        }
    };

    const handleScrollButtonClick = () => {
        scrollToBottom();
    };

    // Function to update the read status of messages
    const updateReadStatus = async (messageIds) => {
        try {
            const response = await updateMessagesReadStatus(messageIds);
            if (response && response.data.status === "success") {
                console.log("Read status updated successfully");
            } else {
                console.error("Failed to update read status");
            }
        } catch (error) {
            console.error("Error updating read status:", error);
        }
    };

    useEffect(() => {
        // Get all unread message IDs sent by the sender
        const unreadMessageIds = messageList
            .filter((message) => message.senderId === id && !message.isRead)
            .map((unreadMessage) => unreadMessage._id);

        // Update the read status of unread messages
        if (unreadMessageIds.length > 0) {
            updateReadStatus(unreadMessageIds);
        }

    }, [messageList, id]);

    return (
        <div className="col-10 chat-window">
            <div className="chat-header">
                <p>
                    <i className="bi bi-circle-fill text-success me-1"></i>
                    {username}
                </p>
            </div>
            <div className="chat-body">
                <div className="message-container">
                    {messageList.map((messageContent, index) => (
                        <div
                            className="message"
                            id={currentUser?._id === messageContent?.senderId ? "other" : "you"}
                            key={index}
                        >
                            <div>
                                <div className="message-content">
                                    <p>{messageContent.message}</p>
                                </div>
                                <div className="message-meta">
                                    {messageContent.time ? (
                                        <p id="time">{getMessageTime(new Date())}</p>
                                    ) : (
                                        <p id="time">{getMessageTime(messageContent.timestamp)}</p>
                                    )}
                                    {messageContent?.senderId !== id && (
                                        messageContent.isRead &&
                                        <i className="bi bi-eye"></i>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="chat-footer col-12">
                <div className="col-4 col-10 d-flex">
                    <input
                        type="text"
                        value={currentMessage}
                        className="chat-input col-8"
                        placeholder="Type something..."
                        onChange={(event) => {
                            setCurrentMessage(event.target.value);
                        }}
                        onKeyDown={(event) => {
                            event.key === "Enter" && sendMessage();
                        }}
                    />
                    <button onClick={handleToggleEmojiPicker}>😊</button>
                    <button onClick={sendMessage}>&#9658;</button>
                </div>
                <div className="col-2 d-flex justify-content-center">
                    {showScrollButton && (
                        <button
                            className="btn scroll-to-bottom-button"
                            onClick={handleScrollButtonClick}
                        >
                            <i className="bi bi-arrow-down-circle-fill"></i>
                        </button>
                    )}
                </div>
            </div>
            {showEmojiPicker && (
                <EmojiPicker
                    className="w-100"
                    onEmojiClick={handleSelectEmoji}
                />
            )}
        </div>
    );
};

export default Chat;
