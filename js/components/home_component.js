import React from 'react';


let HomePage = React.createClass({

  SignInHandler(){
    this.props.onSigninClick();
  },

  RegisterHandler(){
    this.props.onRegisterClick();
  },

  render() {
    return (
        <div className='home-page'>
            <header className='header-opt'>
              <h1>Trebek</h1>
              <hr/>
              <div className='btn'>
                <button className='sign-in' onClick={this.SignInHandler}>Sign In</button>
                <button className='register' onClick={this.RegisterHandler}>Register</button>
              </div>
              <div className='home-pic-container'>
                <img className='home-pic'
                src='http://i.huffpost.com/gen/1800873/images/o-ALEX-TREBEK-facebook.jpg'/>
                <p className='home-greet'>Let's find out what you know</p>
              </div>
            </header>
        </div>
      
    );
  }
});

export default HomePage;