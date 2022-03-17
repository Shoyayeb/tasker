import { CardHeader } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import React from "react";
import useAuth from "./../../../Hooks/useAuth";

const NavProfileModal = () => {
    const { signOutUser, user } = useAuth();
    return (
        <div>
            <Card sx={{ minWidth: 275 }}>
                <CardHeader
                    avatar={<Avatar aria-label={user.displayName} src={user?.photoURL || null}>S</Avatar>}
                    title={user.displayName}
                    subheader="September 14, 2016"
                />
                <CardContent></CardContent>
                <CardActions>
                    <Button size="small" onClick={signOutUser}>
                        Log Out
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
};

export default NavProfileModal;