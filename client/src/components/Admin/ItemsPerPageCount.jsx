const ItemsPerPageCount = ({ value, onChange }) => {
    return (
        <div className="mb-3 d-flex align-items-center me-2">
            <label htmlFor="itemsPerPage" className="form-label">Items Per Page:</label>
            <select
                id="itemsPerPage"
                className="form-select form-select-sm w-25 ms-2"
                value={value}
                onChange={onChange}
            >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
            </select>
        </div>
    );
};

export default ItemsPerPageCount;
