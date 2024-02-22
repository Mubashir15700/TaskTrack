const ErrorContent = ({ status, message }) => {
    return (
        <div className="d-flex align-items-center justify-content-center min-vh-100">
            <div className="text-center">
                <div className="mb-4">
                    {status ?
                        <h1 className="display-1 mb-0">{status}</h1> :
                        <h2>SORRY!</h2>
                    }
                </div>
                <div>
                    <div className="font-weight-light">
                        {message}
                    </div>
                </div>
                <div className="mt-5">
                    <p className="font-weight-medium">
                        Copyright © All rights reserved | made by Sm15700
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ErrorContent;
