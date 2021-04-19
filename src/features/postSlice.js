import { createSlice } from '@reduxjs/toolkit';

export const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: []
  },
  reducers: {
    addPost: (state, action) => {
      state.posts = [...state.posts, action.payload];
    },
    deletePost: (state,action) => {
        const index = state.posts.findIndex(post => post.id === action.payload);
        const newPosts = [...state.posts];
        newPosts.splice(index,1);
        state.posts = newPosts;
    },
    setPosts:(state,action) =>{
        state.posts = [ ...action.payload];
    }
  },
});

export const { addPost, deletePost, setPosts } = postsSlice.actions;

export const selectPosts = (state) => state.posts.posts;

export default postsSlice.reducer;


