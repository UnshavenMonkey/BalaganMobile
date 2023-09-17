import {createSelector, createSlice} from '@reduxjs/toolkit';
import {
  createAppAsyncThunk,
  createAsyncActions,
  makeApiRequest,
} from '../../common-utils';
import {BACKEND_API_URL} from '../../common-consts';
import {selectSessionTokens} from '../system/system-slice';
import {RootState} from '../../app/store';

type PostsState = {
  posts: Record<string, PostType>;
};

export type Response<T> = {
  count: number;
  results: Array<T>;
};

export type PostType = {
  id: string;
  created: string;
  updated: string;
  author: string;
  comments_count: string;
  public_id: string;
  body: string;
  edited: boolean;
  post_image: string | null;
};

export const POSTS_INITIAL_STATE: PostsState = {
  posts: {},
};

const postsSlice = createSlice({
  name: 'posts',
  initialState: POSTS_INITIAL_STATE,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getPosts.fulfilled, (state, {payload}) => {
      const {count, results} = payload;
      results.forEach(item => {
        state.posts[item.id] = item;
      });
    });
  },
});

export const postsReducer = postsSlice.reducer;

export const getPostsActions = createAsyncActions<PostsState>('posts/getPosts');

const selectPostsState = (state: RootState) => state.posts;

export const selectPosts = createSelector(
  [selectPostsState],
  postsState => postsState.posts,
);

export const getPosts = createAppAsyncThunk<{}, Response<PostType>>(
  'posts/getPosts',
  async (_, {dispatch, state}) =>
    makeApiRequest<Response<PostType>>(
      {url: `${BACKEND_API_URL}/post/`, method: 'get'},
      {dispatch, sessionTokens: selectSessionTokens(state)},
    ),
);
