import React from 'react';

export default React.createClass({
  
  editClickHandler () {

    alert('edit button was clicked');

  },


  processDecks(deck) {

    return (
      <div className='deck-select-block' key={deck.id}>
          <p>{deck.title}</p>
          <button 
            onClick = {this.editClickHandler}
            className='edit-deck-button'>
            View this deck
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