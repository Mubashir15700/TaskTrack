import ReactPaginate from "react-paginate";

const Pagination = ({ pageCount, onPageChange }) => {

    const ReactPaginateProps = {
        pageCount: pageCount,
        onPageChange: onPageChange,
        containerClassName: "pagination",
        activeClassName: "active",
        previousLabel: "Previous",
        nextLabel: "Next",
        breakLabel: "...",
        breakClassName: "break-me",
        marginPagesDisplayed: 2,
        pageRangeDisplayed: 5,
        pageClassName: "page-item",
        pageLinkClassName: "page-link",
        previousClassName: "page-item",
        nextClassName: "page-item",
        previousLinkClassName: "page-link",
        nextLinkClassName: "page-link",
    };

    return (
        <ReactPaginate {...ReactPaginateProps} />
    );
};

export default Pagination;
