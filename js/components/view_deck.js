
import React from 'react';

export default React.createClass({
  
  editClickHandler () {

    this.props.onEditClick();

  },

  addHandler () {

    this.props.onAddClick();

  },

//NEED TO CREATE THIS FUNCTION
  playClickHandler(){
    this.props.playDeck();
  },


  processCards(card) {

    return (
      <div className='deck-select-block' key={card.id}>
          <p>{card.question}</p>
          <p>{card.answer}</p>
          <button 
            onClick = {this.editClickHandler}
            className='edit-deck-button'>
            Edit this card
          </button>
      </div>
    );

  },

  processData(data) {

    return data.map(this.processCards);

  },

  BackClickHandler(){
    this.props.onBackClick();
  },

  render() {
    
    let data = this.props.cards;

    return (
      <div className='deck-block-container'>
        <h1>Choose one of the cards</h1>
        <button
          className='addcardBtn'
          onClick={this.addHandler}>
          Add a card
        </button>
        <button 
          className='back-btn'
          onClick={this.BackClickHandler}>
          Back
        </button>
        <hr/>
        {this.processData(data)}
      </div>
    );
  }

});



// add button that send them to the route with add question
// question
// answer
// id