import React from 'react';

let Signin = React.createClass({

  // getInitialState(
  //   return(
      
  //     let display =this.state.showRestart ? '' :'none';
  //     );
  //   ),

  SubmitClickHandler(){
    this.props.onClickSignin();
  },

  RegisterHandler(){
    this.props.onClickRegister();
  },

  // getStatus() {
  //   let user = this.props.user;
  //   if (user) {
  //     let name = user.FirstName;
  //     let mesg = `Welcome ${name}`;
  //     return (
  //       <span>{mesg}</span>
  //     );
  //   } else {
  //     return (
  //       <span>You are not logged in</span>
  //     );
  //   }
  // },

  // isLoggedIn() {
  //   return !!this.props.user;
  // },


  render() {
    return (
      <div className='signIn'>
        <h1>Trebek Welcomes You </h1>
        <form className="signInForm">
          <label>User Name</label>
          <input type='text' placeholder='User Name' className='UserID'/>
          <label>Password</label>
          <input type='password' placeholder='Password' className='password'/>
        </form>
        <div className='signin-form-btn'>
          <button className='signin-btn'onClick={this.SubmitClickHandler}>Sign In</button>
          <button className ='register-btn' onClick={this.RegisterHandler} >New User Registration</button>
        </div>
    </div>
      
    );
  }
});

export default Signin;