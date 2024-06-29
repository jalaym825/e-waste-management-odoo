import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { RadioButton } from "primereact/radiobutton";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import Global from "../../utils/Global";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

export default function SignUp() {
  const [userType, setUserType] = useState("Individual");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newErrors = {};

    if (!formData.get("firstName"))
      return setErrors({ firstName: "First Name is required" });
    else
      newErrors.firstName = "";
    if (!formData.get("lastName"))
      return setErrors({ lastName: "Last Name is required" });
    else
      newErrors.lastName = "";
    if (!formData.get("email"))
      return setErrors({ email: "Email Name is required" });
    else
      newErrors.email = "";
    if (!formData.get("password"))
      return setErrors({ password: "Password is required" });
    else
      newErrors.password = "";
    if (!formData.get("phoneNumber"))
      return setErrors({ phoneNumber: "Phone Number is required" });
    else 
      newErrors.phoneNumber = "";
    if (!formData.get("zipCode"))
      return setErrors({ zipCode: "Zip Code is required" });
    else
      newErrors.zipCode = "";

    if (!userType)
      return setErrors({ userType: "User type is required" });
    else
      newErrors.userType = "";

    Global.httpPost('/auth/register', {
      name: formData.get("firstName") + " " + formData.get("lastName"),
      // firstName: formData.get("firstName"),
      // lastName: formData.get("lastName"),
      email: formData.get("email"),
      password: formData.get("password"),
      userType: userType,
      phoneNumber: formData.get("phoneNumber"),
      zipCode: formData.get("zipCode"),
    }, false)
    .then(data => {
      navigate('/')
    })
    .catch(err => {
      alert(err);
    })
  };

  return (
    <ThemeProvider theme={defaultTheme}>
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
          <Avatar sx={{ m: 1, bgcolor: "#32a852" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  error={!!errors.lastName}
                  helperText={errors.lastName}
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
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phoneNumber"
                  label="Phone Number"
                  name="phoneNumber"
                  autoComplete="tel"
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={!!errors.password}
                  helperText={errors.password}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  name="zipCode"
                  label="Zip Code"
                  type="text"
                  id="zipCode"
                  autoComplete="postal-code"
                  error={!!errors.zipCode}
                  helperText={errors.zipCode}
                />
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <RadioButton
                    inputId="userType1"
                    name="userType"
                    value="Individual"
                    onChange={(e) => setUserType(e.value)}
                    checked={userType === "Individual"}
                  />
                  <label htmlFor="userType1" className="ml-2">
                    Individual
                  </label>
                </Grid>
                <Grid item xs={4}>
                  <RadioButton
                    inputId="userType2"
                    name="userType"
                    value="Buisnesses"
                    onChange={(e) => setUserType(e.value)}
                    checked={userType === "Buisnesses"}
                  />
                  <label htmlFor="userType2" className="ml-2">
                    Buisnesses
                  </label>
                </Grid>
                <Grid item xs={4}>
                  <RadioButton
                    inputId="userType3"
                    name="userType"
                    value="Recycler"
                    onChange={(e) => setUserType(e.value)}
                    checked={userType === "Recycler"}
                  />
                  <label htmlFor="userType3" className="ml-2">
                    Recycler
                  </label>
                </Grid>
              </Grid>
              {errors.userType && (
                <Typography color="error" variant="body2">
                  {errors.userType}
                </Typography>
              )}
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "#32a852" }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="signin" variant="body2" sx={{ color: "black" }}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
