import { useEffect, useState } from "react";
import { getActiveBanners } from "../../api/userApi";
import defBanner from "../../assets/images/bnr-def.jfif";

const Home = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const getBanner = async () => {
      try {
        const response = await getActiveBanners();
        if (response && response.data.status === "success") {
          setBanners(response.data.banners);
        }
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };

    getBanner();
  }, []);

  return (
    <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner position-relative">
        {banners.length ? (
          banners.map((banner, index) => (
            <div className={index === 0 ? "carousel-item active" : "carousel-item"} key={banner._id}>
              <img
                src={`http://localhost:3000/uploads/banner/${banner.image}`}
                className="img-fluid mx-auto d-block w-100"
                style={{ maxHeight: "500px", objectFit: "cover" }}
                alt="Banner"
              />
              <div className="overlay position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>
              <div className="carousel-caption position-absolute top-50 start-50 translate-middle text-light">
                <h1 className="h1">{banner.title}</h1>
                <p className="p d-none d-sm-block">{banner.description}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="carousel-item active">
            <img
              src={defBanner}
              className="d-block w-100 h-100"
              alt="Banner"
            />
            <div className="overlay position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>
            <div className="carousel-caption position-absolute top-50 start-50 translate-middle text-light">
              <h1 className="display-4">Sample Banner</h1>
              <p className="lead">This is a sample banner</p>
            </div>
          </div>
        )}
      </div>
      {banners.length > 1 && (
        <>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </>
      )}
    </div>
  );
};

export default Home;
