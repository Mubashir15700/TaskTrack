const FormErrorDisplay = ({ error }) => {
    return (
        <div className="d-flex align-items-start mb-2">
            <span className="text-danger align-self-start">{error}</span>
        </div>
    );
};

export default FormErrorDisplay;
