import './componentStyles/Navbar.css';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import { Link, useNavigate } from 'react-router-dom';



export default function Navbar() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  // const anchorRef = React.useRef < HTMLButtonElement > (null);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  }

  const navigate = useNavigate();


  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleMenuClick}
            >
              <Stack direction="row" spacing={2}>
                <MenuIcon />
                {menuOpen &&
                  <Paper>
                    <MenuList>
                      <MenuItem onClick={() => navigate("/account")}> My account </MenuItem>
                      <MenuItem onClick={() => navigate("/")} color="error"> Logout </MenuItem>
                    </MenuList>
                  </Paper>
                }
              </Stack>
            </IconButton>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
              BAGBUILDER
            </Typography>
                <Button
                  color="success"
                  variant="contained"
                  onClick={() => navigate("/login")}
                  sx={{m:1}}
                >
                  Login
                </Button>
                <Button
                  color="success"
                  variant="contained"
                  onClick={() => navigate("/signup")}
                  sx={{m:1}}
                >
                  Sign Up
                </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  )
}