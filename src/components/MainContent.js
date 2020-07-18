import React, {useEffect, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { RulebookAppbar } from "./Header";
import { Container, createMuiTheme, MuiThemeProvider, useMediaQuery } from "@material-ui/core";
import { RulebookDrawer } from "./Drawer";
import { Article } from "./Article/Article";
import Grid from "@material-ui/core/Grid";
import ViewListIcon from "@material-ui/icons/ViewList";
import ViewModuleIcon from "@material-ui/icons/ViewModule";

import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { GridView } from "./GridView";
import {blue, orange} from "@material-ui/core/colors";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    paddingLeft: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      paddingLeft: theme.spacing(9) + 1
    }
  }
}));

export const ViewsEnum = Object.freeze({ GRID: "GRID", ARTICLE: "ARTICLE" });
export default props => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") ? localStorage.getItem("darkMode") === "true" : useMediaQuery("(prefers-color-scheme: dark)"))

  //State
  const [view, setView] = useState(ViewsEnum.GRID);
  const [loadedArticles, setLoadedArticles] = useState(props.articles);
  const [targetId, setTargetId] = useState('');

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          primary: blue,
          secondary: orange,
          type: darkMode ? "dark" : "light"
        }
      }),
    [darkMode]
  );

  /**
   * Function to look at a certain article
   * @param article The article to set as the view
   * @param sectionId The ID of the section to scroll to
   */
  const learnMore = (article, sectionId = '') => {
    window.scrollTo(0, 0);
    if (sectionId !== ''){
      setTargetId(sectionId);
    }
    setLoadedArticles([article]);
    setView(ViewsEnum.ARTICLE);
  };

  useEffect(() => {
    if (targetId){
      window.scrollTo(0, document.getElementById(targetId).offsetTop - 100);
    }
    setTargetId('');
  }, [targetId]);

  /**
   * Switch between light and dark theme
   */
  const switchTheme = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => localStorage.setItem("darkMode", darkMode ? 'true' : 'false'), [darkMode]);

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <RulebookAppbar switchTheme={switchTheme} classes={classes} open={open} onClick={toggleDrawer} theme={theme} changeView={learnMore} setView={setView} view={view} />
        <RulebookDrawer classes={classes} open={open} />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Container>
            {view === ViewsEnum.ARTICLE && (<>{loadedArticles.map(article => (<Article key={article} json={article} />))}</>)}
            {view === ViewsEnum.GRID && <GridView learnMore={learnMore} loadedArticles={loadedArticles} />}
          </Container>
        </main>
      </div>
    </MuiThemeProvider>
  );
};
