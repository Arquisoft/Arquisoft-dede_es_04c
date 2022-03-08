import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logo from './icons/DeDe.png';
import CartDrawer from './CartDrawer';

const pages = ['Tienda', 'Historia'];
const settings = ['Perfil', 'Signup', 'Logout'];

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" style={{ background: '#596886' }}>
      <Container maxWidth={false}>
        <Toolbar disableGutters>
            <Link href='/'
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
          <img src={logo}></img>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          
          <Link href='/'
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <img src={logo}></img>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link href={"/" + page} sx={{ my: 2, color: '#fff', display: 'block', pr: 4, pl: 4 }}>{page}</Link>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Opciones de usuario">
              <IconButton onClick={handleOpenUserMenu} sx={{ pr: 5, color: '#fff' }} size='large'>
                <AccountCircleIcon fontSize="inherit" sx={{ color: "#fff" }}/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 0, pr: 5 }}>
            <Tooltip title="Abrir carrito">
              <IconButton size="large">
              <CartDrawer />

              </IconButton>
              
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;