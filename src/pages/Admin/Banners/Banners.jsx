import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../redux/slices/adminSlice";
import toast from "react-hot-toast";
import SweetAlert from "../../../components/Common/SweetAlert";
import TableDataDisplay from "../../../components/Admin/TableDataDisplay";
import { getBanners, bannerAction } from "../../../api/adminApi";

const Banners = () => {

  const dispatch = useDispatch();

  const [banners, setBanners] = useState([]);
  const [error, setError] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(2);

  const searchResults = useSelector(state => state.admin.searchResults);

  useEffect(() => {
    const getAllBanners = async () => {
      try {
        // dispatch(setLoading(true));
        const response = await getBanners(itemsPerPage, currentPage);
        if (response && response.data.status === "success" && response.data.banners) {
          setBanners(response.data.banners);
          setPageCount(response.data.totalPages);
        } else {
          setError("Failed to fetch banners data.");
        }
      } catch (error) {
        setError("An error occurred while fetching banners data.");
        console.error("Error fetching banners data:", error);
      } finally {
        // dispatch(setLoading(false));
      }
    };

    if (searchResults.searchOn === "banners") {
      setBanners(searchResults.results);
    } else {
      getAllBanners();
    }
  }, [currentPage, searchResults, itemsPerPage]);

  const confirmListUnlist = async (bannerId, isActive) => {
    const result = await SweetAlert.confirmAction(
      `${isActive ? "Unlist" : "List"} banner`,
      `Are you sure you want to ${isActive ? "Unlist" : "List"} this banner?`,
      isActive ? "Unlist" : "List",
      "#d9534f"
    );

    if (result.isConfirmed) {
      handleListUnlist(bannerId);
    }
  };

  const handleListUnlist = async (bannerId) => {
    try {
      const response = await bannerAction(bannerId);
      if (response) {
        if (response.data.status === "success") {
          const updatedBannersResponse = await getBanners(itemsPerPage, currentPage);
          if (
            updatedBannersResponse &&
            updatedBannersResponse.data.status === "success" &&
            updatedBannersResponse.data.banners
          ) {
            setBanners(updatedBannersResponse.data.banners);
          } else {
            setError("Failed to fetch updated banners data.");
          }
        } else {
          setError("Something went wrong");
        }
      }
    } catch (error) {
      setError("Failed to update banner");
      console.error("user action error: ", error);
    }
  };

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
      name: "Banner",
      width: "200px",
      selector: (row) => row.image,
      cell: row => (
        <img
          src={`http://localhost:3000/uploads/banner/${row?.image}`}
          alt="Banner"
          style={{ maxWidth: "150px", height: "auto", margin: "5px" }}
        />
      ),
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
          <Link to={`/admin/banners/edit-banner/${row._id}`} className="btn btn-primary">
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
      heading={"Banners"}
      itemsPerPage={itemsPerPage}
      onItemsPerPageChange={(value) => setItemsPerPage(value)}
      addLink={"/admin/banners/add-banner"}
      dataTableColumns={columns}
      dataTableData={banners}
      pageCount={pageCount}
      onPageChange={({ selected }) => setCurrentPage(selected)}
    />
  );
};

export default Banners;
