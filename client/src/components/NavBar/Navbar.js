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
                  isActive ? styles["active"] : styles["not-active"]
                }
                to={routeItems[index]}
                style={{ textDecoration: "none" }}
              >
                <NavLink
                  className={({ isActive }) =>
                    isActive ? styles["logo-active"] : styles["logo-not-active"]
                  }
                  to={routeItems[index]}
                  style={{ textDecoration: "none" }}
                >
                  <SquareIcon style={{ fontSize: "1rem" }} /> &nbsp;
                </NavLink>
                {item}
              </NavLink>
            </Button>
          ))}
        </Box>
        <SearchBar setSearchQuery={setSearchQuery} />
        <EmailIcon style={{ color: "white", marginTop: '1vh', marginLeft: '2vh' }} />
        <NotificationsIcon style={{ color: "white", marginTop: '1vh', marginLeft: '2vh' }} />
        <AvatarMenu />
      </ul>
    </div>
  );
}

export default Navbar;
