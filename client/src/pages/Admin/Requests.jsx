import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import TableDataDisplay from "../../components/Admin/TableDataDisplay";
import { getRequests } from "../../api/admin/request";

const Requests = () => {
    const [requests, setRequests] = useState([]);
    const [error, setError] = useState();
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(2);

    useEffect(() => {
        const getAllRequests = async () => {
            try {
                const response = await getRequests(itemsPerPage, currentPage);
                if (response && response.status === 200) {
                    setRequests(response.requests);
                    setPageCount(response.totalPages);
                } else {
                    setError("Failed to fetch requests data.");
                }
            } catch (error) {
                setError("An error occurred while fetching requests data.");
                console.error("Error fetching requests data:", error);
            }
        };

        getAllRequests();
    }, [currentPage, itemsPerPage]);

    useEffect(() => {
        error && toast.error(error);
    }, [error]);

    const columns = [
        {
            name: "Requested On",
            selector: (row) => new Date(row.createdAt).toLocaleString(),
            sortable: true,
        },
        {
            name: "Subject",
            selector: () => "To become a laborer",
            sortable: true,
        },
        {
            name: "Status",
            selector: (row) => row.status,
            sortable: true,
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

    const TableDataDisplayProps = {
        heading: "Requests",
        itemsPerPage: itemsPerPage,
        onItemsPerPageChange: (value) => setItemsPerPage(value),
        dataTableColumns: columns,
        dataTableData: requests,
        pageCount: pageCount,
        onPageChange: ({ selected }) => setCurrentPage(selected),
    };

    return (
        <TableDataDisplay {...TableDataDisplayProps} />
    );
};

export default Requests;
