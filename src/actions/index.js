import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlaceholder';

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    await dispatch(fetchPosts());
    //find unique user id in the posts
//    const userIds = _.uniq(_.map(getState().posts, 'userId'))
//    userIds.forEach(id => dispatch(fetchUser(id)));

   //Refactoring
   _.chain(getState().posts)
        .map('userId')
        .uniq()
        .forEach(id => dispatch(fetchUser(id)))
        .value()
}
//Redux thunk
//2 arrows -> function return function
export const fetchPosts = () => async (dispatch) => {
    const reponse = await jsonPlaceholder.get('/posts');
    dispatch({
        type: 'FETCH_POSTS',
        payload: reponse.data
    });    
}

export const fetchUser = id => async dispatch => {
    const response = await jsonPlaceholder.get(`/users/${id}`);
    dispatch({
        type: 'FETCH_USER',
        payload: response.data
    });
};

    
  
// export const fetchUser = (id) => async (dispatch) => {
//     const response = await jsonPlaceholder.get(`/users/${id}`)
//     dispatch({
//         type: 'FETCH_USER',
//         payload: response.data
//     })
// }

// export const fetchUser = id => dispatch => _fetchUser(id, dispatch); 

// //Fetch each user only 1 time
// const _fetchUser = _.memoize(async(id, dispatch) => {
//     const response = await jsonPlaceholder.get(`/users/${id}`)
//         dispatch({
//             type: 'FETCH_USER',
//             payload: response.data
//         });
// })