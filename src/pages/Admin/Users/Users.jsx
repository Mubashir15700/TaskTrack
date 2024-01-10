import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../../redux/slices/adminSlice';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import DataTable from 'react-data-table-component';
import Pagination from '../../../components/Partials/Pagination';
import { getUsers, userAction } from '../../../services/api';

const Users = () => {
  const dispatch = useDispatch();

  const [users, setUsers] = useState([]);
  const [error, setError] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  const searchResults = useSelector(state => state.admin.searchResults);

  const itemsPerPage = 3;

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        // dispatch(setLoading(true));
        const response = await getUsers(itemsPerPage, currentPage);
        if (response && response.data.status === "success" && response.data.users) {
          setUsers(response.data.users);
          setPageCount(response.data.totalPages);
        } else {
          setError("Failed to fetch users data.");
        }
      } catch (error) {
        setError("An error occurred while fetching users data.");
        console.error('Error fetching users data:', error);
      } finally {
        // dispatch(setLoading(false));
      }
    };

    if (
      (searchResults.searchOn === "employers" || searchResults.searchOn === "laborers")) {
      setUsers(searchResults.results);
    } else {
      getAllUsers();
    }
  }, [currentPage, searchResults]);

  const confirmBlockUnblock = (userId, isBlocked) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Are you sure you want to ${isBlocked ? 'Unblock' : 'Block'} this user?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancel',
      confirmButtonText: isBlocked ? 'Unblock' : 'Block',
    }).then((result) => {
      if (result.isConfirmed) {
        handleBlockUnblock(userId);
      }
    });
  };

  const handleBlockUnblock = async (userId) => {
    try {
      const response = await userAction(userId);
      if (response) {
        if (response.data.status === "success") {
          const updatedUsersResponse = await getUsers(itemsPerPage, currentPage);
          if (
            updatedUsersResponse &&
            updatedUsersResponse.data.status === "success" &&
            updatedUsersResponse.data.users
          ) {
            setUsers(updatedUsersResponse.data.users);
          } else {
            setError("Failed to fetch updated users data.");
          }
        } else {
          setError('Something went wrong');
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
      name: 'User',
      selector: (row) => row.profile,
      cell: row => (
        row.profile ? (
          <img
            src={`http://localhost:3000/uploads/profile/${row?.profile}`}
            alt="Profile"
            style={{ width: '50px', height: '50px' }}
            className="rounded-5"
          />
        ) : (
          <i className="bi bi-person-circle fs-1 mb-1"></i>
        )
      ),
    },
    {
      name: 'Username',
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: 'Phone',
      selector: (row) => row.phone,
    },
    {
      name: 'Verified',
      selector: (row) => row.isVerified,
      sortable: true,
      cell: row => row.isVerified ? 'Yes' : 'No',
    },
    {
      name: 'Is Job Seeker',
      selector: (row) => row.isJobSeeker,
      sortable: true,
      cell: row => row.isJobSeeker ? 'Yes' : 'No',
    },
    {
      name: 'Actions',
      width: '190px',
      cell: row => (
        <div className='d-flex gap-2'>
          <Link to={`/admin/users/${row._id}`} className='btn btn-primary'>
            View
          </Link>
          <button className={`btn ${row.isBlocked ? 'btn-warning' : 'btn-danger'}`}
            onClick={() => confirmBlockUnblock(row._id, row.isBlocked)}>
            {row.isBlocked ? 'Unblock' : 'Block'}
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className='mt-3 w-75 mx-auto'>
        <h5>Users</h5>
        <DataTable
          columns={columns}
          data={users}
          className='mb-2'
        />
        <Pagination
          pageCount={pageCount}
          onPageChange={
            ({ selected }) => setCurrentPage(selected)
          }
        />
      </div>
    </>
  );
};

export default Users;