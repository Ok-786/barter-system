import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
// import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import styles from "./Navbar.module.css";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { NavLink, useNavigate } from "react-router-dom";
import SquareIcon from "@mui/icons-material/Square";
import Logo from "../../assets/logo5.png";
import LinkedIn from "@mui/icons-material/LinkedIn";
import Twitter from "@mui/icons-material/Twitter";
import SearchBar from "../user/Products/SearchBar/SearchBar";
import AvatarMenu from "./AvatarMenu";
import EmailIcon from '@mui/icons-material/Email';
import AddIcon from '@mui/icons-material/Add';
import NotificationMenu from "./NotificationMenu";

function Navbar({ setSearchQuery }) {
  const navItems = ["Home", "addpost"];
  const routeItems = ["/home", "/addpost"];
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <>

      {user.status != false ?
        <div
          className={styles["header"]}
        >
          <div className={styles["logo-nav"]}>

            <p className={styles["logo"]}>
              <img src={Logo} width="30vh" height="30vh" alt="" />
            </p>
            <h1 style={{ color: 'white', marginLeft: '10px' }}>
              Barter
            </h1>
          </div>
          <ul className={styles["signin-up"]}>
            <Box sx={{ mr: 4 }}>
              {navItems.map((item, index) => (
                <Button
                  key={item}
                  sx={{
                    color: "#fff",
                    fontSize: "1.2rem",
                    textDecoration: "none",
                    mr: "20px",
                  }}
                >
                  <NavLink
                    className={() =>
                      styles["not-active"]
                    }
                    to={routeItems[index]}
                    style={{ textDecoration: "none" }}
                  >
                    {
                      item.toLowerCase() === 'addpost' ?
                        <div style={{ display: 'inline-flex', flex: 1, alignItem: 'center', justifyCenter: 'center', borderBlockStart: '5px solid rgb(0,0,120)', borderBlockEnd: '5px solid rgb(200,0,120)', borderInlineStart: '5px solid rgb(200,0,20)', borderInlineEnd: '5px solid rgb(0,0,120)', borderRadius: '25vh', paddingInline: '2vh' }}>
                          {item}
                        </div>
                        :
                        item
                    }
                  </NavLink>
                </Button>
              ))}
            </Box>
            <div style={{ marginTop: '1vh' }}>
              <SearchBar setSearchQuery={setSearchQuery} />
            </div>
            <EmailIcon onClick={() => navigate('/chats')} style={{ cursor: 'pointer', color: "white", marginTop: '2vh', marginLeft: '2vh' }} />
            {/* <NotificationsIcon style={{ color: "white", marginTop: '2vh', marginLeft: '2vh' }} /> */}
            <NotificationMenu />
            <AvatarMenu />
          </ul>
        </div>
        :
        <>
        </>
      }
    </>
  );
}

export default Navbar;
