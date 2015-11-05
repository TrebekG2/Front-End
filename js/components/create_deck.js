import React from 'react';
export default React.createClass({
  
  createDeckHandler () {

    this.props.onSubmitNewDeck();

  },

  render() {
    return (
      <div>
        <form>
          <label>Deck Title</label>
          <input className='new-deck-title-input' type='text' placeholder='enter a deck title'/>
        </form>
        <button
          onClick={this.createDeckHandler}>
          Create new deck
        </button>
      </div>
    );
  }
});