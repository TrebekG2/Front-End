import Backbone from 'backbone';
import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';
import Cookies from 'js-cookie';

import TestComponent from './components/test_component';
import AddFormComponent from './components/add_question';
import SignupPage from './components/signup_component';
import UserLandingComponent from './components/user_landing';
import CreateDeckComponent from './components/create_deck';

import UserModel from './resources/user_model';
import UserCollection from './resources/user_collection';

import QuestionModel from './resources/question_model';
import QuestionCollection from './resources/question_collection';


let Router = Backbone.Router.extend({

  routes: {
    '' : 'redirect',
    'login' : 'testlogin',
    'signup':'signup',
    'addquestion' : 'showAddQuestion',
    'userLanding' : 'showUserLanding'
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

  // home () {

  //   ReactDom.render(

  //     <TestComponent/>,
  //     document.querySelector('.app')

  //   );

  // },


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
            data: {
              name     : newUserName,
              password : newPass,
              username : newUserID,
              email    : newEmail}
          });

          request.then((data) => {
            Cookies.set('users', data);
            console.log(Cookies.getJSON('users'));
            alert(' NEW USER ADDED IN RAILS SUCCESSFULLY');
            this.goto('');

            // WILL NEED TO ADD HEADERS HERE WITH AJAX SETUP
            // headers: {Access-Token: {} }

          });

        }}/>, document.querySelector('.app')
    );
  },


  showUserLanding () {

    const DUMMY_DECKS = [
      {
        deckId: '1',
        title: 'Sports Deck',
        topic: 'sports stuff'
      },{
        deckId: '2',
        title: 'Movies Deck',
        topic: 'movies stuff'
      }
    ];

    console.log(DUMMY_DECKS);

    ReactDom.render (
      <div>
        <UserLandingComponent
          decks = {DUMMY_DECKS}/>
        <CreateDeckComponent
          onSubmitNewDeck = {() => {
          let newDeckTitle = document.querySelector('.new-deck-title-input').value;
          alert('A new deck has been created');
          }}/>
      </div>,
      document.querySelector('.app')
      );

        // let request = $.ajax({
        //     url :'https://nameless-plains-2123.herokuapp.com/deck/create',
        //     method:'POST',
        //     data: {
        //       title     : newDeckTitle}
        //   });

        //   request.then((data) => {
        //     Cookies.set('return', data);
        //     console.log(Cookies.getJSON('return'));
        //     alert(' NEW DECK HAS BEEN CREATED AND GIVEN A TITLE');
        //     this.goto('');

        // WILL NEED TO ADD HEADERS HERE WITH AJAX SETUP
        // headers: {Access-Token: {} }
        // });  

  },

  showAddQuestion () {

    ReactDom.render (
      <AddFormComponent
      onSubmitQuestion = {(question, answer, category) => {
        
        let newQuestion = new QuestionModel({
          question: question,
          answer: answer,
          category: category
        });

        // let request = $.ajax({
        //   url :'https://nameless-plains-2123.herokuapp.com/question',
        //   method:'POST',
        //   data: {
        //     question   : newQuestion.question,
        //     answer     : newQuestion.answer,
        //     category   : newQuestion.category}
        // });

        // request.then((data) => {
        //   Cookies.set('return', data);
        //   console.log(Cookies.getJSON('return'));
        //   alert(' NEW USER ADDED IN RAILS SUCCESSFULLY');
        //   this.goto('');
        // });

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