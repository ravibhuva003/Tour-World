import express from "express";
import { createTour, getAllTour, getSingleTour, updateTour,deleteTour,getTourBySearch,getFeaturedTour,getTourCount } from "./../controllers/tourController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//create new tour
router.post("/",verifyAdmin,createTour);

//update tour
router.put("/:id",verifyAdmin,updateTour);

//delete tour
router.delete("/:id",verifyAdmin,deleteTour);

//get Single tour
router.get("/:id",getSingleTour);

//get All tour
router.get("/",getAllTour);

//get tour by search
router.get("/search/getTourBySearch",getTourBySearch);
router.get("/search/getFeaturedTour",getFeaturedTour);
router.get("/search/getTourCount",getTourCount);



export default router;
