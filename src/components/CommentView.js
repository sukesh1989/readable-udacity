import React,  { Component } from 'react';
import CategoryList from './CategoryList'
import PostCard from './PostCard'
import { getAllPosts,votePosts,getComments } from '../actions'
import { connect } from 'react-redux'
import {withRouter} from 'react-router'
import randomize from 'randomatic'

import { fetchComments } from '../utils/readableAPI'

import { getAllCategory } from '../actions'

class CommentView extends Component {
    state = {
        categories: null
        
      }

      handleChange(result) {
        this.setState({
            comments: result
          })
    }

    componentDidMount () {
        
        this.props.getPosts()
        this.props.getCategories()
        const {posts} = this.props.posts
        fetchComments(this.props.match.params.id).then(result => this.handleChange(result))
        
        
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
        const id=this.props.match.params.id

        
          return (
 <div key={randomize('*', 10)}>
{ 
  Object.keys(posts)
        .filter((a)=>posts[a].id===id)
        .sort((a,b)=>this.props.condition?posts[a].voteScore<posts[b].voteScore:posts[a].timestamp<posts[b].timestamp)
        .map((p)=> (

            
            <div className="post-container" ref="myRef" key={randomize('*', 10)}>

<p className="post-title" key={posts[p].title}>{ posts[p].title}</p>
<p className="post-body" key={posts[p].body}> {posts[p].body}</p>
<p className="post-author" key={posts[p].author}>{'Author: ' + posts[p].author}</p>
<p className="post-created" key={posts[p].timestamp}>{'Created on: ' + new Date(posts[p].timestamp).toLocaleString()}</p>
<p key={randomize('*', 10)}> {'Vote: ' + posts[p].voteScore}</p>
<a href={`/editpost/${posts[p].id}`} key={randomize('*', 10)}>Edit post</a>
<p key={randomize('*', 10)}>Comments:-{this.state.comments?this.state.comments.length:0}</p>
<button key={randomize('*', 10)}
onClick={()=>this.updateVoteUp(posts[p])}
title="Sort by Date(Desc)"
color="#841584"
>+</button> 

<button key={randomize('*', 10)}
onClick={()=>this.updateVoteDown(posts[p])}
title="Sort by Date(Desc)"
color="#841584"
>-</button> 
</div>

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
    )(CommentView))
