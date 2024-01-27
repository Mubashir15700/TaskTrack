import { useState, useEffect } from "react";

const ErrorBoundary = ({ children }) => {
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const errorHandler = (error) => {
            console.error(error);
            setHasError(true);
        };

        // Attach the error handler to the window
        window.addEventListener("error", errorHandler);

        return () => {
            // Detach the error handler when the component unmounts
            window.removeEventListener("error", errorHandler);
        };
    }, []);

    if (hasError) {
        // You can render any custom fallback UI
        return <div>Something went wrong.</div>;
    }

    return children;
};

export default ErrorBoundary;
