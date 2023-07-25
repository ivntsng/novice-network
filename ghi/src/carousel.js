import React from 'react';
import { Carousel } from 'react-bootstrap';
import carousel1 from './image/carousel1.jpeg';
import carousel2 from './image/carousel2.jpeg';
import carousel3 from './image/carousel3.jpeg';

export default function MyCarousel() {
  return (
    <Carousel>
      <Carousel.Item>
        <img className="d-block w-100" src={carousel1} alt="First slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={carousel2} alt="Second slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={carousel3} alt="Third slide" />
      </Carousel.Item>
    </Carousel>
  );
}
