import Backbone from 'backbone';
import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';
import Cookies from 'js-cookie';


import TestComponent from './components/test_component';
import AddFormComponent from './components/add_question';
import SignupPage from './components/signup_component';

import SigninPage from './components/signIn_component';

import UserLandingComponent from './components/user_landing';
import CreateDeckComponent from './components/create_deck';
import HomePage from './components/home_component';
import Landing from './components/landing_component';
// import EditDeckForm from './components/edit_deck';
import ViewDeckComponent from './components/view_deck';

import UserModel from './resources/user_model';
import UserCollection from './resources/user_collection';

import QuestionModel from './resources/question_model';
import QuestionCollection from './resources/question_collection';


let Router = Backbone.Router.extend({

  routes: {

    ''                 : 'home',
    'login'            : 'testlogin',
    'signup'           : 'signup',
    'landing'          : 'landing',
    'nonExistant'      :'redirect',
    'addquestion/:id'  : 'showAddQuestion',
    'userLanding'      : 'showUserLanding',
    'user/:name'       : 'showSpecificUser',
    'editdeck/:id'     : 'showEditDeck',
    'viewdeck/:id'     : 'showViewDeck',
    'signin'           : 'signin',

  },

  start() {
    Backbone.history.start();
  },

  goto (route) {
    this.navigate ( route ,{trigger: true});
  },

  redirect () {

    this.goto('userLanding' , {trigger : true , replace : true});

  },

   home () {
    ReactDom.render(
      <HomePage
      onSigninClick={()=>this.goto('login')}
      onRegisterClick={()=>this.goto('signup')}/>,
      document.querySelector('.app')
    );
   },


  signup () {
    ReactDom.render(
      <SignupPage 
        onCancelClick={ () =>this.goto('')}
        onSubmitClick={ () =>{
          let newUserName = document.querySelector('.newUserName').value;
          let newUserID   = document.querySelector('.newUserID').value;
          let newPass     = document.querySelector('.passcode').value;
          let newEmail    = document.querySelector('.emailAdd').value;
        
          let request = $.ajax({
            url :'https://nameless-plains-2123.herokuapp.com/signup',
            method:'POST',
             
            data:{
              name     :newUserName,
              password :newPass,
              username :newUserID,
              email    :newEmail
            }
          });

          request.then((data) => {
            Cookies.set('users', data);

            $.ajaxSetup ({
              headers: {
                access_token: data.access_token,
                name: data.name,
                username: data.username
                // add other data
              }
            });

            let userObject = Cookies.getJSON('users');
            console.log(userObject)

            this.goto(`user/${userObject.name}`);
            // this.goto(`user/${data.username}`)

          }).fail(() => {
            $('.app').html('oops');
          });

        }}/>, document.querySelector('.app')
    );
  },

  signin () {
    ReactDom.render(
      <SigninPage 
        onCancelClick={ () =>this.goto('')}
        onClickSignin={ () =>{},
        
          request.then((data) => {
            Cookies.set('users', data);
            console.log(Cookies.getJSON('users'));
            alert(' Welcome Back!');
            this.goto('');
          })

        }/>, document.querySelector('.app')
    );
  },

  showUserLanding () {

    let request = $.ajax({
      url :'https://nameless-plains-2123.herokuapp.com/deck',
      method:'GET'
    });

    request.then((data) => {
      Cookies.set('decks', data);
      // console.log(Cookies.getJSON('decks'));
      // this.goto('userLanding');

      $.ajaxSetup ({
        headers: {
          access_token: data.access_token
        }
      });
    });
  

    ReactDom.render (
      <div>
        <UserLandingComponent
          decks = {Cookies.getJSON('decks')}
          onViewClick = {(id) => this.goto(`viewdeck/${id}`)}/>
        <CreateDeckComponent
          onSubmitNewDeck = {() => {
            let newDeckTitle = document.querySelector('.new-deck-title-input').value;
            alert('A new deck has been created');
       
            let request = $.ajax({
              url :'https://nameless-plains-2123.herokuapp.com/deck/create',
              method:'POST',
              data: {
                title     : newDeckTitle
              }
            });

            request.then((data) => {
              Cookies.set('return', data);
              console.log(Cookies.getJSON('return'));
              // alert(' NEW DECK HAS BEEN CREATED AND GIVEN A TITLE');
              this.goto('userLanding');


              $.ajaxSetup ({
                headers: {
                  access_token: data.access_token
                }
              });

            });          

        }}/>
      </div>, document.querySelector('.app')
    ); 

  },


  showSpecificUser (id) {

    // need to pass id or name to this function
    // request decks by user id

    let request = $.ajax({
      url :'https://nameless-plains-2123.herokuapp.com/deck',
      method:'GET'
    });

    request.then((data) => {
      Cookies.set('decks', data);
      // console.log(Cookies.getJSON('decks'));
      // this.goto('userLanding');

      $.ajaxSetup ({
        headers: {
          access_token: data.access_token
        }
      });
    });
  

    ReactDom.render (
      <div>
        <UserLandingComponent
          decks = {Cookies.getJSON('decks')}
          onViewClick = {(id) => this.goto(`viewdeck/${id}`)}/>
        <CreateDeckComponent
          onSubmitNewDeck = {() => {
            let newDeckTitle = document.querySelector('.new-deck-title-input').value;
            alert('A new deck has been created');
       
            let request = $.ajax({
              url :'https://nameless-plains-2123.herokuapp.com/deck/create',
              method:'POST',
              data: {
                title     : newDeckTitle
              }
            });

            request.then((data) => {
              Cookies.set('return', data);
              console.log(Cookies.getJSON('return'));
              // alert(' NEW DECK HAS BEEN CREATED AND GIVEN A TITLE');
              let userObject = Cookies.getJSON('users');
              this.goto(`user/${userObject.name}`);

              $.ajaxSetup ({
                headers: {
                  access_token: data.access_token
                }
              });

            });          

        }}/>
      </div>, document.querySelector('.app')
    ); 

  },

  showViewDeck (id) {

    let request = $.ajax({
      url :`https://nameless-plains-2123.herokuapp.com/deck/${id}/cards`,
      method:'GET'
    });

    request.then((data) => {
      Cookies.set('cards', data);

      console.log(Cookies.getJSON('cards'));
      // this.goto('userLanding');

      $.ajaxSetup ({
        headers: {
          access_token: data.access_token
        }
      });
    });


    ReactDom.render(
      <ViewDeckComponent
        cards = {Cookies.getJSON('cards')}
        onEditClick = {(id) => {this.goto(`editdeck/${id}`)}}
        onAddClick = {(id) => this.goto(`addquestion/${id}`)}/>,
      document.querySelector('.app')
    );


  },

  showEditDeck (id) {

    // let request = $.ajax({

    //   url :'https://nameless-plains-2123.herokuapp.com/question',
    //   method:'POST',
    //   data: {
    //     question   : newQuestion.question,
    //     answer     : newQuestion.answer,
    //     category   : newQuestion.category}
    //   });


    // ReactDom.render (

    //   <EditDeckForm/>,
    //   document.querySelector('.app')
    // );


  },


  showAddQuestion (id) {

    ReactDom.render (
      <AddFormComponent
      onSubmitQuestion = {(question, answer, category) => {
        
        let newQuestion = document.querySelector('.question-input').value;
        let newAnswer = document.querySelector('.answer-input').value;
        let newCategory = document.querySelector('.category-input').value;

        let baseUrl = 'https://nameless-plains-2123.herokuapp.com/deck/'

        let request = $.ajax({
          url: `baseUrl${id}/cards`,
          method:'POST',
          data: {
            question   : newQuestion,
            answer     : newAnswer,
            category   : newCategory}
        });

        request.then((data) => {
          Cookies.set('newcard', data);
          console.log(Cookies.getJSON('newcard'));
          this.goto(`addquestion/${id}`);

          $.ajaxSetup({
            headers: {
              access_token: data.access_token
            }
          });

        });

      }}/>,
      document.querySelector('.app')
    );


  },

  // login () {

  //   let request = $.ajax({

  //     url: 'http://localhost:3000/login',
  //     method: 'POST',
  //     data: {
  //       user: {
  //         username: {data.username},
  //         password: {data.password},
  //       }
  //     }

  //   });

  // }


});

export default Router;