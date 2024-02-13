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
        return (
            <div className="d-flex justify-content-center align-items-center">
                <p className="mt-5">Something went wrong.</p>
            </div>
        );
    }

    return children;
};

export default ErrorBoundary;
