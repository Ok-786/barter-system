import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
// import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import styles from "./Navbar.module.css";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { NavLink } from "react-router-dom";
import SquareIcon from "@mui/icons-material/Square";
import Logo from "../../assets/logo5.png";
import LinkedIn from "@mui/icons-material/LinkedIn";
import Twitter from "@mui/icons-material/Twitter";
import SearchBar from "../user/Products/SearchBar/SearchBar";
import AvatarMenu from "./AvatarMenu";
import NotificationsIcon from '@mui/icons-material/Notifications';
import EmailIcon from '@mui/icons-material/Email';


function Navbar({ setSearchQuery }) {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const navItems = ["Home", "addpost"];
  const routeItems = ["/home", "/addpost"];

  return (
    <div
      className={[click && styles["headerFixed"], styles["header"]].join(" ")}
    >
      <div className={styles["logo-nav"]}>

        <p className={[styles["mobile-logo"], styles["logo"]].join(" ")}>
          <span className={styles["heading"]}>
            <img src={Logo} width="30vh" height="30vh" alt="" />
          </span>
        </p>
        <h1 style={{ color: 'white', marginLeft: '10px' }}>
          Barter
        </h1>
      </div>
      <ul className={styles["signin-up"]}>
        <Box sx={{ display: {}, mr: 4 }}>
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
                className={({ isActive }) =>
                  styles["not-active"]
                }
                to={routeItems[index]}
                style={{ textDecoration: "none" }}
              >
                <NavLink
                  className={({ isActive }) =>
                    styles["logo-not-active"]
                  }
                  to={routeItems[index]}
                  style={{ textDecoration: "none" }}
                >
                  <SquareIcon style={{ fontSize: "1rem" }} /> &nbsp;
                </NavLink>
                {
                  item.toLowerCase() === 'addpost' ?
                    <div style={{ borderBlockStart: '5px solid rgb(0,0,120)', borderBlockEnd: '5px solid rgb(200,0,120)', borderInlineStart: '5px solid rgb(200,0,20)', borderInlineEnd: '5px solid rgb(0,0,120)', borderRadius: '25vh', paddingInline: '2vh' }}>{item}</div>
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
        <EmailIcon style={{ color: "white", marginTop: '2vh', marginLeft: '2vh' }} />
        <NotificationsIcon style={{ color: "white", marginTop: '2vh', marginLeft: '2vh' }} />
        <AvatarMenu />
      </ul>
    </div>
  );
}

export default Navbar;
