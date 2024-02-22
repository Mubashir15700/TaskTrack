import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import ItemsPerPageCount from "../Admin/ItemsPerPageCount";
import Pagination from "./Pagination";

const TableDataDisplay = ({
    heading,
    itemsPerPage,
    onItemsPerPageChange,
    addLink,
    dataTableColumns,
    dataTableData,
    pageCount,
    onPageChange
}) => {
    return (
        <div className="mt-3 col-10 mx-auto text-center">
            <div className="d-md-flex justify-content-between align-items-center">
                <div>
                    <h5 className="mb-3 mb-md-0">{heading}</h5>
                </div>
                <div
                    className={
                        `col-12 col-md-4 ${addLink && "col-12 col-md-4 d-flex justify-content-between mt-3 mt-md-0"}`
                    }
                >
                    <div className="mt-3 col-10">
                        <ItemsPerPageCount
                            value={itemsPerPage}
                            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
                        />
                    </div>
                    {addLink && (
                        <Link to={addLink} className="btn btn-sm btn-outline-primary align-self-center">
                            +
                        </Link>
                    )}
                </div>
            </div>
            <DataTable
                columns={dataTableColumns}
                data={dataTableData}
                responsive={true}
                className="mb-2"
            />
            {(dataTableData.length > 0 && itemsPerPage > dataTableData.length) && (
                <p>No more data found</p>
            )}
            <Pagination
                pageCount={pageCount}
                onPageChange={onPageChange}
            />
        </div>
    );
};

export default TableDataDisplay;
