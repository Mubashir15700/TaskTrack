import IMAGE_URLS from "../../config/imageUrls";
import { MDBCol, MDBIcon, MDBTypography, MDBInputGroup } from "mdb-react-ui-kit";

const ChatList = ({ username, setShowChatList }) => {
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
                    <li className="p-2">
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
                                    <p className="fw-bold mb-0">{username}</p>
                                    <p className="small text-muted">
                                        Lorem ipsum dolor sit.
                                    </p>
                                </div>
                            </div>
                            <div className="pt-1">
                                <p className="small text-muted mb-1">Yesterday</p>
                            </div>
                        </div>
                    </li>
                </MDBTypography>
            </div>
        </MDBCol>
    );
};

export default ChatList;
