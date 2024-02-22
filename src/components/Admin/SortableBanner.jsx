import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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
                    src={banner?.image}
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
                            console.log("edit button");
                            navigate(`/admin/banners/edit-banner/${banner._id}`);
                        }}
                    >
                        Edit
                    </button>
                    <button className={`btn ${banner.isActive ? "btn-danger" : "btn-warning"}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            confirmListUnlist(banner._id, banner.isActive);
                        }}>
                        {banner.isActive ? "Unlist" : "List"}
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default SortableBanner;
