import { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import { getActiveBanners } from "../../api/userApi";
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
        if (response && response.data.status === "success") {
          setBanners(response.data.banners);
        }
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
      >
        {banners.length ? (
          banners.map((banner, index) => (
            <Carousel.Item key={index}>
              <CarousalImage src={`http://localhost:3000/uploads/banner/${banner?.image}`} />
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
    </div>
  );
};

export default Home;
