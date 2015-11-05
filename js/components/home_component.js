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
              <h1 className='flip-game'>Trebek</h1>
              <div className='btn'>
                <button className='sign-in' onClick={this.SignInHandler}>Sign In</button>
                <button className='register' onClick={this.RegisterHandler}>Register</button>
              </div>
              <hr/>
            </header>
        </div>
      
    );
  }
});

export default HomePage;