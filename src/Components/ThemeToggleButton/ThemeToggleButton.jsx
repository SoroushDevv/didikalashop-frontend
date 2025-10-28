import React, { useContext } from "react";
import { ThemeContext } from "./../../Contexts/ThemeContext";
import { IconButton } from "@mui/material";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';


const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <IconButton onClick={toggleTheme} color="inherit">
      {theme === "light" ? <DarkModeIcon />  : <LightModeIcon style={{color:"yellow"}}/>}
    </IconButton>
  );
};

export default ThemeToggle;
