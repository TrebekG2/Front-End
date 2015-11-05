import Backbone from 'backbone';

let QuestionModel = Backbone.Model.extend({

  urlRoot: 'https://api.parse.com/1/classes/questions',
  idAttribute: 'objectId'

});

export default QuestionModel;