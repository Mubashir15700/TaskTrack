import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import DisplayMap from "../../components/Users/DisplayMap";
import { getCurrentLocation, deleteLocation } from "../../api/userApi";
import { locationSchema } from "../../validations/userValidations/locationSchema";

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
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!Object.values(selectedAddress).length) {
            let addressToSet;
            if (currentAddress) {
                if (typeof currentAddress === "string") {
                    addressToSet = JSON.parse(currentAddress);
                    usage !== "admin" && onAddressChange(addressToSet);
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
            setManualEntryVisible(false);
            navigator.geolocation.getCurrentPosition(
                async (pos) => {
                    if (pos && pos.coords) {
                        const { latitude, longitude } = pos.coords;
                        const response = await getCurrentLocation({ latitude, longitude });

                        if (response && response.data) {
                            setMapVisible(true);
                            setSelectedAddress(response.data.fullAddress);
                            onAddressChange(response.data.fullAddress);
                        } else {
                            toast.error("Error while getting your current location");
                        }
                    } else {
                        toast.error("Error while getting your current location");
                    }
                },
                (error) => {
                    toast.error("Error while getting your current location");
                    console.log("Geolocation error: ", error);
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
        if (response.data.status === "success") {
            setSelectedAddress({});
            onLocationDeleted(response.data.deleteResult);
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
                                {errors.road && <span className="error-display">{errors.road}</span>}
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
                                {errors.village && <span className="error-display">{errors.village}</span>}
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
                                {errors.district && <span className="error-display">{errors.district}</span>}
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
                                {errors.state && <span className="error-display">{errors.state}</span>}
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
                                {errors.postcode && <span className="error-display">{errors.postcode}</span>}
                            </div>
                        </div>
                    </div>
                )}
                {(usage !== "display-job" && usage !== "display-laborer" && usage !== "admin") && (
                    <div className="d-flex flex-column flex-md-row justify-content-between mt-3">
                        <button
                            className="btn btn-primary col-md-5 my-sm-1"
                            onClick={handleGetCurrentLocation}
                        >
                            <i className="bi bi-crosshair mx-2"></i>
                            Get your current location
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
