import React from 'react';

export default React.createClass({
  
  processDecks(deck) {

    return (
      <div className='deck-block-container' key={deck.deckId}>
        <div className='deck-select-block'>
          <p>{deck.title}</p>
          <p>Topic: {deck.topic}</p>
        </div>
      </div>
    );

  },

  processData(data) {

    return data.map(this.processDecks);

  },

  render() {
    
    let data = this.props.decks;

    return (
      <div>
        <h1>Choose one of your decks</h1>
        {this.processData(data)}
      </div>
    );
  }

});