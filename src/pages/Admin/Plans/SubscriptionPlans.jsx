import { useState } from "react";
import TableDataDisplay from "../../../components/Admin/TableDataDisplay";

const columns = [
  {
    name: "User",
    selector: "user",
    sortable: true,
  },
  {
    name: "Username",
    selector: "username",
    sortable: true,
  },
  {
    name: "Email",
    selector: "email",
  },
  {
    name: "Phone",
    selector: "phone",
  },
  {
    name: "Verified",
    selector: "verified",
    sortable: true,
  },
  {
    name: "Is Job Seeker",
    selector: "isJobSeeker",
    sortable: true,
  },
  {
    name: "Actions",
    selector: "actions",
  },
];

const data = [
  {
    id: 1,
    user: "Niko",
    username: "niko123",
    email: "niko@example.com",
    phone: "123-456-7890",
    verified: "Yes",
    isJobSeeker: "Yes",
    actions: "View/Edit/Delete",
  },
  {
    id: 2,
    user: "Roman",
    username: "roman456",
    email: "roman@example.com",
    phone: "987-654-3210",
    verified: "No",
    isJobSeeker: "No",
    actions: "View/Edit/Delete",
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

const SubscriptionPlans = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(2);

  return (
    <TableDataDisplay
      heading={"Subscription Plans"}
      itemsPerPage={itemsPerPage}
      onItemsPerPageChange={(value) => setItemsPerPage(value)}
      addLink={"/admin/subscription-plans/add-plan"}
      dataTableColumns={columns}
      dataTableData={data}
      pageCount={pageCount}
      onPageChange={({ selected }) => setCurrentPage(selected)}
    />
  );
};

export default SubscriptionPlans;