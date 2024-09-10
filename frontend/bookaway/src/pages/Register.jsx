import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

import {
  Box,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { registerApi } from "../apis/Api";
import signup from "../assets/images/register.png";
import { useNavigate } from "react-router-dom";

const Register = () => {
  //step 1: create a state variable

  const [firstName, setUserName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //step 2: Create a function the state variable
  const changeUserName = (e) => {
    setUserName(e.target.value);
  };

  const changeLastName = (e) => {
    setLastName(e.target.value);
  };

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  //after clicking the submit button
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Submitting form...");

    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };

    console.log("Form data:", data);

    registerApi(data)
      .then((res) => {
        console.log("Response:", res.data);
        if (res.data.success === true) {
          toast.success(res.data.message, {
            className: "toast-success",
          });
          navigate('/login');
        } else {
          toast.error(res.data.message, {
            className: "toast-error",
          });
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        toast.error("Internal server Error", {
          className: "toast-error",
        });
      });
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src={signup} alt="logo" height={100} width={100} />
          <Typography component="h1" variant="h5" style={{ color: "#ff6f6f" }}>
            Register
          </Typography>
          <h6>Register your account here</h6>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="First Name"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={changeUserName}
                  sx={{ borderColor: "#ff6f6f" }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={changeLastName}
                  sx={{ borderColor: "#ff6f6f" }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={changeEmail}
                  sx={{ borderColor: "#ff6f6f" }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={changePassword}
                  sx={{ borderColor: "#ff6f6f" }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disableElevation
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#ff8b8b",
                borderRadius: "22px",
                "&:hover": { backgroundColor: "#ff8b8b" },
                "&:focus": { backgroundColor: "#ff8b8b" },
              }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Register;
