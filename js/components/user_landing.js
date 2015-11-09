import React from 'react';

export default React.createClass({
  
  editClickHandler (id) {

    this.props.onViewClick(id);

  },

  deleteHandler (id) {

    this.props.onDeleteClick(id);

  },


  processDecks(deck) {

    return (
      <div className='deck-select-block' key={deck.id}>
          <p>{deck.title}</p>
          <button 
            onClick ={()=> {this.editClickHandler(deck.id)}}
            className='edit-deck-button'>
            View deck
          </button>
          <button 
            onClick ={()=> {this.deleteHandler(deck.id)}}
            className='delete-deck-button'>
            Delete deck
          </button>
      </div>
    );

  },

  processData(data) {

    return data.map(this.processDecks);

  },

  onLogoutClickHandler(){
    this.props.onLogoutClick();
  },

  render() {
    
    let data = this.props.decks;

    return (
      <div className='deck-block-container'>
        <h1>Choose one of your decks</h1>
        <button className='logout-btn' onClick={this.onLogoutClickHandler}>Logout</button>
        
        {this.processData(data)}        
      </div>
    );
  }

});