import React, { Component } from 'react';
import Header from './Header'
import RootView from './RootView'
import CategoryView from './CategoryView'
import '../App.css';
import {    Route } from 'react-router-dom'
import { getAllCategory } from '../actions'
import { connect } from 'react-redux'
import AddPost from './AddPost';
import EditPost from './EditPost';
import PostView from './PostView'
import {withRouter} from 'react-router'
import EditComment from './EditComment'
class App extends Component {
  
  state = {
    condition: true,
  }

  changeStateToTrue = () => {
    this.setState(() => ({
      condition: true,
     }))
  }
  
  changeStateToFalse = () => {
  
    this.setState(() => ({
      condition: false,
     }))
  }
  render() {
    
    

    return (
      <div className="App">
      <Header />
    
     <Route exact path="/addpost" render={ ()=> ( 
       <div>
       <p className="App-intro">
        Add Post
        </p>
        <AddPost />
        </div>
)
}
/>

{/* <Route exact path="/editpost/:id" render={ ()=> ( 
       <div>
       <p className="App-intro">
        Add Post
        </p>
        <EditPost postID={this.props.match.params.id}/>
        {console.log(this.props.id)}
        </div>
)
}
/> */}
<Route path="/editcomment/:id" component={EditComment}/> 
<Route path="/editpost/:id" component={EditPost}/> 
<Route exact path="/"  render={ () => (
 <div>

  <RootView condition={this.state.condition} />
<div className="buttonDiv">
  <button
  onClick={this.changeStateToTrue}
  title="Sort by Vote Score(Desc)"
  color="#841584"
  >Sort by Vote Score(Desc)</button>
  
 <button
onClick={this.changeStateToFalse}
  title="Sort by Date(Desc)"
  color="#841584"
  >Sort by by Date(Desc)</button> 
  <p className="App-intro"> </p>
  </div>
  </div>
 )}/>




 <Route exact path="/post/:id"  render={ () => (
 <div>

  <PostView  />
  </div>
 )}/>





 <Route exact path={'/category/:category'}  render={ () => (
 <div>

  <CategoryView condition={this.state.condition} />
<div className="buttonDiv">
  <button
  onClick={this.changeStateToTrue}
  title="Sort by Vote Score(Desc)"
  color="#841584">Sort by Vote Score(Desc)</button>
  
 <button
onClick={this.changeStateToFalse}
  title="Sort by Date(Desc)"
  color="#841584"
  >Sort by by Date(Desc)</button> 
  <p className="App-intro"> </p>
  </div>
  </div>
 )}/>




   </div> );
  }
}


function mapStateToProps (categories) {
  
   return {
      categories
    }
  }


  function mapDispatchToProps (dispatch) {
   return {
      getCategories: (data) => dispatch(getAllCategory())
      }
  }

  export default withRouter(connect(
   mapStateToProps,mapDispatchToProps
  )(App))