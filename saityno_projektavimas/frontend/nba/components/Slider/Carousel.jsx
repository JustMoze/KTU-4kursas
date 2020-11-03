import React, { FC } from "react";
import Swiper from "react-id-swiper";
import { generateSlides } from "./utils";
import { Flex } from "@react-yuki/ui";
import SlideItem from "./SlideItem";


const SliderContainer = props => {
    return (<Flex
      {...props}
      __css={{
        position: "relative",
        ".swiper-container": {
          width: "100%",
          height: "20rem"
        },
        ".swiper-pagination": {
          "&.swiper-pagination-fraction": {
            color: "white",
            fontWeight: 5
          }
        },
        ".swiper-pagination-bullet-active.swiper-pagination-bullet": {
          bg: "gray.9",
          opacity: 1
        },
        ".swiper-pagination-bullet": {
          bg: "white",
          opacity: 1
        },
        ".swiper-pagination-progressbar .swiper-pagination-progressbar-fill": {
          bg: "dark"
        },
        "&#three-d-overflow-effect": {
          ".swiper-container": {
            position: "relative",
            bg: "white",
            width: "100%",
            height: "100%",
            p: "0.5rem"
          },
          ".swiper-slide": {
            backgroundPosition: "center",
            backgroundSize: "cover",
            width: ["10rem", "20rem"],
            height: ["10rem", "20rem"],
            bg: "white"
          }
        }
      }}
    />)
}

const renderSlide = ({ id, ...rest }, idx) => (
  <SlideItem {...rest} key={`${id}-slideContent-${idx}`} width={1} />
);

const Slider = ({ hasImage, params, id, ...styles }) => {
  const data = generateSlides({ id, hasImage });

  return (
    <SliderContainer {...styles} id={id}>
      <Swiper {...params}>{data.map(renderSlide)}</Swiper>
    </SliderContainer>
  );
};

export default Slider;
