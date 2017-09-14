import React,  { Component } from 'react';
import CategoryList from './CategoryList'
import PostCard from './PostCard'
import { getAllPosts,getComments,votePosts,voteComments,createAComment,deleteAPost,deleteAComment } from '../actions'
import { connect } from 'react-redux'
import {withRouter} from 'react-router'
import randomize from 'randomatic'
import serializeForm from 'form-serialize'
import { fetchComments } from '../utils/readableAPI'

import { getAllCategory } from '../actions'

class PostView extends Component {
    state = {
        categories: null,
        stateChanged:null
      }

      handleChange(result) {
        this.setState({
            comments: result
          })
    }

    componentDidMount () {
        
        this.props.getPosts()
        this.props.getCategories()
        
        fetchComments(this.props.match.params.id).then(result => this.handleChange(result))
        
        
    }
   

    updateVoteUp = (p) => {
        
        if(p.id){
        this.props.updateVote(p.id,true)
        }
        this.props.getPosts()
        fetchComments(this.props.match.params.id).then(result => this.handleChange(result))
        
        }

        updateVoteDown = (p) => {
          
          if(p.id){
          this.props.updateVote(p.id,false)
          }
          this.props.getPosts()
          fetchComments(this.props.match.params.id).then(result => this.handleChange(result))
          
          }
          updateCommentVoteUp = (p) => {
            if(p.id){
                this.props.updateVoteComments(p.id,true)
                }
                fetchComments(this.props.match.params.id).then(result => this.handleChange(result))
                
          }

          updateCommentVoteDown = (p) => {
            if(p.id){
                this.props.updateVoteComments(p.id,false)
                }
                fetchComments(this.props.match.params.id).then(result => this.handleChange(result))
                
              
        }

        deleteThisComment(comment){
            
            this.props.deleteComment(comment.id)
            fetchComments(this.props.match.params.id).then(result => this.handleChange(result))
            
         }

        
        deleteThisPost(post){
            
             this.props.deletePost(post.id)
             window.location.href='/'
         }
        getCommentCount = (p) => {
            this.props.fetchComments(p)
            
          }
          handleEvent  = (e) =>  {
            e.preventDefault()
            const comment = serializeForm(e.target, { hash: true })
            console.log(comment)
            this.props.createComment(comment,this.props.match.params.id)
           
            fetchComments(this.props.match.params.id).then(result => this.handleChange(result))
            
          }

    render() {
        const {posts} = this.props.posts
        const id=this.props.match.params.id
        const category = this.props.match.params.category
        const newPosts = Object.keys(posts).filter((post) => {
            return posts[post].id === id?posts[post]:null;
          })
         
          if (newPosts.length === 0) {
            return (
              <div>
               
              
              </div>
            )
          }
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
<button key={randomize('*', 10)}
onClick={()=>this.deleteThisPost(posts[p])}
title="Sort by Date(Desc)"

>Delete this post</button> 
<a href={`/editpost/${posts[p].id}`} key={randomize('*', 10)}>Edit post</a>
<button key={randomize('*', 10)}
onClick={()=>this.updateVoteUp(posts[p])}
title="Sort by Date(Desc)"

>+</button> 

<button key={randomize('*', 10)}
onClick={()=>this.updateVoteDown(posts[p])}
title="Sort by Date(Desc)"

>-</button> 


<p key={randomize('*', 10)}>Comments:-{this.state.comments?this.state.comments.length:0}</p>
</div>))
}
<div key={randomize('*', 10)}>
    {
       this.state.comments?this.state.comments.map((comment)=>
       <div key={randomize('*', 10)} className="post-container">
           <p key={randomize('*', 10)}>Author:  {comment.author}</p>
           <p  key={randomize('*', 10)} className="post-body" >{comment.body}</p>
           <p className="post-created" key={randomize('*', 10)}>{'Created on: ' + new Date(comment.timestamp).toLocaleString()}</p>
<p key={randomize('*', 10)}> {'Vote: ' + comment.voteScore}</p>
<button key={randomize('*', 10)}
onClick={()=>this.updateCommentVoteUp(comment)}
title="Sort by Date(Desc)"
>+</button> 

<button key={randomize('*', 10)}
onClick={()=>this.updateCommentVoteDown(comment)}
title="Sort by Date(Desc)"
>-</button> 
<a href={`/editcomment/${comment.id}`} key={randomize('*', 10)}>Edit comment</a>
<button key={randomize('*', 10)}
onClick={()=>this.deleteThisComment(comment)}
title="Sort by Date(Desc)"
>Delete this comment</button> 

</div>
    
):0
    }
    <div className="post-container">
        Add comment
    <form onSubmit={this.handleEvent} className='create-post-form'>
            <div className='create-post-details'>
             
            <input type='text' name='author' placeholder='author'/>
              <br/>
              <textarea type='text' name='body' key={this.state.comment} placeholder='body' defaultValue={this.state.comment&&this.state.comment.comment.body}/>
              <br/>
               
    
              <button onClick={()=>this.handleEvent}>Update comment</button>
            </div>
          </form>
</div>

    </div>


<CategoryList />
  </div>)
         
              }
}



function mapStateToProps (posts) {
    console.log(posts)
     return {
        posts
      }
    }
  
  
    function mapDispatchToProps (dispatch) {
     return {
        getPosts: (data) => dispatch(getAllPosts()),
        getCategories: (data) => dispatch(getAllCategory()),
        updateVoteComments: (data,isup) => dispatch(voteComments(data,isup)),
        updateVote: (data,isup) => dispatch(votePosts(data,isup)),
        createComment: (data,id) => dispatch(createAComment(data,id)),
        deletePost: (data) => dispatch(deleteAPost(data)),
        deleteComment: (data) => dispatch(deleteAComment(data))
        
       
        }
    }
  
    export default withRouter(connect(
     mapStateToProps,mapDispatchToProps
    )(PostView))
