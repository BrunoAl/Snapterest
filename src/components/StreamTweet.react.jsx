var React = require('react');
var ReactDOM = require('react-dom');
var Header = require('./Header.react.jsx');
var Tweet = require('./Tweet.react.jsx');

var StreamTweet = React.createClass({

  getInitialState: function() {
    console.log('[Snapterest] StreamTweet: 1. Running getInitialState()');

    return {
      numberOfCharactersInIncreasing: null,
      headerText: null
    };
  },

  componentWillMount: function() {
    console.log('[Snapterest] StreamTweet: 2. Running componentWillMount()');

    this.setState({
      numberOfCharactersInIncreasing: true,
      headerText: 'Latest public photo from Twitter'
    });

    window.snapterest = {
      numberOfReceivedTweets: 1,
      numberOfDisplayedTweets: 1
    };
  },

  componentDidMount: function() {
    console.log('[Snapterest] StreamTweet: 3. Running componentDidMount()');

    var componentDOMRepresentation = ReactDOM.findDOMNode(this);

    window.snapterest.headerHtml = componentDOMRepresentation.children[0].outerHTML;
    window.snapterest.tweetHtml = componentDOMRepresentation.children[1].outerHTML;
  },

  componentWillReceiveProps: function(nextProps) {
    console.log('[Snapterest] StreamTweet: 4. Running componentWillReceiveProps()');

    var currentTweetLength = this.props.tweet.length;
    var nextTweetLength = nextProps.tweet.text.length;
    var isNumberOfCharactersIsIncreasing = (nextTweetLength > currentTweetLength);
    var headerText;

    this.setState({
      numberOfCharactersIsIncreasing: isNumberOfCharactersIsIncreasing
    });

    if(isNumberOfCharactersIsIncreasing) {
      headerText = 'Number of character is increasing';
    } else {
      headerText = 'Latest public photo form Twitter';
    }

    this.setState({
      headerText: headerText
    });

    window.snapterest.numberOfReceivedTweets++;
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    console.log('[Snapterest] StreamTweet: 5. Running shouldComponentUpdate()');

    return (nextProps.tweet.text.length > 1);
  },

  componentWillUpdate: function(nextProps, nextState) {
    console.log('[Snapterest] StreamTweet: 6. Running componentWillUpdate()');
  },

  componentDidUpdate: function(prevProps, prevState) {
    console.log('[Snapterest] StreamTweet: 7. Running componentDidUpdate()');

    window.snapterest.numberOfDisplayedTweets++;
  },

  componentWillUnmount: function() {
    console.log('[Snapterest] StreamTweet: 8. Running componentWillUnmount()');

    delete window.snapterest;
  },

  render: function() {
    console.log('[Snapterest] StreamTweet: Running render()');

    return (
      <section>
        <Header text={this.state.headerText} />
        <Tweet
          tweet={this.props.tweet}
          onImageClick={this.props.onAddTweetToCollection} />
      </section>
    );
  }
});

module.exports = StreamTweet;
