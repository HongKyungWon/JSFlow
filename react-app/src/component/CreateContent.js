import React, { Component } from 'react';

class CreateContent extends Component {
    render() {
      return(
        <article>
             <h2>Create</h2>
             <form action = "/create_process" method = "post"
             onSubmit = {function(e){
               e.preventDefault();
               this.props.onSubmit(
                 e.target.title.value,
                 e.target.desc.value
               ); // onSubmit()의 괄호 안에 어떻게 인자를 가져올까?
             }.bind(this)}
             >
              <p><input type = "text" name = "title"
               placeholder = "title"></input> </p>
               <p>
                 <textarea name = "desc"
                  placeholder = 'description'></textarea>
               </p>
               <p>
                 <input type = "submit"></input>
               </p>
             </form>
          </article>
      );
    }
  }

  export default CreateContent;