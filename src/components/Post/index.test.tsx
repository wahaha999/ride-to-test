import React from 'react';
import { render, screen } from '@testing-library/react';
import PostCard from './index';
import { Post } from '../../AppSlice';

const post: Post = {
    id: 1,
    userId: 1,
    title: "post title 1",
    body: "post body 1"
};

const handleShowComments = jest.fn();

test('renders PostCard component with post data', () => {
    render(<PostCard post={post} handleClick={handleShowComments} />);
    expect(screen.getByText(/post title 1/i)).toBeInTheDocument();
    expect(screen.getByText(/post body 1/i)).toBeInTheDocument();
});

// test('event card component should have add button when it is not in entries', () => {
//     render(<PostCard post={post} handleClick={handleShowComments} />);
//     expect(screen.getAllByRole('button')[1]).toHaveTextContent('Add to Entries');
//     fireEvent.click(screen.getAllByRole('button')[1]);
//     expect(handleToggleEvent).toBeCalled();

// });

// test('event card component should have remove button when it is in entries', () => {
//     render(<EventCard event={event} selected={true} handleClick={handleToggleEvent} />);
//     expect(screen.getAllByRole('button')[1]).toHaveTextContent('Remove from Entries');
//     fireEvent.click(screen.getAllByRole('button')[1]);
//     expect(handleToggleEvent).toBeCalled();
// });
