import React, { useState, useEffect } from "react";
import {
  createHotelApi,
  deleteHotelApi,
  getAllHotelsApi,
} from "../../apis/Api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import AdminSidebar from "./AdminSideBar";
import '../../styles/admin.css'

const AdminDashboard = () => {
  const [hotelName, setHotelName] = useState("");
  const [hotelPrice, setHotelPrice] = useState("");
  const [hotelDescription, setHotelDescription] = useState("");
  const [hotelCategory, setHotelCategory] = useState("");
  const [hotelImage, setHotelImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const savedHotels = JSON.parse(localStorage.getItem("hotels"));
    if (savedHotels && savedHotels.length > 0) {
      setHotels(savedHotels);
    } else {
      // Fetch hotels from API if not found in localStorage
      fetchHotels();
    }
  }, []);

  const fetchHotels = () => {
    getAllHotelsApi()
      .then((res) => {
        if (res.data && res.data.hotels) {
          setHotels(res.data.hotels);
          localStorage.setItem("hotels", JSON.stringify(res.data.hotels));
        } else {
          toast.error("No hotels found");
        }
      })
      .catch((error) => {
        console.error("Error fetching hotels:", error);
        toast.error("Failed to fetch hotels");
      });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setHotelImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("hotelName", hotelName);
    formData.append("hotelPrice", hotelPrice);
    formData.append("hotelDescription", hotelDescription);
    formData.append("hotelCategory", hotelCategory);
    formData.append("hotelImage", hotelImage);

    createHotelApi(formData)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          setHotelName("");
          setHotelPrice("");
          setHotelDescription("");
          setHotelCategory("");
          setHotelImage(null);
          setPreviewImage(null);
          // Update state with new hotel and save to localStorage
          const updatedHotels = [...hotels, res.data.hotel];
          setHotels(updatedHotels);
          localStorage.setItem("hotels", JSON.stringify(updatedHotels));
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Internal Server Error!");
      });
  };

  const handleDelete = (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this hotel?"
    );
    if (!confirm) {
      return;
    }
    deleteHotelApi(id)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          const updatedHotels = hotels.filter((hotel) => hotel._id !== id);
          setHotels(updatedHotels);
          localStorage.setItem("hotels", JSON.stringify(updatedHotels));
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        console.error("Error deleting hotel:", error);
        toast.error("Failed to delete hotel");
      });
  };

  return (
    <>
     <AdminSidebar />
     <div className="dashboard-container">
      <div className="m-4">
        <div className="d-flex justify-content-between">
          <h1>Admin Dashboard</h1>
          <button
            type="button"
            className="btn btn-danger"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Add Hotel
          </button>
        </div>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Create a new hotel!
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <label>Hotel Name</label>
                  <input
                    onChange={(e) => setHotelName(e.target.value)}
                    className="form-control mb-2"
                    type="text"
                    placeholder="Enter hotel name"
                  />
                  <label>Hotel Description</label>
                  <textarea
                    onChange={(e) => setHotelDescription(e.target.value)}
                    className="form-control mb-2"
                    placeholder="Enter description"
                    cols="4"
                    rows="4"
                  ></textarea>
                  <label>Price</label>
                  <input
                    onChange={(e) => setHotelPrice(e.target.value)}
                    type="number"
                    className="form-control mb-2"
                    placeholder="Enter your price"
                  />
                  <label>Select category</label>
                  <select
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
                  {previewImage && (
                    <img
                      src={previewImage}
                      className="img-fluid rounded object-cover mt-2"
                      alt="Preview"
                    />
                  )}
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Save changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <table className="table mt-2">
          <thead className="table-dark">
            <tr>
              <th>Hotel Image</th>
              <th>Hotel Name</th>
              <th>Hotel Price</th>
              <th>Hotel Category</th>
              <th>Hotel Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {hotels &&
              hotels.map((item) => (
                <tr key={item._id}>
                  <td>
                    <img
                      src={item.hotelImageUrl}
                      height={40}
                      width={40}
                      alt="Hotel"
                    />
                  </td>
                  <td>{item.hotelName}</td>
                  <td>NPR.{item.hotelPrice}</td>
                  <td>{item.hotelCategory}</td>
                  <td>{item.hotelDescription.slice(0, 10)}</td>
                  <td>
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Basic example"
                    >
                      <Link
                        to={`/admin/edit/${item._id}`}
                        className="btn btn-success"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      </div>
    </>
  );
};

export default AdminDashboard;