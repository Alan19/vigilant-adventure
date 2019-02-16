import {
  AppBar,
  Drawer,
  Icon,
  IconButton,
  List,
  ListItem,
  Toolbar,
  Tooltip,
  Typography,
  withStyles
} from "@material-ui/core";
import classNames from "classnames";
import React, { Component } from "react";
import * as PropTypes from "prop-types";
import SearchBar from "./SearchBar";
import { info } from "../info";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CheatSheetIcon from "../icon-classes/cheatSheetIcon";

const drawerWidth = 240;

const styles = theme => ({
  menuButton: {
    marginLeft: 0,
    marginRight: 36
  },
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  toolbar: theme.mixins.toolbar,
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9 + 1
    }
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  }
});

class AppBarButtons extends Component {
  render() {
    return (
      <React.Fragment>
        <Tooltip title={"Toggle Light/Dark Theme"}>
          <IconButton
            onClick={this.props.switchTheme}
            color={"inherit"}
            label={"Switch Light/Dark Theme"}
          >
            <Icon>highlight</Icon>
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );
  }
}

AppBarButtons.propTypes = {
  onClick: PropTypes.func,
  onClick1: PropTypes.func,
  onClick2: PropTypes.func
};

class SkillDrawer extends Component {
  render() {
    return (
      <Drawer
        variant="permanent"
        className={classNames(this.props.classes.drawer, {
          [this.props.classes.drawerOpen]: this.props.open,
          [this.props.classes.drawerClose]: !this.props.open
        })}
        classes={{
          paper: classNames({
            [this.props.classes.drawerOpen]: this.props.open,
            [this.props.classes.drawerClose]: !this.props.open
          })
        }}
        open={this.props.open}
      >
        <div className={this.props.classes.toolbar} />
        <List>
            {info.map(this.props.callbackfn)}
            <Tooltip title={'Cheat Sheet'} placement={"right"}>
                <ListItem
                    onClick={() => this.props.cheatSheet()}
                    button
                    key={'Cheat Sheet'}
                >
                    <ListItemIcon>
                        <CheatSheetIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Cheat Sheet'} />
                </ListItem>
            </Tooltip>
            <Tooltip title={'Cheat Sheet+'} placement={"right"}>
                <ListItem
                    onClick={() => this.props.cheatSheetInDepth()}
                    button
                    key={'Cheat Sheet+'}
                >
                    <ListItemIcon>
                        <CheatSheetIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Cheat Sheet+'} />
                </ListItem>
            </Tooltip>
        </List>
      </Drawer>
    );
  }
}

SkillDrawer.propTypes = {
  classes: PropTypes.any,
  open: PropTypes.bool,
  callbackfn: PropTypes.func
};

class BackButton extends Component {
  render() {
    return (
      <IconButton
        style={{ visibility: this.props.visibility }}
        color="inherit"
        aria-label="Menu"
        onClick={this.props.onClick}
        className={this.props.classes.menuButton}
      >
        <Icon>arrow_back</Icon>
      </IconButton>
    );
  }
}

BackButton.propTypes = {
  visibility: PropTypes.any,
  onClick: PropTypes.func
};

class DrawerButton extends Component {
    render() {
        return <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={this.props.onClick}
            className={classNames(this.props.classes.menuButton, {
                [this.props.classes.hide]: this.props.open
            })}
        >
            <Icon>menu</Icon>
        </IconButton>;
    }
}

DrawerButton.propTypes = {
    onClick: PropTypes.func,
    classes: PropTypes.any,
    open: PropTypes.any
};

export class RenderAppBar extends Component {

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
          <AppBar position="sticky" className={classes.appBar} color={"primary"}>
              <Toolbar>
                  {this.props.backable && <BackButton classes={classes} onClick={() => this.props.back()}/>}
                  {!this.props.backable && <DrawerButton onClick={this.props.toggleDrawer} classes={classes} open={this.props.open}/>}
                  <Typography
                      variant='h5'
                      color="inherit"
                      style={{flexGrow: 1}}
                  >
                      Cheat Sheet
                  </Typography>
                  <SearchBar changeview={this.props.changeview}/>

                  <div style={{marginLeft: 30}}>
                      <AppBarButtons switchTheme={() => this.props.switchTheme()}/>
                  </div>
              </Toolbar>
          </AppBar>
          <SkillDrawer
              cheatSheet={this.props.cheatSheet}
              cheatSheetInDepth={this.props.cheatSheetInDepth}
              classes={classes}
              open={this.props.open}
              callbackfn={section => {
                  return this.generateDrawerEntries(section);
              }}
          />
      </React.Fragment>
    );
  }

  generateDrawerEntries(section) {
    const SectionIcon = section.icon;
    return (
      <Tooltip title={section.name} placement={"right"}>
        <ListItem
          onClick={() => this.props.onclick(section.infoObj)}
          button
          key={section.name}
        >
          <ListItemIcon>
            <SectionIcon />
          </ListItemIcon>
          <ListItemText primary={section.name} />
        </ListItem>
      </Tooltip>
    );
  }
}

export default withStyles(styles)(RenderAppBar);
