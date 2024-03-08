import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import TableDataDisplay from "../../../components/Admin/TableDataDisplay";
import { getSubscriptions } from "../../../api/admin/plan";

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [error, setError] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(2);

  const searchResults = useSelector(state => state.admin.searchResults);

  useEffect(() => {
    const getAllSubscriptions = async () => {
      try {
        const response = await getSubscriptions(itemsPerPage, currentPage);
        if (response && response.status === 200 && response.subscriptions) {
          setSubscriptions(response.subscriptions);
          setPageCount(response.totalPages);
        } else {
          setError("Failed to fetch subscriptions data.");
        }
      } catch (error) {
        setError("An error occurred while fetching subscriptions data.");
        console.error("Error fetching subscriptions data:", error);
      }
    };

    if (searchResults.searchOn === "subscriptions") {
      setSubscriptions(searchResults.results);
    } else {
      getAllSubscriptions();
    }
  }, [currentPage, searchResults, itemsPerPage]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const columns = [
    {
      name: "Created At",
      selector: (row) => {
        const date = new Date(row.createdAt);
        return date.toLocaleString(); // Adjust the format as needed
      },
      sortable: true,
    },
    {
      name: "User",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "Plan",
      selector: (row) => row.planName,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: "Is Active",
      selector: (row) => row.isActive,
      sortable: true,
      cell: row => row.isActive ? "Yes" : "No",
    },
  ];

  const TableDataDisplayProps = {
    heading: "Subscriptions",
    itemsPerPage: itemsPerPage,
    onItemsPerPageChange: (value) => setItemsPerPage(value),
    dataTableColumns: columns,
    dataTableData: subscriptions,
    pageCount: pageCount,
    onPageChange: ({ selected }) => setCurrentPage(selected),
  };

  return (
    <TableDataDisplay {...TableDataDisplayProps} />
  );
};

export default Subscriptions;
