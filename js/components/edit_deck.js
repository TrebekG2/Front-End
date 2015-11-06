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

    this.saveForm ({

      this.state.title,
      

    });

  },


  render() {
    return (
      <div>
        <form>
          <input 
            className='edit-title-input'
            onChange={this.changeTitleHandler}
            value={this.state.title}
        </form>
        <button
          onClick={this.onSubmitEdits}>
          Submit edits 
        </button>
      </div> 
    );
  }
});