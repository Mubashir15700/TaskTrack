import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';

const columns = [
  {
    name: 'Title',
    selector: 'user',
    sortable: true,
  },
  {
    name: 'Description',
    selector: 'username',
    sortable: true,
  },
  {
    name: 'Status',
    selector: 'email',
  },
  {
    name: 'Actions',
    selector: 'phone',
  },
];

const data = [
  {
    id: 1,
    user: 'Niko',
    username: 'niko123',
    email: 'niko@example.com',
    phone: '123-456-7890',
  },
  {
    id: 2,
    user: 'Roman',
    username: 'roman456',
    email: 'roman@example.com',
    phone: '987-654-3210',
  },
];

const customStyles = {
  head: {
    style: {

    },
  },
  headCells: {
    style: {

    },
  },
  rows: {
    style: {

    },
  },
  cells: {
    style: {

    },
  },
};

const Banners = () => {
  return (
    <>
      <div className='mt-3 w-75 mx-auto'>
        <div className='d-flex justify-content-between'>
          <h5>Banners</h5>
          <Link to={`/admin/banners/add-banner`} className='btn btn-sm btn-outline-primary'>
            +
          </Link>
        </div>
        <DataTable
          columns={columns}
          data={data}
          customStyles={customStyles}
        />
      </div>
    </>
  );
};

export default Banners;