import React from 'react';

export default React.createClass({

  getStatus() {
    let user = this.props.user;
    if (user) {
      let name = user.FirstName;
      let mesg = `Welcome ${name}`;
      return (
        <span>{mesg}</span>
      );
    } else {
      return (
        <span>You are not logged in</span>
      );
    }
  },

  isLoggedIn() {
    return !!this.props.user;
  },

  getButton() {
    if(this.isLoggedIn()) {
      return (
        <button onClick={this.props.onLogoutClick}>
          Log out
        </button>
      );
    } else {
      return (
        <button onClick={this.props.onLoginClick}>
          Log in
        </button>
      );
    }
  },

  render() {
    return (
      <div>
        <div>{this.getStatus()}</div>
        {this.getButton()}
      </div>
    );
  }

}); 

