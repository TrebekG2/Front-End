import React from 'react';

export default React.createClass({
  
  processUser(user) {

    return (
      <div key={user.objectId}>
        <p>{user.name}</p>
      </div>
    );

  },

  processData(data) {

    return data.map(this.processUser);

  },

  render() {
    
    let data = this.props.users;

    return (
      <div>
        {this.processData(data)}
      </div>
    );
  }

});