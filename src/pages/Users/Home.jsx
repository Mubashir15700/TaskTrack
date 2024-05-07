import { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import { getActiveBanners } from "../../api/user/utils";
import CarousalImage from "../../components/Users/CarousalImage";
import CarousalContent from "../../components/Users/CarousalContent";
import CarouselButton from "../../components/Users/CarouselButton";
import defBanner from "../../assets/images/bnr-def.jfif";

const Home = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const getBanner = async () => {
      try {
        const response = await getActiveBanners();
        setBanners(response.banners);
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };

    getBanner();
  }, []);

  const showNextPrevButtons = banners.length > 1;

  return (
    <div>
      <Carousel
        nextIcon={showNextPrevButtons ? <CarouselButton type="next" /> : null}
        prevIcon={showNextPrevButtons ? <CarouselButton type="prev" /> : null}
        fade
      >
        {banners.length ? (
          banners.map((banner, index) => (
            <Carousel.Item key={index}>
              <CarousalImage src={banner.image} />
              <Carousel.Caption>
                <CarousalContent title={banner.title} description={banner.description} />
              </Carousel.Caption>
            </Carousel.Item>
          ))) : (
          <Carousel.Item>
            <CarousalImage src={defBanner} />
            <Carousel.Caption>
              <CarousalContent
                title={"First slide label"}
                description={"Nulla vitae elit libero, a pharetra augue mollis interdum."} />
            </Carousel.Caption>
          </Carousel.Item>
        )}
      </Carousel>

      <section className="py-5 py-xl-8">
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6">
              <h2 className="mb-4 display-5 text-center">Services</h2>
              <p className="text-secondary mb-5 text-center">
                Explore a world of skilled tradespeople ready to tackle any task.
                From HVAC technicians to locksmiths, find the perfect professional for your project.
              </p>
              <hr className="w-50 mx-auto mb-5 mb-xl-9 border-dark-subtle" />
            </div>
          </div>
        </div>

        <div className="container overflow-hidden">
          <div className="row gy-5">
            <div className="col-12 col-sm-6 col-lg-4">
              <div className="text-center px-xl-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-hammer text-primary mb-4" viewBox="0 0 16 16">
                  <path d="M10.734 1.871l2.143 2.143a1.5 1.5 0 0 1 1.832 1.831l-2.143 2.143a.5.5 0 0 1-.117.061L10.5 10.07V9.04L4.826 3.366.293 7.9a1 1 0 1 0 1.414 1.414l4.54-4.54 1.028 1.028h1.03L11.795.976a.5.5 0 0 1 .061-.117zM14.41 5.995a.5.5 0 0 0-.71 0l-10 10a.5.5 0 1 0 .707.708l10-10a.5.5 0 0 0 0-.708z" />
                </svg>
                <h5 className="m-2">Real-time Notifications</h5>
                <p className="m-0 text-secondary">
                  Stay informed with our real-time notifications, ensuring you never miss an important update.
                </p>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-4">
              <div className="text-center px-xl-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-lightning text-primary mb-4" viewBox="0 0 16 16">
                  <path d="M5.793 14.5a.5.5 0 0 1-.479-.647l1.42-4.552a.5.5 0 0 0-.318-.642l-5.553-1.864a.5.5 0 0 1-.267-.85l4.854-4.39a.5.5 0 0 1 .742.638L1.884 7.05a.5.5 0 0 0 .267.85l5.552 1.863a.5.5 0 0 1 .317.642l-1.42 4.552a.5.5 0 0 1-.478.348z" />
                  <path d="M10.207 1.5a.5.5 0 0 1 .479.647l-1.42 4.552a.5.5 0 0 0 .318.642l5.553 1.864a.5.5 0 0 1 .267.85l-4.854 4.39a.5.5 0 0 1-.742-.638l4.854-4.39a.5.5 0 0 0-.267-.85l-5.552-1.863a.5.5 0 0 1-.317-.642l1.42-4.552a.5.5 0 0 1 .478-.348z" />
                </svg>
                <h5 className="m-2">Stripe Payment Integration</h5>
                <p className="m-0 text-secondary">
                  Enjoy secure and hassle-free transactions with our Stripe payment integration.
                </p>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-4">
              <div className="text-center px-xl-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-chat-dots text-primary mb-4" viewBox="0 0 16 16">
                  <path d="M1 8a7 7 0 1 1 14 0 7 7 0 0 1-14 0Zm4.5-1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-4Zm6-2a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm-6 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-4Z" />
                </svg>
                <h5 className="m-2">Chatting</h5>
                <p className="m-0 text-secondary">
                  Stay connected and communicate effortlessly with our integrated chatting feature.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
