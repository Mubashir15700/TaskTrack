const CarouselButton = ({ type }) => {
    return (
        <button
            className={`carousel-control-${type} mx-5`}
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide={type}>
            <span className={`carousel-control-${type}-icon`} aria-hidden="true"></span>
            <span className="visually-hidden">
                {type === "prev" ? "Previous" : "Next"}
            </span>
        </button>
    );
};

export default CarouselButton;
