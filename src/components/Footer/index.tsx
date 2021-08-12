import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	title: {
		flexGrow: 1,
	},
	navlink: {
		color: 'white',
		textDecoration: 'none',
	}
}));

const Header: FC = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<Grid container justifyContent="space-between" alignItems="center">
						<Grid item>
							<Typography variant="h6" className={classes.title} align="center">
								Copyright &#169; 2021 David Kim, All rights reserved.
							</Typography>
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>
		</div>
	);
}

export default Header