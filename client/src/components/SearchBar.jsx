import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchResults } from "../redux/slices/adminSlice";
import { setSearchResults as setUserSearchResults } from "../redux/slices/userSlice";
import axios from "../configs/axiosConfig";
import { search } from "../api/utility";
import { debounce } from "lodash";

const SearchBar = ({ role, onError }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [searchSelect, setSearchSelect] = useState(
        role === "admin" ? "users" : "laborers"
    );

    const handleSearch = async (e) => {
        // Check if the search input is not empty
        if (e.target.value !== "") {
            // Create a CancelToken source
            const cancelTokenSource = axios.CancelToken.source();

            try {
                // Perform the search request with the cancel token
                const response = await search({
                    searchWith: e.target.value,
                    searchOn: searchSelect
                }, cancelTokenSource.token);

                // Check if the response is successful (status code 200)
                if (response && response.status === 200) {
                    // Dispatch the search results to Redux store
                    role === "admin" ?
                        dispatch(setSearchResults({
                            searchOn: searchSelect, results: response.result
                        })) :
                        dispatch(setUserSearchResults({
                            searchOn: searchSelect, results: response.result
                        }));

                    // Navigate to the appropriate page based on searchSelect
                    switch (searchSelect) {
                        case "users":
                            navigate("/admin/users");
                            break;
                        case "plans":
                            navigate("/admin/subscription-plans");
                            break;
                        case "banners":
                            navigate("/admin/banners");
                            break;
                        case "laborers":
                            navigate("/laborers");
                            break;
                        case "jobs":
                            navigate("/jobs");
                            break;
                        default:
                            navigate("/*");
                    }
                } else {
                    // Handle the case where the response status is not 200
                    onError("An error occurred while searching");
                }
            } catch (error) {
                // Handle errors, including cancellation
                if (axios.isCancel(error)) {
                    console.log("Search request canceled:", error.message);
                } else {
                    onError("An error occurred while searching");
                }
            } finally {
                // Cancel the request if component unmounts or performs a new search
                cancelTokenSource.cancel("Request canceled by the user");
            }
        } else {
            // Clear the search results if the search input is empty
            dispatch(setSearchResults({ searchOn: null, results: null }));
        }
    };

    const delayedSearch = debounce(handleSearch, 300); // 300 milliseconds debounce delay

    return (
        <form className="w-75 input-group search-form" role="search">
            <input
                className="w-50 form-control search-input"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={delayedSearch}
            />
            <select
                className="w-25 form-control form-select search-select"
                id="inputGroupSelect03"
                onChange={(e) => setSearchSelect(e.target.value)}
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
