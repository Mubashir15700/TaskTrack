import logo from "../../assets/images/logo.png";

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5">
      <div className="d-flex flex-column align-items-center flex-md-row m-3">
        <div className="w-md-25 p-3">
          <div className="">
            <img src={logo} alt="logo" className="" style={{ height: "40px" }} />
          </div>
          <div className="mt-3 mt-md-0 mx-3">
            <i className="bi bi-facebook me-2"></i>
            <i className="bi bi-messenger me-2"></i>
            <i className="bi bi-whatsapp me-2"></i>
            <i className="bi bi-skype me-2"></i>
          </div>
        </div>
        <div className="d-flex flex-column flex-md-row justify-content-between w-100 w-md-75 my-4">
          <div className="d-flex flex-column w-100 w-md-25 mb-3 mb-md-0">
            <span className="fw-bold mb-2">Quality</span>
            <span className="fw-bold mb-2">Help</span>
            <span className="fw-bold mb-2">Share</span>
            <span className="fw-bold mb-2">Testimonials</span>
            <span className="fw-bold mb-2">Work</span>
          </div>
          <div className="d-flex flex-column w-100 w-md-25 mb-3 mb-md-0">
            <span className="mb-2">244-5333-7783</span>
            <span className="mb-2 text-truncate">hello@tasktrack.com</span>
            <span className="mb-2 text-truncate">press@tasktrack.com</span>
            <span className="mb-2 text-truncate">contact@tasktrack.com</span>
          </div>
          <div className="d-flex flex-column w-100 w-md-25">
            <span className="fw-bold mb-2">Terms & Conditions</span>
            <span className="fw-bold mb-2">Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
