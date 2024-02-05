export const getMessageTime = (timestamp) => {
    const messageDate = new Date(timestamp);
    const currentDate = new Date();

    if (
        messageDate.getDate() === currentDate.getDate() &&
        messageDate.getMonth() === currentDate.getMonth() &&
        messageDate.getFullYear() === currentDate.getFullYear()
    ) {
        // Today
        return messageDate.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        });
    } else {
        // Check if it's yesterday
        const yesterday = new Date();
        yesterday.setDate(currentDate.getDate() - 1);

        if (
            messageDate.getDate() === yesterday.getDate() &&
            messageDate.getMonth() === yesterday.getMonth() &&
            messageDate.getFullYear() === yesterday.getFullYear()
        ) {
            // Yesterday
            return "Yesterday " + messageDate.toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
            });
        } else {
            // If not today or yesterday, format as usual
            return messageDate.toLocaleString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
            });
        }
    }
};
