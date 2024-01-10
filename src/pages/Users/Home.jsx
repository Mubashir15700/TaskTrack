import React, { useEffect, useState } from "react";
import { getActiveBanners } from "../../services/api";
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
    <>
      <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner position-relative">
          {banners.length ? (
            banners.map((banner, index) => (
              <div className={index === 0 ? "carousel-item active" : "carousel-item"} key={banner._id}>
                <img
                  src={`http://localhost:3000/uploads/banner/${banner.image}`}
                  className="d-block w-100 h-100"
                  alt="Banner"
                />
                <div className="overlay position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>
                <div className="carousel-caption position-absolute top-50 start-50 translate-middle text-light">
                  <h1>{banner.title}</h1>
                  <p>{banner.description}</p>
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
                <h1>Sample Banner</h1>
                <p>This is a sample banner</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
