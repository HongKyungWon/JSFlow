import React, { Component } from 'react';

class Control extends Component {
    render() { // class에 속한 function은 생략 가능하다.
      return (
        <ul>
        <li><a href ="/create" onClick = {function(e){
          e.preventDefault();
          this.props.onChangeMode('create');
        }.bind(this)}>create</a></li>
        <li><a href = "/update" onClick = {function(e){
          e.preventDefault();
          this.props.onChangeMode('update');
        }.bind(this)}>update</a></li>
        <li><input type = "button" value = "delete" onClick = {function(e){
          e.preventDefault();
          this.props.onChangeMode('delete');
        }.bind(this)}></input></li>
      </ul>
      );
    }
  }
  
  export default Control;