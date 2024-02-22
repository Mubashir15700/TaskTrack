import { useState, useEffect } from "react";
import ErrorContent from "./ErrorContent";

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
            <ErrorContent
                message={
                    `Oops! Something went wrong.
                    Please try refreshing the page or contact support if the issue persists.`
                }
            />
        );
    }

    return children;
};

export default ErrorBoundary;
