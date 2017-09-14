
import { deletePost,deleteComment,createComment,voteComment,updateComment,fetchCommentDetail,fetchComments,fetchAllCategories,fetchPosts,fetchCategoryPosts,votePost,createPost,fetchPostDetail,updatePost } from '../utils/readableAPI'
import randomize from 'randomatic'

export const GET_ALL_CATEGORY = 'GET_ALL_CATEGORY'
export const GET_ALL_POSTS = 'GET_ALL_POSTS'
export const GET_CATEGORY_POSTS = 'GET_CATEGORY_POSTS'
export const VOTE_POSTS = 'VOTE_POSTS'
export const CREATE_NEW_POST='CREATE_NEW_POST'
export const FETCH_POST='FETCH_POST'
export const UPDATE_POST='UPDATE_POST'
export const FETCH_COMMENTS='FETCH_COMMENTS'
export const VOTE_COMMENT='VOTE_COMMENT'
export const CREATE_COMMENT='CREATE_COMMENT'
export const FETCH_COMMENT='FETCH_COMMENT'
export const UPDATE_COMMENT='UPDATE_COMMENT'
export const DELETE_COMMENT='DELETE_COMMENT'
export const DELETE_POST='DELETE_POST'

function getAll(categories) {
  return {
    type: GET_ALL_CATEGORY,
    categories
  }
}

export function getAllCategory() {
  return dispatch => {
    return  fetchAllCategories().then(data =>
      dispatch(getAll(data)))
  }
}



function getPosts(posts) {
  return {
    type: GET_ALL_POSTS,
    posts
  }
}

export function getAllPosts() {
  return dispatch => {
    return  fetchPosts().then(data =>
      dispatch(getPosts(data)))
  }
}

function getCategoryPosts(posts) {
  return {
    type: GET_CATEGORY_POSTS,
    posts
  }
}

export function getAllCategoryPosts(category) {
  return dispatch => {
    return  fetchCategoryPosts(category).then(data =>
      dispatch(getCategoryPosts(data)))
  }
}

function updateAfterVotePosts(post) {
  return {
    type: VOTE_POSTS,
    post
  }
}

export function votePosts(post,isup) {
  return dispatch => {
    
    return  votePost(post,isup).then(data =>
      dispatch(updateAfterVotePosts(data)))
  }
}


function newPost(post) {
  return {
    type: CREATE_NEW_POST,
    post
  }
}

export function createNewPost(post) {
  post['timestamp'] = Date.now()
  post['id'] = randomize('aA0', 20)
  
  return dispatch => {
    
    return  createPost(post).then(data =>
      dispatch(newPost(data)))
  }
}


function fetchPost(post) {
  return {
    type: FETCH_POST,
    post
  }
}

export function fetchPostById(id) {
  return dispatch => {
    
    return  fetchPostDetail(id).then(data =>
      dispatch(fetchPost(data)))
  }
}


function updateThePost(post) {
  return {
    type: UPDATE_POST,
    post
  }
}

export function updateAPost(post) {

  return dispatch => {
    
    return  updatePost(post).then(data =>
      dispatch(updateThePost(data)))
  }
}


function fetchCommentsByID(comments) {
  
  return {
    type: FETCH_COMMENTS,
    comments
  }
}

export function getComments(postid) {

  return dispatch => {
    
    return  fetchComments(postid).then(data =>
      dispatch(fetchCommentsByID(data)))
  }
}



function updateCommentAfterVotePosts(comment) {
  return {
    type: VOTE_COMMENT,
    comment
  }
}

export function voteComments(comment,isup) {
  return dispatch => {
    
    return  voteComment(comment,isup).then(data =>
      dispatch(updateCommentAfterVotePosts(data)))
  }
}





function fetchComment(comment) {
  return {
    type: FETCH_COMMENT,
    comment
  }
}

export function fetchCommentById(id) {
  return dispatch => {
    
    return  fetchCommentDetail(id).then(data =>
      dispatch(fetchComment(data)))
  }
}


function updateTheComment(comment) {
  return {
    type: UPDATE_COMMENT,
    comment
  }
}

export function updateAComment(id,detail) {
  
  return dispatch => {
    
    return  updateComment(id,Date.now(),detail).then(data =>
      dispatch(updateTheComment(data)))
  }
}



function createTheComment(comment) {
  return {
    type: CREATE_COMMENT,
    comment
  }
}

export function createAComment(data,pid) {
  data['timestamp'] = Date.now()
  data['id'] = randomize('aA0', 20)
  data['parentId']=pid
  return dispatch => {
    
    return  createComment(data).then(data =>
      dispatch(createTheComment(data)))
  }
}


function deletedPost(posts) {
  return {
    type: DELETE_POST,
    posts
  }
}

export function deleteAPost(data) {
  return dispatch => {
    
    return  deletePost(data).then(data =>
      dispatch(deletedPost(data)))
  }
}

function deletedComment(comments) {
  return {
    type: DELETE_COMMENT,
    comments
  }
}

export function deleteAComment(data) {
  return dispatch => {
    
    return  deleteComment(data).then(data =>
      dispatch(deletedComment(data)))
  }
}