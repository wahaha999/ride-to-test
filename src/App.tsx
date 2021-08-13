import React, { Suspense, useEffect } from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import { useAppDispatch } from './app/hooks';
import { getPosts, getTopics } from './AppSlice';

const PostsPage = React.lazy(() => import('./pages/Posts'));
const Header = React.lazy(() => import('./components/Header'));
const Footer = React.lazy(() => import('./components/Footer'));

function App() {
  const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getTopics());
        dispatch(getPosts(`query 
                    { posts(order: VOTES) { 
                      edges { 
                        node { 
                          id, 
                          name, 
                          url, 
                          description, 
                          commentsCount, 
                          reviewsCount, 
                          productLinks { type, url }, 
                          media { type, url, videoUrl }, 
                          thumbnail { type, url, videoUrl }, 
                          votesCount, 
                          tagline 
                        } 
                      } 
                    } 
                  }`));
        // eslint-disable-next-line
    }, []);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Header />
            <Switch>
                <Route exact path="/">
                    <PostsPage />
                </Route>
            </Switch>
            <Footer />
        </Suspense>
    );
}

export default App;
