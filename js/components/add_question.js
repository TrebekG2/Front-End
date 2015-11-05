import React from 'react';

export default React.createClass({
  
  addQuestion () {

    let newQuestion = event.currentTarget.value;

    this.setState({
      question: newQuestion
    });

  },


  // submitLogin () {

  //   this.props.onSubmitForm(this.state.username);

  // },


  render() {
    return (
      <div>
        <h1>This is the add form page</h1>
        <div className='add-q-form-container'>
          <form>
            <label className='add-form-label'>
              Question
              <input 
                className='question-input' 
                placeholder='create a question'
                onChange={this.addQuestion}/>
            </label>
            <label className='add-form-label'>
              Answer
              <input 
                className='answer-input' 
                type='email' 
                placeholder='create a one-word answer'/>
            </label>
            <label className='add-form-label'>
              Category
              <input 
                className='category-input' 
                placeholder='creat a one-word category e.g., sports'/>
            </label>
            <button 
              onClick={this.submitLogin}
              className='add-form-button'>
              Submit new question
            </button>
            <button className='add-form-button'>
              You're awesome. Submit another question?
            </button>
          </form>
        </div>
      </div>
    );
  }
});