import React from 'react';

let Signup = React.createClass({

  SubmitClickHandler(){
    this.props.onSubmitClick();
  },

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

// let Signup = React.createClass({

//   SubmitClickHandler(){
//     this.props.onSubmitClick();
//   },

//   CancelClickHandler(){
//     this.props.onCancelClick();

//   },

  render() {
    return (
      <div>
      <form class="signInForm">
        <label>Sign In</label>
          <input type='text' placeholder='Enter Name' className='UserName'/>
        <label>User Name</label>
          <input type='text' placeholder='UserID' className='UserID'/>
        <label> Password</label>
          <input type='password' placeholder='Password' className='passcode'/>
        <label>Email</label>
          <input type='email' placeholder='Email' className='emailAdd'/>
      </form>
      <button>Sign Up</button>
      <button>Submit</button>
    </div>
      
    );
  }
});

export default Signin;