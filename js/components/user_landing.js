import React from 'react';

export default React.createClass({
  
  editClickHandler () {

    alert('edit button was clicked');

  },


  processDecks(deck) {

    return (
      <div className='deck-select-block' key={deck.deckId}>
          <p>{deck.title}</p>
          <p>Topic: {deck.topic}</p>
          <button 
            onClick = {this.editClickHandler}
            className='edit-deck-button'>
            Edit this deck
          </button>
      </div>
    );

  },

  processData(data) {

    return data.map(this.processDecks);

  },

  render() {
    
    let data = this.props.decks;

    return (
      <div className='deck-block-container'>
        <h1>Choose one of your decks</h1>
        {this.processData(data)}
      </div>
    );
  }

});