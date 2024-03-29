import { Twitter } from "@mui/icons-material";
import AppleIcon from "@mui/icons-material/Apple";
import GoogleIcon from "@mui/icons-material/Google";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Avatar, Container, CssBaseline, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from 'react';
import useAuth from "../../../Hooks/useAuth";
import LogIn from '../Login/LogIn';
import Register from "../Register/Register";
const LoginRegister = () => {
    const { isLogin, socialSignIn } = useAuth();
    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {isLogin ? "Sign in" : "Sign up"}
                </Typography>
                {/* forms */}

                {isLogin ? <LogIn /> : <Register />}

                {/* forms ends */}
                <Stack direction="row" spacing={5} sx={{ marginTop: 3 }}>
                    <IconButton
                        aria-label="google"
                        color="error"
                        sx={{ width: "75px", height: "75px", boxShadow: 2 }}
                        onClick={() => socialSignIn("google")}
                    >
                        <GoogleIcon fontSize="large"></GoogleIcon>
                    </IconButton>
                    <IconButton
                        aria-label="apple"
                        color="default"
                        sx={{ width: "75px", boxShadow: 2, height: "75px" }}
                    // onClick={() => socialSignIn("apple")}
                    >
                        <AppleIcon fontSize="large"></AppleIcon>
                    </IconButton>
                    <IconButton
                        aria-label="twitter"
                        color="info"
                        sx={{
                            width: "75px",
                            height: "75px",
                            fontSize: "15px",
                            boxShadow: 2,
                        }}
                    // onClick={() => socialSignIn("twitter")}
                    >
                        <Twitter fontSize="large"></Twitter>
                    </IconButton>
                </Stack>
            </Box>
        </Container>
    );
};

export default LoginRegister;