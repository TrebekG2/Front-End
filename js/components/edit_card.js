import React from 'react';
export default React.createClass({
  
  
  render() {
    
    let cardData = this.props.cardData;

    return (
      <div>
        <input value={cardData.question}/>
      </div>
    );
  }
});