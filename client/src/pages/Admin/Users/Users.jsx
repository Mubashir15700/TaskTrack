import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import SweetAlert from "../../../components/SweetAlert";
import TableDataDisplay from "../../../components/Admin/TableDataDisplay";
import { getUsers, userAction } from "../../../api/admin/user";
import IMAGE_URLS from "../../../configs/imageUrls";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(2);

  const searchResults = useSelector(state => state.admin.searchResults);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await getUsers(itemsPerPage, currentPage);
        if (response && response.status === 200 && response.users) {
          setUsers(response.users);
          setPageCount(response.totalPages);
        } else {
          setError("Failed to fetch users data.");
        }
      } catch (error) {
        setError("An error occurred while fetching users data.");
        console.error("Error fetching users data:", error);
      }
    };

    if (
      (searchResults.searchOn === "users")) {
      setUsers(searchResults.results);
    } else {
      getAllUsers();
    }
  }, [currentPage, searchResults, itemsPerPage]);

  const confirmBlockUnblock = async (userId, isBlocked) => {
    const result = await SweetAlert.confirmAction(
      `${isBlocked ? "Unblock" : "Block"}`,
      `Are you sure you want to ${isBlocked ? "Unblock" : "Block"} this user?`,
      `${isBlocked ? "Unblock" : "Block"}`,
      "#d9534f",
      `${!isBlocked ? "text" : ""}`
    );

    if (result.isConfirmed) {
      handleBlockUnblock(userId, result.value);
    }
  };

  const handleBlockUnblock = async (userId, reason) => {
    try {
      const response = await userAction({ userId, reason });
      if (response) {
        if (response.status === 200) {
          const updatedUsersResponse = await getUsers(itemsPerPage, currentPage);
          if (
            updatedUsersResponse &&
            updatedUsersResponse.status === 200 &&
            updatedUsersResponse.users
          ) {
            setUsers(updatedUsersResponse.users);
          } else {
            setError("Failed to fetch updated users data.");
          }
        } else {
          setError(response.message);
        }
      }
    } catch (error) {
      setError("Failed to update user");
      console.error("user action error: ", error);
    }
  };

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const columns = [
    {
      name: "User",
      selector: (row) => row.profile,
      cell: row => (
        <img
          src={row.profile ?
            `${import.meta.env.VITE_AXIOS_BASE_URL}/uploads/profile/${row.profile}` :
            IMAGE_URLS.avatar
          }
          alt="Profile"
          style={{ width: "40px" }}
          className="rounded-circle mb-2 mx-auto img-fluid"
        />
      ),
    },
    {
      name: "Username",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
    },
    {
      name: "Verified",
      selector: (row) => row.isVerified,
      sortable: true,
      cell: row => row.isVerified ? "Yes" : "No",
    },
    {
      name: "Is Job Seeker",
      selector: (row) => row.isJobSeeker,
      sortable: true,
      cell: row => row.isJobSeeker ? "Yes" : "No",
    },
    {
      name: "Actions",
      width: "220px",
      cell: row => (
        <div className="d-flex gap-2">
          <Link to={`/admin/users/${row._id}`} className="btn btn-primary">
            View
          </Link>
          <button className={`btn ${row.isBlocked ? "btn-warning" : "btn-danger"}`}
            onClick={() => confirmBlockUnblock(row._id, row.isBlocked)}>
            {row.isBlocked ? "Unblock" : "Block"}
          </button>
        </div>
      ),
    },
  ];

  const TableDataDisplayProps = {
    heading: "Users",
    itemsPerPage: itemsPerPage,
    onItemsPerPageChange: (value) => setItemsPerPage(value),
    dataTableColumns: columns,
    dataTableData: users,
    pageCount: pageCount,
    onPageChange: ({ selected }) => setCurrentPage(selected),
  };

  return (
    <TableDataDisplay {...TableDataDisplayProps} />
  );
};

export default Users;
