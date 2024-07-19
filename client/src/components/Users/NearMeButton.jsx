import { Tooltip } from "react-tooltip";

const NearMeButton = ({ text, onClickNearMe }) => {

    return (
        <>
            <Tooltip
                id="near-me-tooltip"
                anchorSelect=".near-me-button"
                place="left"
                effect="solid"
                content={text}
            >
                {text}
            </Tooltip>
            <div className="text-end near-me-button">
                <button
                    className="btn btn-sm btn-primary"
                    onClick={onClickNearMe}
                >
                    <span className="d-none d-md-inline">
                        <i className="bi bi-crosshair mx-2"></i>
                        {text}
                    </span>
                    <span className="d-inline d-md-none">
                        <i className="bi bi-crosshair"></i>
                    </span>
                </button>
            </div>
        </>
    );
};

export default NearMeButton;
