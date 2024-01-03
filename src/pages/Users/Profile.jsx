import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setUserData as setUpdatedUserData } from "../../redux/slices/userSlice";
import toast from "react-hot-toast";
import ImageCrop from "../../components/Partials/ImageCrop";
import { updateProfile, deleteUserProfileImage } from "../../services/api";
import Address from "../../components/Users/Address";

const UserDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user.userData);

  const [userData, setUserData] = useState({
    username: currentUser?.username,
    profile: currentUser?.profile,
    phone: currentUser?.phone,
    email: currentUser?.email,
  });
  const [changed, setChanged] = useState(false);
  const [newImageSelected, setNewImageSelected] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState('');

  const handleInputChange = (e) => {
    if (currentUser !== userData) {
      setChanged(true);
    }
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const addCropImg = (file) => {
    setUserData({
      ...userData,
      profile: file,
    });
    setChanged(true);
    setNewImageSelected(true);
  };

  const newAddressSelected = (address) => {
    setSelectedAddress(address);
    setChanged(true);
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      (userData.username !== currentUser.username) && formData.append("username", userData.username);
      (userData.email !== currentUser.email) && formData.append("email", userData.email);
      (userData.phone !== currentUser.phone) && formData.append("phone", userData.phone);
      // Convert selectedAddress to JSON string if it's an object
      if (selectedAddress && typeof selectedAddress === 'object') {
        const locationString = JSON.stringify(selectedAddress);
        formData.append("location", locationString);
      }

      // Check if a new profile image is selected
      if (userData.profile instanceof File && newImageSelected) {
        formData.append("profile", userData.profile);
      }

      const response = await updateProfile(formData, currentUser?._id);

      if (response && response.data?.status === "success") {
        dispatch(setUpdatedUserData(response.data.updatedUser));
        navigate("/profile");
        toast.success("Updated profile successfully");
        setChanged(false);
      } else {
        console.error('Error updating profile:', response?.data);
        toast.error(response?.data?.message || 'An error occurred during profile update');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('An unexpected error occurred during profile update');
    }
  };

  const handleDeleteProfile = async () => {
    try {
      const response = await deleteUserProfileImage(currentUser?._id, currentUser.profile);
      if (response && response.data.status === "success") {
        dispatch(setUpdatedUserData(response.data.updatedUser));
        navigate("/profile");
        toast.success("Deleted profile image successfully");
      } else {
        toast.error('An unexpected error occurred during profile image update');
      }
    } catch (error) {
      console.error('Error deleting profile image:', error);
      toast.error('An unexpected error occurred during profile image update');
    }
  };

  // the profile image URL
  const imageUrl = `http://localhost:3000/uploads/${currentUser?.profile}`;

  return (
    <div className="col-md-8 my-3 mx-auto">
      {currentUser ? (
        <div className="p-3 p-lg-5 border">
          {(currentUser.profile && !newImageSelected) && (
            <img
              src={imageUrl}
              alt="Profile"
              style={{ height: "130px", width: "150px" }}
              className="rounded-3"
            />
          )}
          {(!currentUser.profile && !newImageSelected) && (
            <i className="bi bi-person-circle fs-1 mb-3"></i>
          )}
          <div className="d-flex mb-2">
            <ImageCrop onNewImageUrl={addCropImg} />
            <div className=" me-4">
            </div>
            {currentUser.profile && (
              <i
                className="bi bi-trash me-4"
                style={{ cursor: 'pointer' }}
                onClick={handleDeleteProfile}
              />
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
                  value={userData?.username}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6">
                <label>Phone</label>
                <input
                  type="number"
                  className="form-control"
                  name="phone"
                  value={userData?.phone}
                  onChange={handleInputChange}
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
                  value={userData?.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <Address
              currentAddress={currentUser.location}
              onAddressChange={newAddressSelected}
            />
            {changed && (
              <div className="form-group row mt-3">
                <div className="col-lg-12">
                  <button
                    type="button"
                    className="btn btn-primary btn-block"
                    onClick={handleUpdate}
                  >
                    Update Profile
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="mt-5 mx-auto">
          <p>No data found</p>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
