import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import { getAllCategory } from '../actions'
import { connect } from 'react-redux'

import {withRouter} from 'react-router'

class CategoryList extends Component {
    state = {
        categories: null
      }



        
    render() {
        const {categories} = this.props.categories
      
        return (
            <div className="category-container">
            <p>Categories</p>
            <ul>
            {Object.keys(categories).map((name) => (
                <li key={name} >
                 {<Link to={`/category/${categories[name]}`}>{categories[name]}</Link>}
                </li>
              ))}
           



            </ul>
          
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
        getCategories: (data) => dispatch(getAllCategory())
        }
    }
  
    export default withRouter(connect(
     mapStateToProps,mapDispatchToProps
    )(CategoryList))
