import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import SweetAlert from "../../../components/Common/SweetAlert";
import ItemsPerPageCount from "../../../components/Admin/ItemsPerPageCount";
import Pagination from "../../../components/Admin/Pagination";
import { getBanners, bannerAction, updateBannerOrder } from "../../../api/admin/banner";
import { closestCenter, DndContext } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Banner = () => {
  const navigate = useNavigate();

  const [banners, setBanners] = useState([]);
  const [error, setError] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(2);

  const searchResults = useSelector(state => state.admin.searchResults);

  useEffect(() => {
    const getAllBanners = async () => {
      try {
        const response = await getBanners(itemsPerPage, currentPage);
        if (response && response.status === 200 && response.banners) {
          setBanners(response.banners);
          setPageCount(response.totalPages);
        } else {
          setError("Failed to fetch banners data.");
        }
      } catch (error) {
        setError("An error occurred while fetching banners data.");
        console.error("Error fetching banners data:", error);
      }
    };

    if (searchResults.searchOn === "banners") {
      setBanners(searchResults.results);
    } else {
      getAllBanners();
    }
  }, [currentPage, searchResults, itemsPerPage]);

  const confirmListUnlist = async (bannerId, isActive) => {
    console.log("confirmListUnlist");
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
      console.log("handleListUnlist");
      const response = await bannerAction(bannerId);
      if (response) {
        if (response.status === 200) {
          const updatedBannersResponse = await getBanners(itemsPerPage, currentPage);
          if (
            updatedBannersResponse &&
            updatedBannersResponse.status === 200 &&
            updatedBannersResponse.banners
          ) {
            setBanners(updatedBannersResponse.banners);
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

  const onPageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const onItemsPerPageChange = (value) => {
    setItemsPerPage(value);
  };

  const onDragEnd = async (event) => {
    console.log("onDragEnd");

    const { active, over } = event;
    if (active.id === over.id) {
      return;
    }

    try {
      const oldIndex = banners.findIndex((banner) => banner._id === active.id);
      const newIndex = banners.findIndex((banner) => banner._id === over.id);

      // Extract information about the dragged banner
      const data = {
        draggedBannerId: banners[oldIndex]._id,
        prevOrder: oldIndex,
        newOrder: newIndex,
      };

      const reOrderBannersResponse = await updateBannerOrder(data);

      if (!reOrderBannersResponse || reOrderBannersResponse.status !== "success") {
        toast.error("Error while updating banner's order");
        return;
      }

      setBanners((prevBanners) => {
        // Ensure that prevBanners is an array before using map
        const updatedBanners = Array.isArray(prevBanners) ? arrayMove(prevBanners, oldIndex, newIndex) : prevBanners;
        return updatedBanners;
      });
    } catch (error) {
      console.error("Error updating banner order:", error);
      toast.error("Error while updating banner's order");
    }
  };

  const SortableBanner = ({ banner }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
    } = useSortable({ id: banner._id });
    const style = {
      transition,
      transform: CSS.Transform.toString(transform),
    };

    return (
      <tr
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="banner"
      >
        <td>{banner.title}</td>
        <td>{banner.description.substring(0, 30)}...</td>
        <td>
          <img
            src={`http://localhost:3000/uploads/banner/${banner?.image}`}
            alt="Banner"
            style={{ maxWidth: "150px", height: "auto", margin: "5px" }}
          />
        </td>
        <td>{banner.isActive ? "Yes" : "No"}</td>
        <td>
          <div className="d-flex gap-2 justify-content-center">
            <button
              className="btn btn-primary"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                console.log("edit button");
                navigate(`/admin/banners/edit-banner/${banner._id}`);
              }}
            >
              Edit
            </button>
            <button className={`btn ${banner.isActive ? "btn-danger" : "btn-warning"}`}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                confirmListUnlist(banner._id, banner.isActive);
              }}>
              {banner.isActive ? "Unlist" : "List"}
            </button>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div className="mt-3 col-10 mx-auto text-center">
      <div className="col-12 d-flex flex-column flex-md-row justify-content-between mt-3 mt-md-0">
        <h5 className="mt-4 mb-3 mb-md-0">Banners</h5>
        <div className="col-md-3 d-flex justify-content-between">
          <div className="mt-4">
            <ItemsPerPageCount
              value={itemsPerPage}
              onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            />
          </div>
          <Link to={"/admin/banners/add-banner"} className="btn btn-sm btn-outline-primary align-self-center">
            +
          </Link>
        </div>
      </div>
      <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={banners} strategy={verticalListSortingStrategy}>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Description</th>
                  <th scope="col">Banner</th>
                  <th scope="col">Is Active</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {banners?.map((banner) => (
                  <SortableBanner key={banner._id} banner={banner} />
                ))}
              </tbody>
            </table>
          </div>
        </SortableContext>
      </DndContext>
      {itemsPerPage > banners.length && (
        <p>No more data found</p>
      )}
      <Pagination
        pageCount={pageCount}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default Banner;
