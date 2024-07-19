import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import IMAGE_URLS from "../../configs/imageUrls";
import { getChatLists } from "../../api/user/utils";
import { MDBCol, MDBIcon, MDBTypography, MDBInputGroup } from "mdb-react-ui-kit";

const ChatList = ({ setShowChatList }) => {
    const [chatLists, setChatLists] = useState([]);

    useEffect(() => {
        const getAllChats = async () => {
            try {
                const response = await getChatLists();
                if (response && response.status === 200) {
                    setChatLists(response.chats);
                }
            } catch (error) {
                console.log(error);
            }
        };

        getAllChats();
    }, []);

    return (
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
                    {chatLists.length ?
                        chatLists.map((chat, index) => (
                            <Link to={`/chat/${chat.otherUser._id}/${chat.otherUser.username}`} className="p-2" key={index}>
                                <div
                                    onClick={() => setShowChatList(false)}
                                    className="d-flex justify-content-between"
                                >
                                    <div className="d-flex flex-row">
                                        <div>
                                            <img
                                                src={IMAGE_URLS.chatUser}
                                                alt="avatar"
                                                className="d-flex align-self-center me-3"
                                                width="60"
                                            />
                                        </div>
                                        <div className="pt-1">
                                            <p className="fw-bold mb-0">{chat.otherUser.username}</p>
                                            <p className="small text-muted">
                                                last message.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="pt-1">
                                        <p className="small text-muted mb-1">time</p>
                                    </div>
                                </div>
                            </Link>
                        ))
                        :
                        <div>
                            No chats found.
                        </div>
                    }
                </MDBTypography>
            </div>
        </MDBCol>
    );
};

export default ChatList;
