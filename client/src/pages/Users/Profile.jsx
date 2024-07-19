import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { profileSchema } from "../../utils/validations/userValidations/profileSchema";
import { setUserData as setUpdatedUserData } from "../../redux/slices/userSlice";
import toast from "react-hot-toast";
import { updateProfile, deleteUserProfileImage } from "../../api/user/profile";
import ImageCrop from "../../components/ImageCrop";
import Address from "../../components/Users/Address";
import FormErrorDisplay from "../../components/FormErrorDisplay";
import IMAGE_URLS from "../../config/imageUrls";

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
  const [selectedAddress, setSelectedAddress] = useState("");
  const [errors, setErrors] = useState({});
  const [serverResponse, setServerResponse] = useState("");

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

  const deleteSuccess = async (updatedUser) => {
    toast.success("Deleted location successfully");
    dispatch(setUpdatedUserData(updatedUser));
  };

  const handleUpdate = async () => {
    try {
      // Validate formData against the profile schema
      const checkValidData = {
        username: userData.username,
        email: userData.email,
        phone: userData.phone,
      };

      if (newImageSelected) {
        checkValidData.profile = userData.profile
      }

      await profileSchema.validate(checkValidData, { abortEarly: false });

      setErrors({}); // Clear previous validation errors

      // If validation passes, proceed with profile update
      const formData = new FormData();
      formData.append("username", userData.username);
      formData.append("email", userData.email);
      formData.append("phone", userData.phone);

      if (selectedAddress && typeof selectedAddress === "object") {
        const locationString = JSON.stringify(selectedAddress);
        formData.append("location", locationString);
      }

      if (userData.profile instanceof File && newImageSelected) {
        formData.append("profile", userData.profile);
      }

      const response = await updateProfile(formData, currentUser?._id);

      if (response && response?.status === 200) {
        dispatch(setUpdatedUserData(response.updatedUser));
        navigate("/account");
        toast.success("Updated profile successfully");
        setChanged(false);
      } else {
        console.error("Error updating profile:", response);
        toast.error(response?.message || "An error occurred during profile update");
      }
    } catch (error) {
      console.error("Error updating profile:", error);

      // Handle the validation error or set an appropriate server response
      if (error.name === "ValidationError") {
        const validationErrors = {};
        error.inner.forEach(err => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      } else {
        setServerResponse({ status: "failed", message: "An error occurred during profile update" });
      }
    }
  };

  const handleDeleteProfile = async () => {
    try {
      const response = await deleteUserProfileImage(currentUser?._id, currentUser.profile);
      if (response && response.status === 200) {
        const updatedUser = response.updatedUser;
        dispatch(setUpdatedUserData(updatedUser));
        navigate("/profile");
        toast.success("Deleted profile image successfully");
      } else {
        toast.error("An unexpected error occurred during profile image update");
      }
    } catch (error) {
      console.error("Error deleting profile image:", error);
      toast.error("An unexpected error occurred during profile image update");
    }
  };

  // the profile image URL
  const imageUrl = `${import.meta.env.VITE_AXIOS_BASE_URL}/uploads/profile/${currentUser?.profile}`;

  const AddressProps = {
    userId: currentUser?._id,
    label: "Lives In",
    currentAddress: currentUser?.location || {},
    onAddressChange: newAddressSelected,
    onLocationDeleted: deleteSuccess,
    usage: "profile",
  };

  return (
    <div className="col-10 my-3 mx-auto">
      {currentUser ? (
        <div className="p-3 p-lg-5 border">
          <div className="d-flex align-items-end">
            {(currentUser.profile && !newImageSelected) && (
              <img
                src={imageUrl}
                alt="Profile"
                style={{ maxHeight: "130px", width: "150px" }}
                className="rounded-3 img-fluid"
              />
            )}
            {currentUser.profile && (
              <i
                className="bi bi-trash"
                style={{ cursor: "pointer" }}
                onClick={handleDeleteProfile}
              />
            )}
            {(!currentUser.profile && !newImageSelected) && (
              <img
                src={IMAGE_URLS.avatar}
                alt="Profile"
                style={{ maxHeight: "130px", width: "150px" }}
                className="rounded-circle img-fluid"
              />
            )}
          </div>
          <div className="mb-2">
            <ImageCrop onNewImageUrl={addCropImg} purpose={"profile"} />
          </div>
          <FormErrorDisplay error={errors.profile} />
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
                <FormErrorDisplay error={errors.username} />
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
                <FormErrorDisplay error={errors.phone} />
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
                <FormErrorDisplay error={errors.email} />
              </div>
            </div>
            <div>
              <Address {...AddressProps} />
            </div>
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
            {serverResponse && (
              <div className={`alert ${serverResponse.status === "failed" ? "alert-danger" : "alert-success"} mt-3`} role="alert">
                {serverResponse.message}
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
