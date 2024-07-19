import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import EmojiPicker from "emoji-picker-react";
import { getMessageTime } from "../../utils/dateUtil";
import IMAGE_URLS from "../../configs/imageUrls";
import { MDBCol, MDBIcon } from "mdb-react-ui-kit";
import { debounce } from "lodash";

const ChatBox = forwardRef(({
    messageList,
    setMessageList,
    currentUser,
    currentMessage,
    setCurrentMessage,
    sendMessage,
    handleToggleEmojiPicker,
    handleSelectEmoji,
    showEmojiPicker,
    newMessageCount,
    setNewMessageCount,
    id
}, ref) => {
    const [showScrollButton, setShowScrollButton] = useState(false);
    const messageContainerRef = useRef(null);

    useImperativeHandle(ref, () => {
        return {
            debouncedCheckScrollPosition
        }
    });

    useEffect(() => {
        const messageContainer = messageContainerRef.current;
        if (messageContainer) {
            messageContainer.addEventListener("scroll", debouncedCheckScrollPosition);

            // Initial check on mount
            debouncedCheckScrollPosition();

            scrollToBottom();

            return () => {
                setMessageList([]);
                messageContainer.removeEventListener("scroll", debouncedCheckScrollPosition);
            };
        }
    }, []);

    // to fix
    const scrollToBottom = () => {
        const messageContainer = messageContainerRef.current;
        if (messageContainer && messageContainer.lastChild) {
            setTimeout(() => {
                messageContainer.lastChild.scrollIntoView({ behavior: "smooth" });
            }, 50);
        }
    };

    const handleScrollButtonClick = () => {
        scrollToBottom();
        setNewMessageCount(0);
    };

    const checkScrollPosition = () => {
        const messageContainer = messageContainerRef.current;
        if (messageContainer) {
            const isAtBottom = messageContainer.scrollHeight - messageContainer.scrollTop === messageContainer.clientHeight;
            setShowScrollButton(!isAtBottom);
        }
    };

    const debouncedCheckScrollPosition = debounce(checkScrollPosition, 200);

    return (
        <MDBCol md="6" lg="7" xl="8"
            className={`border rounded p-2 ${!showEmojiPicker ? "d-flex flex-column justify-content-end" : ""}`}
            style={{ height: "75vh" }}
        >
            <div
                ref={messageContainerRef}
                className="overflow-auto message-container"
                style={{ maxHeight: !showEmojiPicker ? "400px" : "100px" }}
            >
                {messageList.map((messageContent, index) => (
                    <div
                        className={`d-flex flex-row ${currentUser?._id === messageContent?.senderId ?
                            "justify-content-end" :
                            "justify-content-start"
                            }`
                        }
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
                                    maxWidth: "300px"
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
                    src={IMAGE_URLS.chatUser}
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
                        event.key === "Enter" && (event.preventDefault(), sendMessage(), scrollToBottom());
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
                    <a className="ms-3 position-relative" onClick={handleScrollButtonClick} style={{ display: "inline-block" }}>
                        {newMessageCount > 0 ? <p className="badge bg-danger text-light position-absolute start-100 translate-middle-y">
                            {newMessageCount}
                        </p> : null}
                        <MDBIcon fas icon="angle-double-down" />
                    </a>
                )}
            </div>
            {showEmojiPicker && (
                <EmojiPicker
                    onEmojiClick={handleSelectEmoji}
                    lazyLoadEmojis={true}
                    height={300}
                    width={"100%"}
                />
            )}
        </MDBCol>
    );
});

export default ChatBox;
