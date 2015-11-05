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
import HomePage from './components/home_component';
import Landing from './components/landing_component';
// import EditDeckForm from './components/edit_deck';

import UserModel from './resources/user_model';
import UserCollection from './resources/user_collection';

import QuestionModel from './resources/question_model';
import QuestionCollection from './resources/question_collection';


let Router = Backbone.Router.extend({

  routes: {

    ''           : 'home',
    'login'      : 'testlogin',
    'signup'     : 'signup',
    'landing'    : 'landing',
    'nonExistant':'redirect',
    'addquestion': 'showAddQuestion',
    'userLanding' : 'showUserLanding',
    'editdeck' : 'showEditDeck'

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
      onRegisterClick={()=>this.goto('signup')}/>, document.querySelector('.app')
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
            console.log(Cookies.getJSON('users'));
            // alert(' NEW USER ADDED IN RAILS SUCCESSFULLY');

            $.ajaxSetup ({
              headers: {
                access_token: data.access_token,
                name: data.name,
                username: data.username
                // add other data
              }
            });

            this.goto('userLanding');
            // this.goto(`user/${data.username}`)

          }).fail(() => {
            $('.app'.html('oops'))
          })

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
      },{
        deckId: '3',
        title: 'Games Deck',
        topic: 'games stuff'
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
              alert(' NEW DECK HAS BEEN CREATED AND GIVEN A TITLE');
              this.goto('');

            });


            $.ajaxSetup ({
              headers: {
                access_token: data.access_token
              }
            });

        }}/>
      </div>, document.querySelector('.app')
    ); 

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

  showEditDeck () {

    // ReactDom.render (

    //   <EditDeckForm/>,
    //   document.querySelector('.app')
    // );


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