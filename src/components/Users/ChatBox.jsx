import EmojiPicker from "emoji-picker-react";
import { getMessageTime } from "../../utils/dateutil";
import IMAGE_URLS from "../../config/imageUrls";
import { MDBCol, MDBIcon } from "mdb-react-ui-kit";

const ChatBox = ({
    messageList,
    currentUser,
    currentMessage,
    setCurrentMessage,
    sendMessage,
    handleToggleEmojiPicker,
    handleScrollButtonClick,
    handleSelectEmoji,
    showScrollButton,
    showEmojiPicker,
    id
}) => {
    return (
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
    );
};

export default ChatBox;
