import React from 'react';
export default React.createClass({
  
  
  getInitialState () {

    return ({

      question: this.props.cardData.question,
      answer: this.props.cardData.answer,
      category: this.props.cardData.category

    });

  },


  updateQuestion (event) {

    let newQuestion = event.currentTarget.value;

    this.setState ({
      question: newQuestion
    });

  },


  updateAnswer (event) {

    let newAnswer = event.currentTarget.value;

    this.setState ({
      answer: newAnswer
    });

  },


  updateCategory (event) {

    let newCategory = event.currentTarget.value;

    this.setState ({
      category: newCategory
    });

  },

  submitEditHandler (event) {

    event.preventDefault();

    this.props.onSubmitClick(
      this.state.question,
      this.state.answer,
      this.state.category
    );

  },

  onBackHandler () {

    this.props.onBackClick();

  },
  

  render() {
    
    let cardData = this.props.cardData;

    return (
      <div className='edit-card-container'>
        <button
          onClick={this.onBackHandler}
          className='navigation-buttons'>
          Back to deck
        </button>
        <form className='edit-card-form'>
          <input 
            className='edit-question-input'
            onChange={this.updateQuestion}
            value={this.state.question}/>
          <input 
            className='edit-answer-input'
            onChange={this.updateAnswer}
            value={this.state.answer}/>
          <input 
            className='edit-category-input'
            onChange={this.updateCategory}
            value={this.state.category}/>
        </form>
        <button
          onClick={this.submitEditHandler}
          className='submit-edit-card-button'>
          Submit edits
        </button>
      </div>
    );
  }
});