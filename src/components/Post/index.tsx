import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Post } from '../../AppSlice';

const useStyles = makeStyles({
    root: {
        marginTop: 20,
    },
    media: {
        height: 140,
    },
});

interface PostCardProps {
    post: Post;
    handleClick: (postId: string) => void;
}

const PostCard: FC<PostCardProps> = ({ post, handleClick }) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea onClick={() => handleClick(post.id)}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {post.name}
                    </Typography>
                    <Grid container justifyContent="space-between">
                        <Grid item>
                            <Typography variant="caption">
                                {post.description}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default PostCard;