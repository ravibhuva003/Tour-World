import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
// @ts-ignore
import calculateAvgRating from '../utils/avgRating';
import { motion } from 'framer-motion';

import "./tour-card.css";

export interface Review {
  _id?: string;
  username?: string;
  reviewText?: string;
  rating: number;
}

export interface Tour {
  _id: string;
  title: string;
  city: string;
  photo: string;
  price: number;
  featured: boolean;
  reviews: Review[];
}

interface TourCardProps {
  tour: Tour;
}

const TourCard: React.FC<TourCardProps> = ({ tour }) => {
  const { _id, title, city, photo, price, featured, reviews } = tour;

  const { totalRating, avgRating } = calculateAvgRating(reviews);
  
  return (
    <motion.div 
      className="tour__card"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
        <Card>
            <div className="tour__img">
                <img src={photo} alt="tour-img" />
                {featured && <span>Featured</span>}
            </div>
            <CardBody>
            <div className="card__top d-flex align-items-center justify-content-between">
                <span className="tour__location d-flex align-items-center  gap-1">
                <i className="ri-map-pin-line"></i> {city}
                </span>

                <span className="tour__rating d-flex align-items-center  gap-1">
                <i className="ri-star-fill"></i> {avgRating === 0 ? null : avgRating }{totalRating === 0 ? ("Not Rated") : (<span>({reviews.length})</span> )}
                
                </span>
            </div>
            <h5 className="tour__title"><Link to={`/tours/${_id}`}>{title}</Link></h5>
            <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
                <h5>
                    ${price}
                    <span>
                        /per person
                    </span>
                </h5>
                <button className="btn booking__btn">
                <Link to={`/tours/${_id}`}>Book Now</Link>
                </button>
            </div>
        </CardBody>
        </Card>
    </motion.div>
  )
}

export default TourCard;
