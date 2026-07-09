import React from "react";
import Slider from "react-slick";
import ava01 from "../../assets/images/ava-1.jpg";
import ava02 from "../../assets/images/ava-2.jpg";
import ava03 from "../../assets/images/ava-3.jpg";

const testimonialsData = [
  {
    text: "Our trip was absolutely fantastic! The tour guide was incredibly knowledgeable and the entire experience was seamlessly organized. I can't wait to book my next adventure with them!",
    name: "John Doe",
    role: "Customer",
    img: ava01
  },
  {
    text: "I was amazed by the level of detail and care put into our itinerary. Everything from the hotels to the excursions was top-notch. Highly recommend this agency for your next vacation!",
    name: "Lia Franklin",
    role: "Customer",
    img: ava02
  },
  {
    text: "The best travel experience I've ever had. We didn't have to worry about a single thing, and the destinations were breathtaking. Thank you for making our dream trip a reality.",
    name: "Michael Smith",
    role: "Customer",
    img: ava03
  },
  {
    text: "An unforgettable journey! The local guides showed us hidden gems we would have never found on our own. The value for the price is simply unbeatable.",
    name: "Sarah Jenkins",
    role: "Customer",
    img: ava01
  },
  {
    text: "Professional, responsive, and truly passionate about travel. They tailored our family trip perfectly to accommodate both the kids and the adults. We will definitely use them again.",
    name: "David Chen",
    role: "Customer",
    img: ava02
  },
  {
    text: "From the first inquiry to our return flight, the customer service was phenomenal. They handled all our special requests with ease. A truly 5-star experience!",
    name: "Emily Roberts",
    role: "Customer",
    img: ava03
  }
];

const Testimonials = () => {
    const settings = {
        dots:true,
        infinite:true,
        autoplay:true,
        speed:1000,
        swipeToSlide:true,
        autoplaySpeed:2000,
        slidesToShow:3,

        responsive:[
            {
                breakpoint: 992,
                settings:{
                    slidesToShow:2,
                    slidesToScroll:1,
                    infinite:true,
                    dots:true,
                },
            },

            {
                breakpoint: 576,
                settings:{
                    slidesToShow:1,
                    slidesToScroll:1,
                },
            },
        ]
    }
  return (
    <Slider {...settings}>
        {testimonialsData.map((testimonial, index) => (
            <div className="testimonial py-4 px-3" key={index}>
                <p>"{testimonial.text}"</p>
                <div className="d-flex align-items-center gap-4 mt-3">
                    <img src={testimonial.img} className="w-25 h-25 rounded-2" alt=""/>
                    <div>
                        <h6 className="mb-0 mt-3">{testimonial.name}</h6>
                        <p>{testimonial.role}</p>
                    </div>
                </div>
            </div>
        ))}
    </Slider>
  )
};

export default Testimonials;