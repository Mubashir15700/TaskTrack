import Swal from "sweetalert2";

const SweetAlert = {
    confirmAction: (title, text, confirmButtonText, confirmButtonColor) => {
        return Swal.fire({
            title: title || "Are you sure?",
            text: text || "Are you sure you want to proceed?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: confirmButtonColor || "#3085d6",
            cancelButtonColor: "#5bc0de",
            cancelButtonText: "Cancel",
            confirmButtonText: confirmButtonText || "Confirm",
        });
    },
};

export default SweetAlert;
