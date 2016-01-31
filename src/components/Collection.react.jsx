var React = require('react');
var ReactDOMServer = require('react-dom/server');
var CollectionControls = require('./CollectionControls.react.jsx');
var TweetList = require('./TweetList.react.jsx');
var Header = require('./Header.react.jsx');

var Collection = React.createClass({

  createHtmlMarkupStringOfTweetList: function() {
    var htmlString = ReactDOMServer.renderToStaticMarkup(
      <TweetList tweets={this.props.tweets} />
    );

    var htmlMarkup = {
      html: htmlString
    };

    return JSON.stringify(htmlMarkup);
  },

  getListOfTweetIds: function() {
    return Object.keys(this.props.tweets);
  },

  getNumberOfTweetsInCollection: function() {
    return this.getListOfTweetIds().length;
  },

  render: function() {
    var numberOfTweetsInCollection = this.getNumberOfTweetsInCollection();

    if(numberOfTweetsInCollection > 0) {

      var tweets = this.props.tweets;
      var htmlMarkup = this.createHtmlMarkupStringOfTweetList();
      var removeAllTweetFromCollection = this.props.onRemoveAllTweetsFromCollection;
      var handleRemoveTweetFromCollection = this.props.onRemoveTweetFromCollection;

      return (
        <div>

          <CollectionControls
           numberOfTweetsInCollection={numberOfTweetsInCollection}
           htmlMarkup={htmlMarkup}
           onRemoveAllTweetsFromCollection={handleRemoveTweetFromCollection} />
        </div>
      );
    }
    return (
      <Header text='Your colleciton is empty' />
    );
  }
});

module.exports = Collection;
