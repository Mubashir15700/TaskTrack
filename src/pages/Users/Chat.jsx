import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import socket from "../../socket/socket";
import { updateMessagesReadStatus } from "../../api/user/utils";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import ChatList from "../../components/Users/ChatList";
import ChatBox from "../../components/Users/ChatBox";

export default function Chat() {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const [showScrollButton, setShowScrollButton] = useState(false);
    // const [showChatList, setShowChatList] = useState(true); // State to toggle between chat list and chat box

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

        messageContainer?.addEventListener("scroll", handleScroll);

        return () => {
            messageContainer?.removeEventListener("scroll", handleScroll);
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
                    isRead: false,
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

    // Function to update the read status of messages in messageList
    const updateMessageListReadStatus = (messageIds) => {
        // Create a copy of the messageList
        const updatedMessageList = [...messageList];

        // Update the read status of messages with matching messageIds
        updatedMessageList.forEach((message) => {
            if (messageIds.includes(message._id)) {
                message.isRead = true;
            }
        });

        // Return the updated messageList
        return updatedMessageList;
    };

    useEffect(() => {
        // Get all unread message IDs sent by the sender
        const unreadMessageIds = messageList
            .filter((message) => message.senderId === id && !message.isRead)
            .map((unreadMessage) => unreadMessage._id);

        // Update the read status of unread messages
        if (unreadMessageIds.length > 0) {
            updateMessagesReadStatus(unreadMessageIds)
                .then(() => {
                    // Update the messageList with updated read status
                    setMessageList(updateMessageListReadStatus(unreadMessageIds));
                })
                .catch((error) => {
                    console.error("Error updating read status:", error);
                });
        }

    }, [messageList, id]);

    return (
        <MDBContainer fluid className="py-3">
            <MDBRow>
                <MDBCol md="12">
                    <MDBCard id="chat3" style={{ borderRadius: "15px" }}>
                        <MDBCardBody>
                            <MDBRow>
                                {/* {showChatList && ( */}
                                <ChatList
                                    username={username}
                                />
                                {/* )} */}
                                {/* {!showChatList && ( */}
                                <ChatBox
                                    messageList={messageList}
                                    currentUser={currentUser}
                                    currentMessage={currentMessage}
                                    setCurrentMessage={setCurrentMessage}
                                    sendMessage={sendMessage}
                                    handleToggleEmojiPicker={handleToggleEmojiPicker}
                                    handleScrollButtonClick={handleScrollButtonClick}
                                    handleSelectEmoji={handleSelectEmoji}
                                    showScrollButton={showScrollButton}
                                    showEmojiPicker={showEmojiPicker}
                                    id={id}
                                />
                                {/* )} */}
                            </MDBRow>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};
