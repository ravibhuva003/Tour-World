import Tour from  '../models/Tour.js';

//create a new tour
export const createTour = async (req, res  ) => {
    const newTour = new Tour(req.body);

    try {
        const savedTour = await newTour.save();
        res.status(200).json({
            success:true,
            message:'Successfully Created',
            data:savedTour 
        });
    } catch (err) {
        res.status(500).
        json({success:false,message:'Failed to create. Try again!'});
    }
};

//update the tour
export const updateTour = async(req,res) =>{
    const id = req.params.id;
    try {  
        const updatedTour = await Tour.findByIdAndUpdate(id,{
            $set:req.body
        },{new:true});

        res.status(200).json({
            success:true,
            message:"Successfully Updated",
            data:updatedTour 
        });
    } catch (err ) {
        res.status(500).
        json({success:false,message:"Failed to update. Try again!"});
    }
};

//delete the tour
export const deleteTour = async(req,res) =>{
    const id = req.params.id;
    try {  
        await Tour.findByIdAndDelete(id);

        res.status(200).json({
            success:true,
            message:"Successfully Deleted"
        });
    } catch (err) {
        res.status(500).
        json({success:false,message:"Failed to delete. Try again!"});
    }
};

//getSingle the tour
export const getSingleTour = async(req,res) =>{
    const id = req.params.id;
    try {  
        const tour = await Tour.findById(id).populate("reviews");

        res.status(200).json({
            success:true,
            message:"Successful",
            data:tour
        });
    } catch (err) {
        res.status(404).
        json({success:false,
            message:"Not Found!"});
    }
};

//getAll the tour
export const getAllTour = async(req,res) =>{

    // for pagination
    const page = parseInt(req.query.page) || 0;
    const limit = 150;
    
    // filtering
    const minPrice = parseInt(req.query.minPrice);
    const maxPrice = parseInt(req.query.maxPrice);
    
    let filter = {};
    if (!isNaN(minPrice) && !isNaN(maxPrice)) {
        filter.price = { $gte: minPrice, $lte: maxPrice };
    } else if (!isNaN(minPrice)) {
        filter.price = { $gte: minPrice };
    } else if (!isNaN(maxPrice)) {
        filter.price = { $lte: maxPrice };
    }

    try {  
        const totalTours = await Tour.countDocuments(filter);
        const totalPages = Math.ceil(totalTours / limit);
        
        const tours = await Tour.find(filter).populate("reviews").skip(page*limit).limit(limit);
        res.status(200).json({
            success:true,
            count:tours.length,
            totalPages: totalPages,
            message:"Successful",
            data:tours
        });
    } catch (err) {
        res.status(404).
        json({success:false,
            message:"Not Found!"});
    }
};

//get tour by search

export const getTourBySearch = async(req, res) => {
    let filter = {};
    if (req.query.city) {
        filter.city = new RegExp(req.query.city,'i');
    }
    if (req.query.distance) {
        filter.distance = {$lte: parseInt(req.query.distance)};
    }
    if (req.query.maxGroupSize) {
        filter.maxGroupSize = {$gte: parseInt(req.query.maxGroupSize)};
    }

    try {
        const tours = await Tour.find(filter).populate("reviews");

        res.status(200).json({
            success:true,
            message:"Successful",
            data:tours
        });        
    } catch (err) {
        res.status(404).
        json({success:false,
            message:"Not Found!"});
    }
};


//get featured tour
export const getFeaturedTour = async(req,res) =>{

    try {  
        const tours = await Tour.find({featured:true}).populate("reviews").limit(8);
        res.status(200).json({
            success:true,
            message:"Successful",
            data:tours,
        });
    } catch (err) {
        res.status(404).
        json({success:false,
            message:"Not Found!"});
    }
};

//get tour counts
export const getTourCount = async (req, res) => {
    try {
        const tourCount = await Tour.estimatedDocumentCount();
        res.status(200).json({
            success:true,
            data:tourCount
        });
    } catch (err) {
        res.status(404).
        json({success:false,
            message:"Failed to get tour count"});
    }
};