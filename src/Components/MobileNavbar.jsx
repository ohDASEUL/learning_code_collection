import React from "react";
import {
  AppBar,
  Divider,
  Drawer,
  IconButton,
  List,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { styled, useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
const drawerWidth = 240;
const MobileNavbar = () => {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));

  const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: `-${drawerWidth}px`,
      ...(open && {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      }),
    })
  );

  const menuList = [
    "전체보기",
    "남성",
    "여성",
    "가방",
    "액세서리",
    "기프트",
    "컬렉션",
  ];
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const goMainHome = () => {
    navigate("/");
  };
  return (
    <div>
      {isMobile && (
        <>
          <AppBar position="fixed" open={open} className="app-bar">
            <Toolbar className="navbar-drawer-header">
              <IconButton
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(open && { display: "none" }) }}
              >
                <MenuIcon />
              </IconButton>
              <div className="navbar-logo">
                <img
                  src="https://www.prada.com/etc/designs/aem-prada-innovation-clientlibs/clientlib-resources/resources/images/logo_prada_b.svg"
                  alt="Prada Logo"
                  onClick={goMainHome}
                />
              </div>
            </Toolbar>
          </AppBar>
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
            variant="persistent"
            anchor="left"
            open={open}
          >
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "ltr" ? (
                  <ChevronLeftIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
              <ul>
                {menuList.map((menu) => (
                  <li key={menu}>{menu}</li>
                ))}
              </ul>
            </List>
          </Drawer>
          <Main open={open}>
            <DrawerHeader />
          </Main>
        </>
      )}
    </div>
  );
};

export default MobileNavbar;
