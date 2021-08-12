import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  }
}));

const Header: FC = () => {
  const classes = useStyles();
  const location = useLocation();

  const title = location.pathname === "/" ? "Products" : "Topics";

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title} align="center" data-test-id="header-title">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header