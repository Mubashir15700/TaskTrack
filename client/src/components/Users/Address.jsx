import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import DisplayMap from "../../components/Users/DisplayMap";
import FormErrorDisplay from "../FormErrorDisplay";
import { getCurrentLocation, deleteLocation } from "../../api/user/profile";
import { locationSchema } from "../../utils/validations/userValidations/locationSchema";

const Address = ({ userId, label, currentAddress, onAddressChange, onLocationDeleted, usage }) => { 
    const [selectedAddress, setSelectedAddress] = useState({});
    const [textareaValue, setTextareaValue] = useState("");
    const [mapVisible, setMapVisible] = useState(false);
    const [manualEntryVisible, setManualEntryVisible] = useState(false);
    const [manualEntry, setManualEntry] = useState({
        road: "",
        village: "",
        district: "",
        state: "",
        postcode: undefined,
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!Object.values(selectedAddress).length) {
            let addressToSet;
            if (currentAddress) {
                if (typeof currentAddress === "string") {
                    addressToSet = JSON.parse(currentAddress);
                    if (usage !== "admin" && usage !== "display-laborer") {
                        onAddressChange(addressToSet);
                    }
                } else {
                    addressToSet = currentAddress;
                }
            } else {
                addressToSet = {};
            }
            setSelectedAddress(addressToSet);
        }
    }, [currentAddress]);

    useEffect(() => {
        if (selectedAddress && selectedAddress.lat && selectedAddress.lon) {
            setMapVisible(true);
        }

        setTextareaValue(
            (selectedAddress && Object.values(selectedAddress).length) ? (
                `${selectedAddress.road}, ${selectedAddress.village}, \n ${selectedAddress.district}, ${selectedAddress.state}, ${selectedAddress.postcode}`
            ) : "No Location provided"
        );

    }, [selectedAddress]);

    const handleGetCurrentLocation = async () => {
        try {
            setLoading(true);
            setManualEntryVisible(false);
            navigator.geolocation.getCurrentPosition(
                async (pos) => {
                    if (pos && pos.coords) {
                        const { latitude, longitude } = pos.coords;
                        const response = await getCurrentLocation({ latitude, longitude });

                        if (response && response) {
                            setMapVisible(true);
                            setSelectedAddress(response.fullAddress);
                            onAddressChange(response.fullAddress);
                            setLoading(false);
                        } else {
                            toast.error("Error while getting your current location");
                            setLoading(false);
                        }
                    } else {
                        toast.error("Error while getting your current location");
                        setLoading(false);
                    }
                },
                (error) => {
                    toast.error("Error while getting your current location");
                    console.log("Geolocation error: ", error);
                    setLoading(false);
                }
            );
        } catch (error) {
            toast.error("Error while getting your current location");
            console.log("Get current location error: ", error);
        }
    };

    const handleEnterLocationManually = () => {
        setManualEntryVisible(true);
    };

    const handleManualEntryChange = (e) => {
        const { name, value } = e.target;
        setManualEntry(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleDeleteLocation = async () => {
        const response = await deleteLocation(userId);
        if (response.status === 200) {
            setSelectedAddress({});
            onLocationDeleted(response.deleteResult);
        }
    };

    const saveManuelLocationEntry = async () => {
        try {
            // Validate manualEntry against the address schema
            await locationSchema.validate(manualEntry, { abortEarly: false });
            // If validation passes, update the selected address
            setSelectedAddress(manualEntry);
            onAddressChange(manualEntry);
        } catch (error) {
            // Handle the validation error
            const validationErrors = {};
            if (error.name === "ValidationError") {
                error.inner.forEach(err => {
                    validationErrors[err.path] = err.message;
                });
            }
            setErrors(validationErrors);
            // Handle validation errors (you can display them or handle as needed)
            console.error("Address validation error:", validationErrors);
        }
    };

    return (
        <div className="form-group row">
            <div className="col-md-12">
                <label>{label}</label>
                <div className="d-flex">
                    <textarea
                        type="text"
                        name="location"
                        className="form-control"
                        defaultValue={textareaValue}
                        disabled
                        style={{ resize: "none" }}
                    />
                    {(textareaValue !== "No Location provided" && usage === "profile") && (
                        <button className="btn" onClick={handleDeleteLocation}>
                            <i className="bi bi-x-circle text-danger fs-3"></i>
                        </button>
                    )}
                </div>
                {(mapVisible && selectedAddress && selectedAddress.lat && selectedAddress.lon) && (
                    <DisplayMap
                        latitude={selectedAddress.lat}
                        longitude={selectedAddress.lon}
                    />
                )}
                {manualEntryVisible && (
                    <div>
                        <div className="d-flex">
                            <div className="col-md-6">
                                <label>Road</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="road"
                                    value={manualEntry.road}
                                    onChange={handleManualEntryChange}
                                />
                                <FormErrorDisplay error={errors.road} />
                            </div>
                            <div className="col-md-6">
                                <label>Village</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="village"
                                    value={manualEntry.village}
                                    onChange={handleManualEntryChange}
                                />
                                <FormErrorDisplay error={errors.village} />
                            </div>
                        </div>
                        <div className="d-flex">
                            <div className="col-md-4">
                                <label>District</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="district"
                                    value={manualEntry.district}
                                    onChange={handleManualEntryChange}
                                />
                                <FormErrorDisplay error={errors.district} />
                            </div>
                            <div className="col-md-4">
                                <label>State</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="state"
                                    value={manualEntry.state}
                                    onChange={handleManualEntryChange}
                                />
                                <FormErrorDisplay error={errors.state} />
                            </div>
                            <div className="col-md-4">
                                <label>Pincode</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="postcode"
                                    value={manualEntry.pincode}
                                    onChange={handleManualEntryChange}
                                />
                                <FormErrorDisplay error={errors.postcode} />
                            </div>
                        </div>
                    </div>
                )}
                {(usage !== "display-job" && usage !== "display-laborer" && usage !== "admin") && (
                    <div className="d-flex flex-column flex-md-row justify-content-between mt-3">
                        <button
                            className="btn btn-primary col-md-5 my-sm-1 mb-1"
                            disabled={loading}
                            onClick={handleGetCurrentLocation}
                        >
                            {loading && (
                                <span
                                    className="spinner-border spinner-border-sm me-1"
                                    aria-hidden="true"
                                ></span>
                            )}
                            <i className="bi bi-crosshair mx-2"></i>
                            {loading ? "Fetching Location..." : "Get your current location"}
                        </button>
                        {!manualEntryVisible ? (
                            <button
                                className="btn btn-outline-dark col-md-5"
                                onClick={handleEnterLocationManually}
                            >
                                Add location manually
                            </button>
                        ) : (
                            <button
                                className="btn btn-dark col-md-5"
                                onClick={saveManuelLocationEntry}
                            >
                                Save location
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Address;
