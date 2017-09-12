import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import serializeForm from 'form-serialize'
import { getAllCategory,createNewPost} from '../actions'
import { connect } from 'react-redux'
class AddPost extends Component {
    state = {
        redirectToNewPage: false
      }
      
    componentDidMount () {
        
        
        this.props.getCategories()
        
    }
    handleEvent = (e) => {
        e.preventDefault()
        const post = serializeForm(e.target, { hash: true })
        this.props.addSinglePost(post)

        // const curPost = this.getCurPost()
        // if (curPost) {
        //   curPost.title = post.title
        //   curPost.body = post.body
        //   curPost.category = post.category
        //   this.props.updatePost(curPost, this.props.history)
        // } else {
        //   this.props.addPost(post, this.props.history)
        // }
        this.setState({ redirectToNewPage: true })
        
      }

      

    render() {

        if (this.state.redirectToNewPage) {
            return (
            <Redirect to="/"/>
            )
          }
       
        
        const {categories} = this.props.categories
        console.log(categories)
        
        return (
            
       <div>
           <Link to={`/`}>Go Back </Link>
           <br/>
           <br/>
       
        <form onSubmit={this.handleEvent} className='create-post-form'>
            <div className='create-post-details'>
              <input type='text' name='title' placeholder='title'/>
              <br/>
              <br/>
              <input type='text' name='author' placeholder='author'/>
              <br/>
              <br/>
              <textarea type='text' name='body' placeholder='body'/>
              <br/>
              <br/>
               <select name='category'>
                {
                  Object.keys(categories).length >0 && Object.keys(categories).map((name) => (
                    <option  key={name}>{name}</option>
                  ))
                }
              </select> 
              <button onClick={()=>this.handleEvent}>create post</button>
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
        addSinglePost: (data) => dispatch(createNewPost(data))

        }
    }
  
    export default connect(
     mapStateToProps,mapDispatchToProps
    )(AddPost) 

