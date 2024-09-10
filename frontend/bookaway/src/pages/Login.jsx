import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";


import {
  Button,
  Box,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import { loginApi } from "../apis/Api";
import loginImage from '../assets/images/login.png'
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get('error')) {
        toast.error('Please Login to Continue');
    }
}, [searchParams]);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password)

    const data = {
      email: email,
      password: password,
    };

        // api call
        loginApi(data).then((res) =>{
          if(res.data.success == false){
            toast.error(res.data.message)
          } else{
            toast.success(res.data.message)
            // set token and user data in local storage
            localStorage.setItem("token", res.data.token)

            // Converting incomming json
            const convertedJson = JSON.stringify(res.data.userData)
            localStorage.setItem("user", convertedJson)

          }
          navigate ('/homepage')

        }).catch((err) => {
          console.log(err)
          toast.error("Server Error!")
        })


    }

  return (
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
        {/* Display the login image */}
        <img src={loginImage} alt="Login" height={100} width={100} />
        <Typography component="h1" variant="h5" style={{ color: "#ff6f6f" }}>
          Login
        </Typography>
        <h6>Log into your account</h6>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChangeEmail}
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
                autoComplete="current-password"
                onChange={handleChangePassword}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: "#ff8b8b",
              borderRadius: "22px",
              "&:hover": { backgroundColor: "#ff8b8b" },
              "&:focus": { backgroundColor: "#ff8b8b" },
            }}
          >
            Login
          </Button>
          <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/register" variant="body2">
                Don't have an account? Sign up
                </Link>
              </Grid>
            </Grid>
          <Grid container justifyContent="flex-end">
            <Grid item>
            <Link to="/forgot-password" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
