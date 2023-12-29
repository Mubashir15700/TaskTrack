import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import DataTable from 'react-data-table-component';
import Pagination from '../../components/Partials/Pagination';
import { getUsers } from '../../services/api';

const columns = [
  {
    name: 'User',
    selector: 'profile',
    cell: row => (
      row.profile ? (
        <img src={row.profile} alt="Profile" style={{ width: '50px', height: '50px' }} />
      ) : (
        <i className="bi bi-person-circle fs-1 mb-1"></i>
      )
    ),
  },
  {
    name: 'Username',
    selector: 'username',
    sortable: true,
  },
  {
    name: 'Email',
    selector: 'email',
    sortable: true,
  },
  {
    name: 'Phone',
    selector: 'phone',
  },
  {
    name: 'Verified',
    selector: 'isVerified',
    sortable: true,
    cell: row => row.isVerified ? 'Yes' : 'No',
  },
  {
    name: 'Is Job Seeker',
    selector: 'isJobSeeker',
    sortable: true,
    cell: row => row.isJobSeeker ? 'Yes' : 'No',
  },
  {
    name: 'Actions',
    width: '170px',
    cell: row => (
      <div className='d-flex gap-2'>
        <Link to={`/admin/user/${row._id}`} className='btn btn-primary'>
          View
        </Link>
        <button className={`btn ${row.isBlocked} ? btn-primary : btn-danger`}
          onClick={() => handleBlockUnblock(row.isBlocked)}>
          {row.isBlocked ? 'Unblock' : 'Block'}
        </button>
      </div>
    ),
  },
];

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  const itemsPerPage = 1;

  useEffect(() => {
    const getAllUsers = async () => {
      try {
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
      }
    };

    getAllUsers();
  }, [currentPage]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

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