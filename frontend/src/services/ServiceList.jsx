import React from "react";
import ServiceCard from "./ServiceCard";
import {Col} from "reactstrap";

import weatherImg from "./../assets/images/weather.png";
import guideImg from "./../assets/images/guide.png";
import customizationImg from "./../assets/images/customization.png";

const servicesData = [
    {
        imgUrl:weatherImg,
        title: "Calculate Weather",
        desc: "Get real-time weather updates to plan your perfect trip."
    },
    {
        imgUrl:guideImg,
        title: "Best Tour Guide",
        desc: "Our expert guides ensure you have a safe and enriching experience."
    },
    {
        imgUrl:customizationImg,
        title: "Customization",
        desc: "Tailor your itinerary to suit your personal preferences and schedule."
    },
]

const ServiceList = () => {
  return (
    <>
    {
        servicesData.map((item,index)=>(
        <Col lg="3" md="6" sm="12" className="mb-4" key={index}> 
            <ServiceCard item={item}/>
        </Col>
        ))
        }
    </>
  )
}

export default ServiceList