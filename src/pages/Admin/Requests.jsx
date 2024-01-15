import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/slices/adminSlice";
import toast from "react-hot-toast";
import TableDataDisplay from "../../components/Admin/TableDataDisplay";
import { getRequests } from "../../services/adminApi";

const Requests = () => {

    const dispatch = useDispatch();

    const [requests, setRequests] = useState([]);
    const [error, setError] = useState();
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(2);

    useEffect(() => {
        const getAllRequests = async () => {
            try {
                // dispatch(setLoading(true));
                const response = await getRequests(itemsPerPage, currentPage);
                if (response && response.data.status === "success" && response.data.requests) {
                    // console.log(response.data.requests);
                    setRequests(response.data.requests);
                    setPageCount(response.data.totalPages);
                } else {
                    setError("Failed to fetch requests data.");
                }
            } catch (error) {
                setError("An error occurred while fetching requests data.");
                console.error("Error fetching requests data:", error);
            } finally {
                // dispatch(setLoading(false));
            }
        };

        getAllRequests();
    }, [currentPage, itemsPerPage]);

    useEffect(() => {
        error && toast.error(error);
    }, [error]);

    const columns = [
        {
            name: "Title",
            selector: (row) => row.title,
            sortable: true,
        },
        {
            name: "Description",
            selector: (row) => row.description,
            sortable: true,
        },
        {
            name: "Is Active",
            selector: (row) => row.isActive,
            sortable: true,
            cell: row => row.isActive ? "Yes" : "No",
        },
        {
            name: "Actions",
            width: "190px",
            cell: row => (
                <div className="d-flex gap-2">
                    <Link to={`/admin/laborer-requests/view-request-details/${row._id}`} className="btn btn-primary">
                        View
                    </Link>
                </div>
            ),
        },
    ];

    return (
        <TableDataDisplay
            heading={"Requests"}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={(value) => setItemsPerPage(value)}
            dataTableColumns={columns}
            dataTableData={requests}
            pageCount={pageCount}
            onPageChange={({ selected }) => setCurrentPage(selected)}
        />
    );
};

export default Requests;
