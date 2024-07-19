import Address from "../../../../components/Users/Address";
import FormErrorDisplay from "../../../../components/FormErrorDisplay";

function SubForm1({ formData, setFormData, errors }) {
    const newAddressSelected = (selectedAddress) => {
        setFormData({ ...formData, location: selectedAddress });
    };

    const AddressProps = {
        userId: formData?._id,
        label: "Lives In",
        currentAddress: formData?.location,
        onAddressChange: newAddressSelected,
        usage: "form",
    };

    return (
        <>
            <h5 className="mb-2">Basic Information</h5>
            <div className="form-group row">
                <div className="col-md-6">
                    <label>Username</label>
                    <input
                        type="text"
                        className="form-control"
                        name="username"
                        value={formData.username}
                        onChange={(e) => {
                            setFormData({ ...formData, username: e.target.value });
                        }}
                    />
                    <FormErrorDisplay error={errors.username} />
                </div>
                <div className="col-md-6">
                    <label>Phone</label>
                    <input
                        type="number"
                        className="form-control"
                        name="phone"
                        value={formData.phone}
                        onChange={(e) => {
                            setFormData({ ...formData, phone: e.target.value });
                        }}
                    />
                    <FormErrorDisplay error={errors.phone} />
                </div>
                <div className="col-md-12 my-2">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                        }}
                    />
                    <FormErrorDisplay error={errors.email} />
                </div>
                <Address {...AddressProps} />
                <FormErrorDisplay error={errors.location} />
            </div>
        </>
    );
};

export default SubForm1;
