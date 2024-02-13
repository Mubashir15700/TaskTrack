import Swal from "sweetalert2";

const SweetAlert = {
    confirmAction: (title, text, confirmButtonText, confirmButtonColor, inputType) => {
        const options = {
            title: title || "Are you sure?",
            text: text || "Are you sure you want to proceed?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: confirmButtonColor || "#3085d6",
            cancelButtonColor: "#5bc0de",
            cancelButtonText: "Cancel",
            confirmButtonText: confirmButtonText || "Confirm",
        };

        if (inputType !== "") {
            options.input = inputType;
            options.inputPlaceholder = "Enter reason here";
            options.inputValidator = (value) => {
                if (!value) {
                    return "You need to enter a reason";
                }
            };
        }

        return Swal.fire(options);
    },
};

export default SweetAlert;
