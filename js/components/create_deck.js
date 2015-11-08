import React from 'react';
export default React.createClass({
  
  createDeckHandler () {

    this.props.onSubmitNewDeck();

  },

  render() {
    return (
      <div className='deck-block-container'>
        <form>
          <label>Deck Title</label>
          <input className='new-deck-title-input' type='text' placeholder='enter a deck title'/>
        </form>
        <button
          className='createNewDeck'
          onClick={this.createDeckHandler}>
          Create new deck
        </button>
      </div>
    );
  }
});