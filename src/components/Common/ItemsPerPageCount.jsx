const ItemsPerPageCount = ({ value, onChange }) => {
    return (
        <div className="mb-3">
            <label htmlFor="itemsPerPage" className="form-label">Items Per Page:</label>
            <select
                id="itemsPerPage"
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
