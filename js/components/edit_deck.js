import React from 'react';
import $ from 'jqeury';


export default React.createClass({
  

  getInitialState (id) {

    this.props.


  },


  changeTitleHandler (event) {

    let newTitle = event.currentTarget.value;

    this.setState ({

      title: newTitle;

    });

  },


  onSubmitEdits () {



    });

  },


  render() {
    return (
      <div>
        <form>
          <input 
            className='edit-question-input'
            onChange={this.changeTitleHandler}
            value={this.state.title}/>
          <input 
            className='edit-answer-input'
            onChange={this.changeTitleHandler}
            value={this.state.title}/>
          <p className='category-name'>
            {this.}
        </form>
        <button
          onClick={this.onSubmitEdits}>
          Submit edits 
        </button>
      </div> 
    );
  }
});