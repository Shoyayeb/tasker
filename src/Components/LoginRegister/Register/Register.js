import { Checkbox, FormControlLabel } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import useAuth from "../../../Hooks/useAuth";

const Register = (props) => {
    const [registerData, setRegisterData] = useState({});
    const { setError, setIsLogin, createUserByEmail } = useAuth();
    // console.log(user);
    const handleOnChange = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        const data = { ...registerData };
        data[field] = value;
        setRegisterData(data);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(registerData);
        if (
            registerData === {} ||
            !registerData.email ||
            !registerData.password ||
            !registerData.firstName ||
            !registerData.lastName
        ) {
            console.log("notEntered", registerData);
            setError("Please enter your information correctly");
        } else {
            console.log("creating");
            createUserByEmail(
                registerData.email,
                registerData.password,
                registerData.firstName,
                registerData.lastName
            );
        }
    };

    return (
        <div>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            onChange={handleOnChange}
                            autoComplete="given-name"
                            name="firstName"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            onChange={handleOnChange}
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="family-name"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            onChange={handleOnChange}
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            onChange={handleOnChange}
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox value="allowExtraEmails" color="primary" />}
                            label="I want to receive inspiration, marketing promotions and updates via email."
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign Up
                </Button>
            </Box>
            <Grid container justifyContent="flex-end">
                <Grid item>
                    <Link
                        variant="body2"
                        component="button"
                        onClick={() => setIsLogin(true)}
                    >
                        Already have an account? Sign in
                    </Link>
                </Grid>
            </Grid>
        </div>
    );
};

export default Register;