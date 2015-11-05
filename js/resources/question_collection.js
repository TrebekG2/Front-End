import Backbone from 'backbone';
import QuestionModel from './user_model';

let QuestionCollection = Backbone.Collection.extend({

  url: 'https://api.parse.com/1/classes/questions',
  model: QuestionModel,
  parse: function(data) {
    return data.results;
  }

});

export default QuestionCollection;