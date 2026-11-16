import Work from "../components/Work";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

function Works(){
    return(
      <div class="featured-works">
        <div class="container">
          <h1>Work</h1>

            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              onSlideChange={() => console.log('slide change')}
              onSwiper={(swiper) => console.log(swiper)}
            >
              <SwiperSlide>
                <Work title="Project 1" />
              </SwiperSlide>
              <SwiperSlide>
                <Work title="Project 2" />
              </SwiperSlide>
              <SwiperSlide>
                <Work title="Project 3" />
              </SwiperSlide>
              <SwiperSlide>
                <Work title="Project 4" />
              </SwiperSlide>
              <SwiperSlide>
                <Work title="Project 5" />
              </SwiperSlide>

              
            </Swiper>
        

        </div>
      </div>
    )

}

export default Works;