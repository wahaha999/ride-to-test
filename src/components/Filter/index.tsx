import React, { FC } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Box, ListItem, ListItemText, Card, Typography } from '@material-ui/core';
import { FixedSizeList } from 'react-window';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: 300,
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        padding: '20px 16px',
        fontSize: 13,
        fontWeight: 600
    },
    card: {
        marginTop: 20
    },
    topicList: {
        marginBottom: 20
    }
}));

function renderRow(props: { index: any; style: any; }) {
    const { index, style } = props;

    return (
        <ListItem button style={style} key={index}>
            <ListItemText primary={`Item ${index + 1}`} />
        </ListItem>
    );
}

renderRow.propTypes = {
    index: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
};

interface FilterProps {
    
}

const FilterComponent: FC<FilterProps> = ({}) => {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Card className={classes.card}>
                <Typography className={classes.title} variant="h6">Filter by topics</Typography>
                <FixedSizeList height={300} width="100%" itemSize={35} itemCount={200} className={classes.topicList}>
                    {renderRow}
                </FixedSizeList>
            </Card>            
        </Box>
    );
}

export default FilterComponent;