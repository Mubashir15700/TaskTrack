import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getUser, userAction } from "../../../api/admin/user";
import Address from "../../../components/Users/Address";
import SweetAlert from "../../../components/Common/SweetAlert";

const UserDetails = () => {
    const [user, setUser] = useState();
    const [error, setError] = useState();

    const { id } = useParams();

    useEffect(() => {
        const getUserDetails = async () => {
            try {
                const response = await getUser(id);
                if (response && response.status === 200 && response.user) {
                    const user = response.user;
                    if (user.location && Object.values(user.location).length) {
                        user.location = user.location;
                    }
                    setUser(user);
                } else {
                    setError("Failed to fetch user details.");
                }
            } catch (error) {
                setError("An error occurred while fetching user details.");
                console.error("Error fetching user details:", error);
            }
        };
        getUserDetails();
    }, [id]);

    const confirmBlockUnblock = async (isBlocked) => {
        const result = await SweetAlert.confirmAction(
            `${isBlocked ? "Unblock" : "Block"}`,
            `Are you sure you want to ${isBlocked ? "Unblock" : "Block"} this user?`,
            `${isBlocked ? "Unblock" : "Block"}`,
            "#d9534f"
        );

        if (result.isConfirmed) {
            handleBlockUnblock();
        }
    };

    const handleBlockUnblock = async () => {
        try {
            const response = await userAction(id);
            if (response) {
                if (response.status === 200) {
                    const updatedUserResponse = await getUser(id);
                    if (updatedUserResponse && updatedUserResponse.status === 200) {
                        setUser(updatedUserResponse.user);
                    } else {
                        setError("Failed to fetch updated user data.");
                    }
                } else {
                    setError("Something went wrong");
                }
            }
        } catch (error) {
            setError("Failed to update user");
            console.error("user action error: ", error);
        }
    };

    useEffect(() => {
        error && toast.error(error);
    }, [error]);

    return (
        <div className="col-10 my-3 mx-auto">
            {user ? (
                <div className="p-3 p-lg-5 border">
                    <div>
                        {user.profile ? (
                            <img
                                src={`http://localhost:3000/uploads/profile/${user?.profile}`}
                                alt="profileImage"
                                style={{ height: "130px", width: "150px" }}
                                className="rounded-3"
                            />
                        ) : (
                            <div id="personIcon" style={{ display: "block" }}>
                                <i className="bi bi-person-circle fs-1"></i>
                            </div>
                        )}
                    </div>
                    <div>
                        <div className="form-group row">
                            <div className="col-md-6">
                                <label>Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    value={user?.username}
                                    disabled
                                />
                            </div>
                            <div className="col-md-6">
                                <label>Phone</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="phone"
                                    value={user?.phone}
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-md-12">
                                <label>Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={user?.email}
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-md-6">
                                <label>Is Verified</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    value={user?.isVerified}
                                    disabled
                                />
                            </div>
                            <div className="col-md-6">
                                <label>Is Job Seeker</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="phone"
                                    value={user?.isJobSeeker}
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <Address
                                label={"Lives In"}
                                currentAddress={user.location}
                                usage={"admin"}
                            />
                        </div>
                        <button
                            className={`btn ${user.isBlocked ? "btn-warning" : "btn-danger"} mt-3`}
                            onClick={() => confirmBlockUnblock(user.isBlocked)}
                        >
                            {user.isBlocked ? "Unblock" : "Block"}
                        </button>
                    </div>
                </div>
            ) : (
                <div className="mt-5 mx-auto">
                    <p>No data found</p>
                </div>
            )}
        </div >
    );
};

export default UserDetails;
