import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import serializeForm from 'form-serialize'
import { getAllCategory,updateAComment,fetchCommentById} from '../actions'
import { connect } from 'react-redux'

import {withRouter} from 'react-router'
class EditComment extends Component {
    state = {
        redirectToNewPage: false,
        post:null
      }

      
    componentDidMount () {
        this.props.fetchComment(this.props.match.params.id).then(result => this.setState({
            comment: result
          }))
      
       
        
        

       
    }
    handleEvent = (e) => {
        e.preventDefault()
        this.props.updateComment(this.state.comment.comment.id,e.target.body.value)
        this.setState({ redirectToNewPage: true })
        
      }

     
    render() {
        if(this.state.comment){
        console.log(this.state.comment.comment.body)
        }

        
        if (this.state.redirectToNewPage) {
            return (
            <Redirect to="/"/>
            )
          }
       
        
    
        
        return (
            
       <div>
           <Link to={`/`}>Go Back </Link>
           <br/>
           <br/>
       
        <form onSubmit={this.handleEvent} className='create-post-form'>
            <div className='create-post-details'>
             
           
              <textarea type='text' name='body' key={this.state.comment} placeholder='body' defaultValue={this.state.comment&&this.state.comment.comment.body}/>
              <br/>
               
    
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
       
        updateComment: (id,detail) => dispatch(updateAComment(id,detail)),
        fetchComment: (data) => dispatch(fetchCommentById(data))
        
        }
    }
  
    export default  withRouter(connect(
     mapStateToProps,mapDispatchToProps
    )(EditComment))

