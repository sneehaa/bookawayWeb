const mongoose = require('mongoose'); // Import mongoose

const cloudinary = require("cloudinary");
const Hotels = require("../model/hotelModel");


const createHotel = async (req,res) => {
    // step 1 : check incomming data
    console.log(req.body);
    console.log(req.files);

    // step 2 : Destructuring data
    const {
        hotelName, 
        hotelPrice,
        hotelDescription,
        hotelCategory,
    } = req.body;
    const {hotelImage} = req.files;

    // step 3 : Validate data
    if(!hotelName || !hotelPrice || !hotelDescription || !hotelCategory || !hotelImage){
        return res.json({
            success : false,
            message : "Please fill all the fields"
        })
    }

    try {
        // upload image to cloudinary
        const uploadedImage = await cloudinary.v2.uploader.upload(
            hotelImage.path,
            {
                folder : "hotels",
                crop : "scale"
            }
        )

        // Save to database
        const newHotel = new Hotels({
            hotelName : hotelName,
            hotelPrice : hotelPrice,
            hotelDescription : hotelDescription,
            hotelCategory : hotelCategory,
            hotelImageUrl : uploadedImage.secure_url
        })
        await newHotel.save();
        res.json({
            success : true,
            message : "Hotel created successfully",
            hotel : newHotel
        })


        
    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Internal server error"
        })
    }

}


// get all hotels
const getHotels = async (req,res) => {
    try {
        const allHotels = await Hotels.find({});
        res.json({
            success : true,
            message : "All Hotels fetched successfully!",
            hotelss : allHotels
        })
        
    } catch (error) {
        console.log(error);
        res.send("Internal server error")
    }

}

// fetch single hotel
const getSingleHotel = async (req, res) => {
    const hotelId = req.params.id;

    // Check if the hotelId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(hotelId)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid hotel ID format'
        });
    }

    try {
        const singleHotel = await Hotels.findById(hotelId);
        
        if (!singleHotel) {
            return res.status(404).json({
                success: false,
                message: 'Hotel not found'
            });
        }

        res.json({
            success: true,
            message: 'Single hotel fetched successfully!',
            hotel: singleHotel
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

// update hotel
const updateHotel = async (req,res) => {
    // step 1 : check incomming data
    console.log(req.body);
    console.log(req.files);

    // destructuring data
    const {
        hotelName,
        hotelPrice,
        hotelDescription,
        hotelCategory
    } = req.body;
    const {hotelImage} = req.files;

    // validate data
    if( !hotelName 
        || !hotelPrice 
        || !hotelDescription 
        || !hotelCategory){
        return res.json({
            success : false,
            message : "Required fields are missing!"
        })
    }

    try {
        // case 1 : if there is image
        if(hotelImage){
            // upload image to cloudinary
            const uploadedImage = await cloudinary.v2.uploader.upload(
                hotelImage.path,
                {
                    folder : "hotels",
                    crop : "scale"
                }
            )

            // make updated json data
            const updatedData = {
                hotelName : hotelName,
                hotelPrice : hotelPrice,
                hotelDescription : hotelDescription,
                hotelCategory : hotelCategory,
                hotelImageUrl : uploadedImage.secure_url
            }

            // find hotel and update
            const hotelId = req.params.id;
            await Hotels.findByIdAndUpdate(hotelId, updatedData)
            res.json({
                success : true,
                message : "Hotels updated successfully with Image!",
                updatedHotel : updatedData
            })

        } else {
            // update without image
            const updatedData = {
                hotelName : hotelName,
                hotelPrice : hotelPrice,
                hotelDescription : hotelDescription,
                hotelCategory : hotelCategory,
            }

            // find hotel and update
            const hotelId = req.params.id;
            await Hotels.findByIdAndUpdate(hotelId, updatedData)
            res.json({
                success : true,
                message : "Hotel updated successfully without Image!",
                updatedHotel : updatedData
            })
        }
        
    } catch (error) {
        res.status(500).json({  
            success : false,
            message : "Internal server error"
        })
    }
}

// delete hotel
const deleteHotel = async (req,res) =>{
    const hotelId = req.params.id;

    try {
        await Hotels.findByIdAndDelete(hotelId);
        res.json({
            success : true,
            message : "Hotel deleted successfully!"
        })
        
    } catch (error) {
        res.json({
            success : false,
            message : "Server error!!"
        })
    }
}



module.exports = {
    createHotel,
    getHotels,
    getSingleHotel,
    updateHotel,
    deleteHotel, 
}
