import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import "../styles/userProfile.css";

import {
    Avatar,
    Box,
    Button,
    Divider,
    Grid,
    Modal,
    TextField,
    Typography
} from "@mui/material";


const UserProfile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [editedData, setEditedData] = useState({});
    const [imagePreview, setImagePreview] = useState("");
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = React.useState("success");
    const [snackbarMessage, setSnackbarMessage] = React.useState("");
    const user = JSON.parse(localStorage.getItem("user"));

    const handleOpenSnackbar = (severity, message) => {
        setSnackbarSeverity(severity);
        setSnackbarMessage(message);
        setOpenSnackbar(true);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const fetchUserProfile = async () => {
        try {
            if (user) {
                const token = localStorage.getItem("token");

                const decodedToken = jwtDecode(token);
                const userId = decodedToken.id;
                if (!decodedToken || !decodedToken.id) {
                    throw new Error("Unable to decode token or retrieve user ID.");
                }

                const config = {
                    headers: {
                        Authorization: ` Bearer ${token}`,
                    },
                };

                const response = await axios.get(
                    `http://localhost:5500/api/user/profile/${userId}`,
                    config
                );
                setUserData(response.data.userProfile);
                setLoading(false);
            }
        } catch (error) {
            console.error("Error fetching user profile:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const handleEditProfile = () => {
        setEditMode(true);
        setEditedData({
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            username: userData.username,
            phone: userData.phone,
            address: userData.address,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setEditedData({ ...editedData, image: file });
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem("token");

            const decodedToken = jwtDecode(token);
            const userId = decodedToken.id;
            if (!decodedToken || !decodedToken.id) {
                throw new Error("Unable to decode token or retrieve user ID.");
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await axios.put(
                `http://localhost:5500/api/user/edit/${userId}`,
                editedData,
                config
            );

            fetchUserProfile();
            setEditMode(false);
            handleOpenSnackbar("success", "User profile updated successfully");
        } catch (error) {
            console.error("Error updating user profile:", error);
            handleOpenSnackbar("error", "Error updating user profile");
        }
    };

    if (!user) {
        return (
            <div className="error-message">Please log in to view your profile</div>
        );
    }
    // Function to get initials from first name and last name
    const getInitials = (firstName, lastName) => {
        return `${firstName.charAt(0)}${lastName.charAt(0)}`;
    };

    return (
        <>
            <div className="user-profile-container">
                {loading ? (
                    <Loading />
                ) : userData ? (
                    <div className="user-profile">
                        <h6 className="profile-title">User Profile</h6>
                        <Divider />
                        <div className="profile-details">
                            <div className="profile-picture">
                                {imagePreview ? (
                                    <Avatar
                                        alt="Profile Picture"
                                        src={imagePreview}
                                        sx={{ width: 100, height: 100, marginRight: "1rem" }}
                                    />
                                ) : (
                                    <div className="initials-placeholder">
                                        {getInitials(userData.firstName, userData.lastName)}
                                    </div>
                                )}
                            </div>
                            <div className="profile-info">
                                <p>
                                    <strong>Name:</strong> {userData.firstName}{" "}
                                    {userData.lastName}
                                </p>
                                <p>
                                    <strong>Email:</strong> {userData.email}
                                </p>
                                <p>
                                    <strong>Username:</strong> {userData.username}
                                </p>
                                <p>
                                    <strong>Phone Number:</strong> {userData.phone}
                                </p>
                                <p>
                                    <strong>Address:</strong> {userData.address}
                                </p>
                            </div>
                        </div>
                        <Divider />
                        <Link
                            to="#"
                            className="edit-profile-link"
                            onClick={handleEditProfile}
                        >
                            Edit Profile
                        </Link>
                    </div>
                ) : (
                    <div className="error-message">Error fetching user profile</div>
                )}
            </div>
            <Modal
                open={editMode}
                onClose={() => setEditMode(false)}
                aria-labelledby="edit-profile-modal"
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "white",
                        boxShadow: 24,
                        p: 4,
                        width: 400,
                        borderRadius: 2,
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Edit Profile
                    </Typography>

                    {/* Image section */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginBottom: "1rem",
                        }}
                    >
                        <Avatar
                            alt="Profile Picture"
                            src={imagePreview} // Use image preview as src
                            sx={{ width: 100, height: 100, marginRight: "1rem" }}
                        />
                        <label htmlFor="upload-photo">
                            <input
                                style={{ display: "none" }}
                                id="upload-photo"
                                name="upload-photo"
                                type="file"
                                onChange={handleImageChange} // Handle file change
                            />
                            {/* <IconButton
                                color="primary"
                                aria-label="upload picture"
                                component="span"
                            >
                                <EditIcon />
                            </IconButton> */}
                        </label>
                    </Box>

                    {/* Text fields */}
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                label="First Name"
                                value={editedData.firstName}
                                onChange={(e) =>
                                    setEditedData({ ...editedData, firstName: e.target.value })
                                }
                                variant="outlined"
                                fullWidth
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Last Name"
                                value={editedData.lastName}
                                onChange={(e) =>
                                    setEditedData({ ...editedData, lastName: e.target.value })
                                }
                                variant="outlined"
                                fullWidth
                                margin="normal"
                            />
                        </Grid>
                    </Grid>
                    <TextField
                        label="Email"
                        value={editedData.email}
                        onChange={(e) =>
                            setEditedData({ ...editedData, email: e.target.value })
                        }
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Username"
                        value={editedData.username}
                        onChange={(e) =>
                            setEditedData({ ...editedData, username: e.target.value })
                        }
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Phone Number"
                        value={editedData.phone}
                        onChange={(e) =>
                            setEditedData({ ...editedData, phone: e.target.value })
                        }
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Address"
                        value={editedData.address}
                        onChange={(e) =>
                            setEditedData({ ...editedData, address: e.target.value })
                        }
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />

                    {/* Save Changes button */}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        fullWidth
                        style={{ marginTop: "1rem", backgroundColor: "#ff8b8b", color: "#ffffff" }}
                    >
                        Save Changes
                    </Button>
                </Box>
            </Modal>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbarSeverity}
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};
export default UserProfile;
