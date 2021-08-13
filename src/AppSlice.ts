import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from './app/store';
import axios from './services/axios';

export interface ProductLink {
    type: string;
    url: string;
}

export interface Media {
    type: string;
    url: string;
    videoUrl: string;
}

export interface Post {
    id: string;
    name: string;
    description: string;
    commentsCount: number;
    productLinks: ProductLink[];
    media: Media[];
    votesCount: number;
    tagline: string;
    thumbnail: Media;
    reviewsCount: number;
    url: string;
}

export interface Topic {
    id: string;
    name: string;
    description: string;
    image: string;
    followersCount: number;
    postsCount: number;
    slug: string;
    url: string;
}

export interface AppState {
    posts: Post[];
    topics: Topic[];
    loading: boolean;
    error: string;
}

const initialState: AppState = {
    posts: [],
    topics: [],
    loading: false,
    error: ''
};

export const appSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setLoading: (state: AppState, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        getPostsSuccess: (state: AppState, action: PayloadAction<Post[]>) => {
            state.posts = action.payload;
        },
        getTopicsSuccess: (state: AppState, action: PayloadAction<Topic[]>) => {
            state.topics = action.payload;
        }, 
        getPostsFail: (state: AppState, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        getTopicsFail: (state: AppState, action: PayloadAction<string>) => {
            state.error = action.payload;
        }
    },
});

export const {
    setLoading,
    getPostsSuccess,
    getTopicsSuccess,
    getPostsFail,
    getTopicsFail
} = appSlice.actions;

export const getPosts = (query: string): AppThunk => (
    dispatch,
    getState
) => {
    dispatch(setLoading(true));
    const promises = [
        axios.post(`https://api.producthunt.com/v2/api/graphql`, { query: query })
    ];
    Promise.all(promises).then(([posts]) => {
        dispatch(setLoading(false));
        const data: Post[] = posts.data.data.posts.edges.map((postData: any) => {
            return postData.node;
        });
        console.log(data);
        dispatch(getPostsSuccess(data));
    }).catch(err => {
        dispatch(setLoading(false));
        dispatch(getPostsFail(err.response.data.message));
    });
};

export const getTopics = (): AppThunk => (
    dispatch,
    getState,
) => {
    const promises = [
        axios.post(`https://api.producthunt.com/v2/api/graphql`, { query: "query { topics(order: FOLLOWERS_COUNT) { edges { node { id, name, description, image, followersCount, postsCount, slug, url } } } }" })
    ];
    Promise.all(promises).then(([topics]) => {
        const data: Topic[] = topics.data.data.topics.edges.map((topicData: any) => {
            return topicData.node;
        });
        console.log(data);
        dispatch(getTopicsSuccess(data));
    }).catch(err => {
        dispatch(getTopicsFail(err.response.data.message));
    });
};

export default appSlice.reducer;
