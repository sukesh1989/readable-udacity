import React,  { Component } from 'react';
import CategoryList from './CategoryList'
import PostCard from './PostCard'
import { getAllPosts,votePosts,getComments,deleteAPost } from '../actions'
import { connect } from 'react-redux'
import {withRouter} from 'react-router'
import randomize from 'randomatic'

import { getAllCategory } from '../actions'

class RootView extends Component {
    state = {
        categories: null
        
      }

    componentDidMount () {
        
        this.props.getPosts()
        this.props.getCategories()
        const {posts} = this.props.posts
       
        
    }
    componentWillReceiveProps(newProps){
      //this.props.getPosts()
      //this method will not get called first time
   }

    deletePost(postId){
     
      this.props.deletePost(postId.id)
      window.location.href=this.props.location.pathname
  }
    updateVoteUp = (p) => {
        
        if(p.id){
        this.props.updateVote(p.id,true)
        }
        }

        updateVoteDown = (p) => {
          
          if(p.id){
          this.props.updateVote(p.id,false)
          }
          }
    
        getCommentCount = (p) => {
            this.props.fetchComments(p)
            console.log(this.props)
          }
        
    render() {
        const {posts} = this.props.posts
        
          return (
 <div key={randomize('*', 10)}>
{ 
  Object.keys(posts)
        .sort((a,b)=>this.props.condition?posts[a].voteScore<posts[b].voteScore:posts[a].timestamp<posts[b].timestamp)
        .map((p)=> (

          <PostCard  key={randomize('*', 10)} deletePost= {()=>this.deletePost(posts[p])} voteUp= {()=>this.updateVoteUp(posts[p])} voteDown= {()=>this.updateVoteDown(posts[p])} post={posts[p]} />


))
}
<CategoryList />
  </div>)
     
    }
}



function mapStateToProps (posts) {
    
     return {
        posts
      }
    }
  
  
    function mapDispatchToProps (dispatch) {
     return {
        getPosts: (data) => dispatch(getAllPosts()),
        getCategories: (data) => dispatch(getAllCategory()),
        updateVote: (data,isup) => dispatch(votePosts(data,isup)),
        deletePost: (data) => dispatch(deleteAPost(data))
        
        
        }
    }
  
    export default withRouter(connect(
     mapStateToProps,mapDispatchToProps
    )(RootView))
