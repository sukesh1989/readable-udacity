
  import { DELETE_POST,DELETE_COMMENT,CREATE_COMMENT,VOTE_COMMENT,UPDATE_COMMENT,FETCH_COMMENT,FETCH_COMMENTS,GET_ALL_CATEGORY,GET_ALL_POSTS,GET_CATEGORY_POSTS,VOTE_POSTS,FETCH_POST } from '../actions'

 import { combineReducers } from 'redux'
  

  
  export function categories(state = {}, action){
    switch (action.type) {
      case GET_ALL_CATEGORY:
      return action.categories.reduce((categories, category) => {
        categories[category.name] = category.path
        return categories
      }, {})
         
      default:
        return state
    }
  }

  export function posts(state = {}, action){
    switch (action.type) {
      case GET_ALL_POSTS:
      return (action.posts.filter(post=> post.deleted === false))
      case GET_CATEGORY_POSTS:
      return (action.posts.filter(post=> post.deleted === false))
      case VOTE_POSTS:
      return state.map(post => {

        if (post.id === action.post.id) {
          return action.post
        }
        return post
      })
      case DELETE_POST:
      return action.posts

      case FETCH_POST:
        return action.post
      default:
        return state
    }
  }

  export function comments(state = {}, action){
    switch (action.type) {
      case FETCH_COMMENTS:
        return action.comments
      case VOTE_COMMENT:
        
          return action.comment

      case UPDATE_COMMENT:
        return action.comment
       case FETCH_COMMENT:
       return action.comment
       case CREATE_COMMENT:
       return action.comment
       case DELETE_COMMENT:
       return action.comments
       
      default:
        return state
    }
  }
  
  


  export default combineReducers({categories,posts,comments})