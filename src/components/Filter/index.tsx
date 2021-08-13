import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, ListItem, ListItemText, Card, Typography, ListItemAvatar, ListItemSecondaryAction, Avatar } from '@material-ui/core';
import { FixedSizeList } from 'react-window';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { RootState } from '../../app/store';
import { Topic, getPosts } from '../../AppSlice';

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
    },
    avatar: {
        borderRadius: 4,
        width: theme.spacing(3),
        height: theme.spacing(3),
    }
}));

function RenderRow(props: { data: any; index: any; style: any; }) {
    const classes = useStyles();
    const dispatch = useAppDispatch();    
    const { data, index, style } = props;

    const handleClick = () => {
        dispatch(getPosts(`query { posts(order: VOTES, topic: "${data[index].slug}") { edges { node { id, name, url, description, commentsCount, reviewsCount, productLinks { type, url }, media { type, url, videoUrl }, thumbnail { type, url, videoUrl }, votesCount, tagline } } } }`));
    }

    return (
        <ListItem button style={style} key={index} onClick={() => handleClick()}>
            <ListItemAvatar>
              <Avatar
                alt={data[index].slug}
                src={data[index].image}
                className={classes.avatar}
              />
            </ListItemAvatar>
            <ListItemText id={data[index].id} primary={data[index].name} />
            <ListItemSecondaryAction>
                <ListItemText id={data[index].id} primary={data[index].postsCount} />
            </ListItemSecondaryAction>
        </ListItem>
    );
}

const FilterComponent: FC<any> = () => {
    const classes = useStyles();
    const topics: Topic[] = useAppSelector((state: RootState) => state.post.topics);

    return (
        <Box className={classes.root}>
            <Card className={classes.card}>
                <Typography className={classes.title} variant="h6">Filter by topics</Typography>
                <FixedSizeList height={300} width="100%" itemSize={35} itemData={topics} itemCount={topics.length} className={classes.topicList} >
                    {RenderRow}
                </FixedSizeList>
            </Card>            
        </Box>
    );
}

export default FilterComponent;