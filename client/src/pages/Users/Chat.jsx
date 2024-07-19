import { useState, useEffect, useRef } from "react";
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
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [showChatList, setShowChatList] = useState(true);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [newMessageCount, setNewMessageCount] = useState(0);

    const childRef = useRef();

    const currentUser = useSelector((state) => state.user.userData);
    const { username, id } = useParams();

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
        });

        // Listen for the "receive_message" event
        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list, data]);
            childRef.current.debouncedCheckScrollPosition();
            setNewMessageCount((c) => c + 1);
        });

        // Cleanup function when component unmounts
        return () => {
            socket.off("chat_history");
            socket.off("receive_message");
        };
    }, [currentUser?._id, id]);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 767);
        };

        // Call handleResize initially to set the initial state
        handleResize();

        // Add event listener for window resize
        window.addEventListener("resize", handleResize);

        if (username || id) {
            setShowChatList(false);
        }

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

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
            setShowEmojiPicker(false);
        }
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
                    <MDBCard id="chat3" style={{ borderRadius: "15px", height: "83vh" }}>
                        <MDBCardBody>
                            <MDBRow>
                                {!isSmallScreen ? (
                                    <>
                                        <ChatList
                                            setShowChatList={setShowChatList}
                                            username={username}
                                        />
                                        {id &&
                                            <ChatBox
                                                ref={childRef}
                                                messageList={messageList}
                                                setMessageList={setMessageList}
                                                currentUser={currentUser}
                                                currentMessage={currentMessage}
                                                setCurrentMessage={setCurrentMessage}
                                                sendMessage={sendMessage}
                                                handleToggleEmojiPicker={handleToggleEmojiPicker}
                                                handleSelectEmoji={handleSelectEmoji}
                                                showEmojiPicker={showEmojiPicker}
                                                newMessageCount={newMessageCount}
                                                setNewMessageCount={setNewMessageCount}
                                                id={id}
                                            />
                                        }
                                    </>
                                ) : (
                                    <>
                                        {showChatList ? (
                                            <ChatList
                                                setShowChatList={setShowChatList}
                                                username={username}
                                            />
                                        ) : (
                                            <>
                                                <i
                                                    className="bi bi-arrow-left"
                                                    onClick={() => setShowChatList(true)}
                                                />
                                                {id &&
                                                    <ChatBox
                                                        ref={childRef}
                                                        messageList={messageList}
                                                        setMessageList={setMessageList}
                                                        currentUser={currentUser}
                                                        currentMessage={currentMessage}
                                                        setCurrentMessage={setCurrentMessage}
                                                        sendMessage={sendMessage}
                                                        handleToggleEmojiPicker={handleToggleEmojiPicker}
                                                        handleSelectEmoji={handleSelectEmoji}
                                                        showEmojiPicker={showEmojiPicker}
                                                        newMessageCount={newMessageCount}
                                                        setNewMessageCount={setNewMessageCount}
                                                        id={id}
                                                    />
                                                }
                                            </>
                                        )}
                                    </>
                                )}
                            </MDBRow>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};
