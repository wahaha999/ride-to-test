import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography, ButtonBase, Button, Link } from '@material-ui/core';
import { ArrowDropUp, Message } from '@material-ui/icons';
import { Post } from '../../AppSlice';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 20,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto'
    },
    image: {
        width: 80,
        height: 80,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    subtitle1: {
        fontWeight: 600
    },
    votes: {
        display: 'block'
    },
    arrowUp: {
        margin: 0
    },
    link: {
        textDecoration: 'none',
        "&:hover": {
            textDecoration: 'none'
        }
    }
}));

interface PostCardProps {
    post: Post;
}

const PostCard: FC<PostCardProps> = ({ post }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Link href={post.url} target="_blank" className={classes.link}>
                <Paper className={classes.paper}>                
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <ButtonBase className={classes.image}>
                                <img className={classes.img} alt="complex" src={post.thumbnail.url} />
                            </ButtonBase>
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1" className={classes.subtitle1}>
                                        {post.name}
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        {post.tagline}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant="outlined"
                                        startIcon={<Message />}
                                    >
                                        {post.reviewsCount}
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Button
                                    classes={{
                                        label: classes.votes,
                                        startIcon: classes.arrowUp
                                    }}
                                    variant="outlined"
                                    startIcon={<ArrowDropUp />}
                                >
                                    {post.votesCount}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Link>
        </div>
    );
}

export default PostCard;