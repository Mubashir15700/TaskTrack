const SearchBar = ({ role, onSearch, onSelect }) => {
    return (
        <form className="w-75 input-group search-form" role="search">
            <input
                className="w-50 form-control search-input"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={onSearch}
            />
            <select
                className="w-25 form-control form-select search-select"
                id="inputGroupSelect03"
                onChange={(e) => onSelect(e.target.value)}
            >
                {role === "user" ? (
                    <>
                        <option value="laborers">Laborers</option>
                        <option value="jobs">Jobs</option>
                    </>
                ) : (
                    <>
                        <option value="users">Users</option>
                        <option value="plans">Plans</option>
                        <option value="banners">Banners</option>
                    </>
                )}
            </select>
        </form>
    );
};

export default SearchBar;
