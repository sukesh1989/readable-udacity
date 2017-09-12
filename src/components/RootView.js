import React,  { Component } from 'react';
import CategoryList from './CategoryList'
import PostCard from './PostCard'
import { getAllPosts,votePosts,getComments } from '../actions'
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

          <PostCard  key={randomize('*', 10)} voteUp= {()=>this.updateVoteUp(posts[p])} voteDown= {()=>this.updateVoteDown(posts[p])} post={posts[p]} />


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
        updateVote: (data,isup) => dispatch(votePosts(data,isup))
        
        
        }
    }
  
    export default withRouter(connect(
     mapStateToProps,mapDispatchToProps
    )(RootView))
