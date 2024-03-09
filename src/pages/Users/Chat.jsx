import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import socket from "../../socket/socket";
import EmojiPicker from "emoji-picker-react";
import { getMessageTime } from "../../utils/dateutil";
import { updateMessagesReadStatus } from "../../api/user/utils";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBIcon,
    MDBTypography,
    MDBInputGroup,
} from "mdb-react-ui-kit";

export default function Chat() {
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
                                <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0">
                                    <div className="p-3">
                                        <MDBInputGroup className="rounded mb-3">
                                            <input
                                                className="form-control rounded"
                                                placeholder="Search"
                                                type="search"
                                            />
                                            <span
                                                className="input-group-text border-0"
                                                id="search-addon"
                                            >
                                                <MDBIcon fas icon="search" />
                                            </span>
                                        </MDBInputGroup>

                                        <MDBTypography
                                            listUnStyled
                                            className="mb-0 overflow-auto"
                                            style={{ maxHeight: "400px" }}
                                        >
                                            <li className="p-2">
                                                <a
                                                    href="#!"
                                                    className="d-flex justify-content-between"
                                                >
                                                    <div className="d-flex flex-row">
                                                        <div>
                                                            <img
                                                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                                                                alt="avatar"
                                                                className="d-flex align-self-center me-3"
                                                                width="60"
                                                            />
                                                        </div>
                                                        <div className="pt-1">
                                                            <p className="fw-bold mb-0">{username}</p>
                                                            <p className="small text-muted">
                                                                Lorem ipsum dolor sit.
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="pt-1">
                                                        <p className="small text-muted mb-1">Yesterday</p>
                                                    </div>
                                                </a>
                                            </li>
                                        </MDBTypography>
                                    </div>
                                </MDBCol>

                                <MDBCol
                                    md="6"
                                    lg="7"
                                    xl="8"
                                    className="border rounded p-2"
                                >
                                    <div
                                        className="overflow-auto message-container"
                                        style={{
                                            maxHeight: "400px"
                                        }}
                                    >
                                        {messageList.map((messageContent, index) => (
                                            <div
                                                className={`d-flex flex-row 
                                                ${currentUser?._id === messageContent?.senderId ?
                                                        "justify-content-end" :
                                                        "justify-content-start"
                                                    }
                                                    `}
                                                key={index}
                                            >
                                                <div>
                                                    <p
                                                        className={`small p-2 mb-1 rounded-3 ${currentUser?._id === messageContent?.senderId ?
                                                            "me-3 text-white bg-primary" :
                                                            "ms-3"
                                                            }`
                                                        }
                                                        style={{
                                                            backgroundColor: "#f5f6f7",
                                                            maxWidth: "400px"
                                                        }}
                                                    >
                                                        {messageContent.message}
                                                    </p>
                                                    <p
                                                        className={`small ms-3 mb-3 rounded-3 text-muted float-end ${currentUser?._id === messageContent?.senderId ?
                                                            "me-3" :
                                                            "ms-3"
                                                            }`
                                                        }
                                                    >
                                                        {messageContent.time ? (
                                                            getMessageTime(new Date())
                                                        ) : (
                                                            getMessageTime(messageContent.timestamp)
                                                        )}
                                                        {messageContent?.senderId !== id && (
                                                            messageContent.isRead &&
                                                            <MDBIcon fas icon="check" />
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
                                        <img
                                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                                            alt="avatar 3"
                                            style={{ width: "40px", height: "100%" }}
                                        />
                                        <input
                                            type="text"
                                            value={currentMessage}
                                            onChange={(event) => {
                                                setCurrentMessage(event.target.value);
                                            }}
                                            onKeyDown={(event) => {
                                                event.key === "Enter" && sendMessage();
                                            }}
                                            className="form-control form-control-lg"
                                            id="exampleFormControlInput2"
                                            placeholder="Type message"
                                        />
                                        <a
                                            className="ms-3 text-muted"
                                            onClick={handleToggleEmojiPicker}
                                        >
                                            <MDBIcon fas icon="smile" />
                                        </a>
                                        <a className="ms-3" onClick={sendMessage}>
                                            <MDBIcon fas icon="paper-plane" />
                                        </a>
                                        {showScrollButton && (
                                            <a className="ms-3" onClick={handleScrollButtonClick}>
                                                <MDBIcon fas icon="angle-double-down" />
                                            </a>
                                        )}
                                    </div>
                                    {showEmojiPicker && (
                                        <EmojiPicker
                                            className="w-100"
                                            onEmojiClick={handleSelectEmoji}
                                        />
                                    )}
                                </MDBCol>
                            </MDBRow>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};
