import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleHotelApi, updateHotelApi } from "../../apis/Api"; // Adjust the import based on your API methods
import { toast } from "react-toastify";

const AdminEditHotel = () => {
  const { id } = useParams();

  useEffect(() => {
    getSingleHotelApi(id).then((res) => {
      // Update state with hotel data
      setHotelName(res.data.hotel.hotelName);
      setHotelPrice(res.data.hotel.hotelPrice);
      setHotelDescription(res.data.hotel.hotelDescription);
      setHotelCategory(res.data.hotel.hotelCategory);
      setHotelImage(res.data.hotel.hotelImageUrl);
    });
  }, [id]);

  const [hotelName, setHotelName] = useState("");
  const [hotelPrice, setHotelPrice] = useState("");
  const [hotelDescription, setHotelDescription] = useState("");
  const [hotelCategory, setHotelCategory] = useState("");
  const [hotelImage, setHotelImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setHotelImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if required fields are empty
    if (
      !hotelName ||
      !hotelPrice ||
      !hotelDescription ||
      !hotelCategory ||
      !hotelImage
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("hotelName", hotelName);
    formData.append("hotelPrice", hotelPrice);
    formData.append("hotelDescription", hotelDescription);
    formData.append("hotelCategory", hotelCategory);
    formData.append("hotelImage", hotelImage);
    
    updateHotelApi(id, formData)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          navigate("/admin/dashboard");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Internal Server Error!");
      });
  };

  return (
    <>
      <div className="m-4">
        <h3>
          Editing Hotel - <span className="text-danger">{hotelName}</span>
        </h3>
        <div className="d-flex gap-3">
          <form action="">
            <label>Hotel Name</label>
            <input
              value={hotelName}
              onChange={(e) => setHotelName(e.target.value)}
              className="form-control mb-2"
              type="text"
              placeholder="Enter hotel name"
            />
            <label>Hotel Price</label>
            <input
              value={hotelPrice}
              onChange={(e) => setHotelPrice(e.target.value)}
              type="text"
              className="form-control mb-2"
              placeholder="Enter hotel Price"
            />

            <label>Hotel Description</label>
            <textarea
              value={hotelDescription}
              onChange={(e) => setHotelDescription(e.target.value)}
              className="form-control mb-2"
              placeholder="Enter description"
              cols="4"
              rows="4"
            ></textarea>

            <label>Hotel Category</label>
            <select
              value={hotelCategory}
              onChange={(e) => setHotelCategory(e.target.value)}
              className="form-control mb-2"
            >
              <option value="">Select Category</option>
              <option value="featured">Featured</option>
              <option value="popular">Popular Destinations</option>
            </select>

            <label>Hotel Image</label>
            <input
              onChange={handleImageUpload}
              type="file"
              className="form-control"
            />

            <button
              onClick={handleSubmit}
              className="btn btn-primary w-100 mt-2"
            >
              Update Hotel
            </button>
          </form>
          <div>
            <h6>Old Image Preview</h6>
            <img
              className="img-fluid rounded-4 object-fit-cover"
              width={300}
              height={300}
              src={hotelImage}
              alt=""
            />

            <h6 className="mt-4">New Image</h6>
            {previewImage ? (
              <img
                src={previewImage}
                alt="Hotel Image"
                className="img-fluid rounded-4 object-fit-cover"
                width={300}
                height={300}
              />
            ) : (
              <p>No image selected!</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminEditHotel;
