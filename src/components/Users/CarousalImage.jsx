const CarousalImage = ({ src }) => {
    return (
        <div>
            <img style={{ height: "80vh" }}
                className="d-block w-100"
                src={src}
                alt="First slide"
            />
        </div>
    );
};

export default CarousalImage;
