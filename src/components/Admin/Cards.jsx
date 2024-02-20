const Cards = ({ title, value }) => {
    return (
        <div className="col-md-4 mb-2">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{value}</p>
                </div>
            </div>
        </div>
    );
};

export default Cards;
