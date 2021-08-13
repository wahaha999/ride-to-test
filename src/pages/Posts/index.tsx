import React, { useState, ReactElement, FC } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Container, Grid, Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { Post } from '../../AppSlice';
import PostCard from "../../components/Post";
import Filter from "../../components/Filter";
import clsx from 'clsx';

const useStyles = makeStyles({
    root: {
        paddingTop: 30,
        minHeight: 'calc(100vh - 158px)'
    },
    loading: {
        textAlign: 'center',
    },
    pagination: {
        display: 'inline-block',
        marginTop: 20,
        marginBottom: 20,
    }
});

const EVENTS_PER_PAGE = 10;

const PostsPage: FC<any> = (): ReactElement => {
    const classes = useStyles();
    const posts: Post[] = useAppSelector((state: RootState) => state.post.posts);    
    const loading: boolean = useAppSelector((state: RootState) => state.post.loading);
    const [page, setPage] = useState(0);

    const handlePageChange = (e: React.ChangeEvent<unknown>, page: number) => {
        setPage(page - 1);
    }

    const data: Post[] = posts.slice(page * EVENTS_PER_PAGE, (page + 1) * EVENTS_PER_PAGE);

    return (
        <Container className={clsx(
            classes.root
          )}>
            { loading && (
                <div className={classes.loading}>
                    <CircularProgress />
                </div>  
            )}
            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={4}>
                    <Typography variant="h5">Filters</Typography>
                    <Filter />
                </Grid>
                <Grid item xs={8}>
                    <Typography variant="h5">Products</Typography>
                    {data.map((post: Post) => (
                        <PostCard
                            key={post.id}
                            post={post}
                        />
                    ))}
                    <Pagination
                        count={Math.ceil(posts.length / EVENTS_PER_PAGE)}
                        page={page + 1}
                        variant="outlined"
                        shape="rounded"
                        classes={{ root: classes.pagination }}
                        onChange={handlePageChange}
                    />
                </Grid>
            </Grid>
        </Container>
    );
};
export default PostsPage;