import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { closestCenter, DndContext } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SweetAlert from "../../../components/Common/SweetAlert";
import ItemsPerPageCount from "../../../components/Admin/ItemsPerPageCount";
import Pagination from "../../../components/Admin/Pagination";
import SortableBanner from "../../../components/Admin/SortableBanner";
import { getBanners, bannerAction, updateBannerOrder } from "../../../api/admin/banner";

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
    const { active } = event;
    const buttonText = event.activatorEvent.srcElement.innerText;
    if (buttonText && buttonText === "EDIT") {
      navigate(`/admin/banners/edit-banner/${active.id}`);
    } else if (buttonText && buttonText.includes("LIST")) {
      confirmListUnlist(active.id, false);
    } else if (buttonText && buttonText.includes("UNLIST")) {
      confirmListUnlist(active.id, true);
    } else {
      const { over } = event;
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
        if (!reOrderBannersResponse || reOrderBannersResponse.status !== 200) {
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
    }
  };

  return (
    <div className="mt-3 col-10 mx-auto text-center">
      <div className="col-12 d-flex flex-column flex-md-row justify-content-between mt-3 mt-md-0">
        <h5 className="mt-4 mb-3 mb-md-0">Banners</h5>
        <div className="col-md-4 d-flex justify-content-between align-items-center">
          <div className="mt-3">
            <ItemsPerPageCount
              value={itemsPerPage}
              onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            />
          </div>
          <Link to={"/admin/banners/add-banner"} className="btn btn-sm btn-outline-primary">
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
                {banners.length ? (
                  banners?.map((banner) => (
                    <SortableBanner key={banner._id} banner={banner} />
                  ))
                ) : (
                  <tr>
                    <td colSpan={5}>
                      There are no records to display
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </SortableContext>
      </DndContext>
      {(banners.length > 0 && itemsPerPage > banners.length) && (
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
