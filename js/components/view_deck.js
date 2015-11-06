import React from 'react';

export default React.createClass({
  
  editClickHandler () {

    alert('edit button was clicked');

  },

  addHandler () {

    this.props.onAddClick();

  },


  processCards(card) {

    return (
      <div className='deck-select-block' key={card.id}>
          <p>{card.question}</p>
          <p>{card.answer}</p>
          <button 
            onClick = {this.editClickHandler}
            className='edit-deck-button'>
            View this card
          </button>
      </div>
    );

  },

  processData(data) {

    return data.map(this.processCards);

  },

  render() {
    
    let data = this.props.cards;

    return (
      <div className='deck-block-container'>
        <h1>Choose one of the cards</h1>
        <button
          onClick={this.addHandler}>
          Add a card
        </button>
        {this.processData(data)}
      </div>
    );
  }

});



// add button that send them to the route with add question
// question
// answer
// id