import React from 'react';
import Backbone from 'backbone';

export default React.createClass({
  
  addQuestion (event) {

    let newQuestion = event.currentTarget.value;

    this.setState({
      question: newQuestion
    });

  },

  addAnswer (event) {

    let newAnswer = event.currentTarget.value;

    this.setState({
      answer: newAnswer
    });

  },

  addCategory (event) {

    let newCategory = event.currentTarget.value;

    this.setState({
      category: newCategory
    });

  },

  submitNewQuestion () {

    this.props.onSubmitQuestion(
      this.state.question,
      this.state.answer,
      this.state.category
    );

  },


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
                placeholder='create a one-word answer'
                onChange={this.addAnswer}/>
            </label>
            <label className='add-form-label'>
              Category
              <input 
                className='category-input' 
                placeholder='creat a one-word category e.g., sports'
                onChange={this.addCategory}/>
            </label>
            <button 
              onClick={this.submitNewQuestion}
              className='add-form-button'>
              Submit new question
            </button>
            <button className='add-form-button'>
              Thank you
            </button>
          </form>
        </div>
      </div>
    );
  }
});