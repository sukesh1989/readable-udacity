
import randomize from 'randomatic'
import React, { Component } from 'react';
import { getComments } from '../actions'
import { connect } from 'react-redux'
import {withRouter} from 'react-router'

import { fetchComments } from '../utils/readableAPI'

class PostCard extends Component {
    state = {
        comments : null
    }
    componentDidMount () {
       
        console.log(this.props.post)
        fetchComments(this.props.post.id).then(result => this.handleChange(result))

      
    }
   

    handleChange(result) {
        this.setState({
            comments: result
          })
    }
    render() {
        
        return (
            
            <div className="post-container" ref="myRef" key={randomize('*', 10)}>
<a href={`/post/${this.props.post.id}`}>
<p className="post-title" key={this.props.post.title}>{ this.props.post.title}</p></a>
<p className="post-body" key={this.props.post.body}> {this.props.post.body}</p>
<p className="post-author" key={this.props.post.author}>{'Author: ' + this.props.post.author}</p>
<p className="post-created" key={this.props.post.timestamp}>{'Created on: ' + new Date(this.props.post.timestamp).toLocaleString()}</p>
<p key={randomize('*', 10)}> {'Vote: ' + this.props.post.voteScore}</p>
<a href={`/editpost/${this.props.post.id}`} key={randomize('*', 10)}>Edit post</a>
<p key={randomize('*', 10)}>Comments:-{this.state.comments?this.state.comments.length:0}</p>
<button key={randomize('*', 10)}
onClick={()=>this.props.voteUp(this.props.post)}
title="Sort by Date(Desc)"
color="#841584"
>+</button> 

<button key={randomize('*', 10)}
onClick={()=>this.props.voteDown(this.props.post)}
title="Sort by Date(Desc)"
color="#841584"
>-</button> 
</div>

        )
    }
}



function mapStateToProps (state) {
    
     return {
        state
      }
    }

function mapDispatchToProps (dispatch) {
    return {
        fetchComments: (data) => dispatch(getComments(data))
       
       }
   }
 
   export default withRouter(connect(
    mapStateToProps,mapDispatchToProps
   )(PostCard))