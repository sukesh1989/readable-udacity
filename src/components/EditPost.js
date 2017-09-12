import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import serializeForm from 'form-serialize'
import { getAllCategory,updateAPost,fetchPostById} from '../actions'
import { connect } from 'react-redux'

import {withRouter} from 'react-router'
class EditPost extends Component {
    state = {
        redirectToNewPage: false,
        post:null
      }

      
    componentDidMount () {
        
        
        this.props.getCategories()
        this.props.fetchPost(this.props.match.params.id)

        this.props.fetchPost(this.props.match.params.id).then(result => this.setState({
            post: result.post
          }))
      
       
    }
    handleEvent = (e) => {
        e.preventDefault()
        const post = serializeForm(e.target, { hash: true })
        
        
        post["id"]=this.props.categories.posts.id
        this.props.updatePost(post)
        this.setState({ redirectToNewPage: true })
        
      }

     
    render() {
     
        const post= this.props.categories.posts
        const selected = post.category
        
        if (this.state.redirectToNewPage) {
            return (
            <Redirect to="/"/>
            )
          }
       
        
        const {categories} = this.props.categories
        
        return (
            
       <div>
           <Link to={`/`}>Go Back </Link>
           <br/>
           <br/>
       
        <form onSubmit={this.handleEvent} className='create-post-form'>
            <div className='create-post-details'>
             
              <input type='text' name='title' key={post.id} placeholder='title' defaultValue={post.title}  /> />
              <br/>
              <br/>
              <input type='text' name='author' key={post.author} placeholder='author' defaultValue={post.author}/>
              <br/>
              <br/>
              <textarea type='text' name='body' key={post.body} placeholder='body' defaultValue={post.body}/>
              <br/>
              <br/>
               <select key={post.category} name='category'>
                {
                  Object.keys(categories).length >0 && Object.keys(categories).map((name) => (
                    <option key={name} selected={selected===name}>{name}</option>
                  ))
                }
              </select> 
              <button onClick={()=>this.handleEvent}>Update post</button>
            </div>
          </form>
      </div>
        )
    }
}


function mapStateToProps (categories) {
    
     return {
        categories
      }
    }
  
  
    function mapDispatchToProps (dispatch) {
     return {
        getCategories: (data) => dispatch(getAllCategory()),
        updatePost: (data) => dispatch(updateAPost(data)),
        fetchPost: (data) => dispatch(fetchPostById(data))
        
        }
    }
  
    export default  withRouter(connect(
     mapStateToProps,mapDispatchToProps
    )(EditPost))

