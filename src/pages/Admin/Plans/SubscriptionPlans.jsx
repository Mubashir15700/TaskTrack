import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../redux/slices/adminSlice";
import toast from "react-hot-toast";
import SweetAlert from "../../../components/Common/SweetAlert";
import TableDataDisplay from "../../../components/Admin/TableDataDisplay";
import { getPlans, planAction } from "../../../services/adminApi";

const SubscriptionPlans = () => {

  const dispatch = useDispatch();

  const [plans, setPlans] = useState([]);
  const [error, setError] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(2);

  const searchResults = useSelector(state => state.admin.searchResults);

  useEffect(() => {
    const getAllPlans = async () => {
      try {
        // dispatch(setLoading(true));
        const response = await getPlans(itemsPerPage, currentPage);
        if (response && response.data.status === "success" && response.data.plans) {
          setPlans(response.data.plans);
          setPageCount(response.data.totalPages);
        } else {
          setError("Failed to fetch plans data.");
        }
      } catch (error) {
        setError("An error occurred while fetching plans data.");
        console.error("Error fetching plans data:", error);
      } finally {
        // dispatch(setLoading(false));
      }
    };

    if (searchResults.searchOn === "plans") {
      setPlans(searchResults.results);
    } else {
      getAllPlans();
    }
  }, [currentPage, searchResults, itemsPerPage]);

  const confirmListUnlist = async (planId, isActive) => {
    const result = await SweetAlert.confirmAction(
      `${isActive ? "Unlist" : "List"} plan`,
      `Are you sure you want to ${isActive ? "Unlist" : "List"} this plan?`,
      isActive ? "Unlist" : "List",
      "#d9534f"
    );

    if (result.isConfirmed) {
      handleListUnlist(planId);
    }
  };

  const handleListUnlist = async (planId) => {
    try {
      const response = await planAction(planId);
      if (response) {
        if (response.data.status === "success") {
          const updatedPlansResponse = await getPlans(itemsPerPage, currentPage);
          if (
            updatedPlansResponse &&
            updatedPlansResponse.data.status === "success" &&
            updatedPlansResponse.data.plans
          ) {
            setPlans(updatedPlansResponse.data.plans);
          } else {
            setError("Failed to fetch updated plans data.");
          }
        } else {
          setError("Something went wrong");
        }
      }
    } catch (error) {
      setError("Failed to update plan");
      console.error("user action error: ", error);
    }
  };

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: "Number",
      selector: (row) => row.number,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
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
          <Link to={`/admin/subscription-plans/edit-plan/${row._id}`} className="btn btn-primary">
            Edit
          </Link>
          <button className={`btn ${row.isActive ? "btn-danger" : "btn-warning"}`}
            onClick={() => confirmListUnlist(row._id, row.isActive)}>
            {row.isActive ? "Unlist" : "List"}
          </button>
        </div>
      ),
    },
  ];

  return (
    <TableDataDisplay
      heading={"Plans"}
      itemsPerPage={itemsPerPage}
      onItemsPerPageChange={(value) => setItemsPerPage(value)}
      addLink={"/admin/subscription-plans/add-plan"}
      dataTableColumns={columns}
      dataTableData={plans}
      pageCount={pageCount}
      onPageChange={({ selected }) => setCurrentPage(selected)}
    />
  );
};

export default SubscriptionPlans;
