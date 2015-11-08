import React from 'react';
export default React.createClass({
  
  
  getInitialState () {

    return ({

      question: this.props.cardData.question,
      answer: this.props.cardData.answer

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

  submitEditHandler (event) {

    event.preventDefault();

    this.props.onSubmitClick(
      this.state.question,
      this.state.answer
    );

  },
  

  render() {
    
    let cardData = this.props.cardData;

    return (
      <div className='edit-card-container'>
        <form className='edit-card-form'>
          <input 
            className='edit-question-input'
            onChange={this.updateQuestion}
            value={this.state.question}/>
          <input 
            className='edit-answer-input'
            onChange={this.updateAnswer}
            value={this.state.answer}/>
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