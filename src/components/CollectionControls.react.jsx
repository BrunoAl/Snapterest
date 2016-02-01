var React = require('react');
var Header = require('./Header.react.jsx');
var Button = require('./Button.react.jsx');
var CollectionRenameForm = require('./CollectionRenameForm.react.jsx');
var CollectionExportFrom = require('./CollectionExportForm.react.jsx');

var CollectionControls = React.createClass({

  getInitialState: function() {
    return {
      name: 'new',
      isEditingName: false
    };
  },

  getHeaderText: function() {
    var numberOfTweetsInCollection = this.props.numberOfTweetsInCollection
    var text = numberOfTweetsInCollection;

    if(numberOfTweetsInCollection === 1) {
      text = text + ' tweet in your';
    } else {
      text = text + ' tweets in your';
    }

    return (
      <span>
        {text} <strong>{this.state.name}</strong> collection
      </span>
    );
  },

  toggleEditCollectionName: function() {
    this.setState({
      isEditingName: !this.state.isEditingName
    });
  },

  setCollectionName: function(name) {
    this.setState({
      name: name,
      isEditingName: false
    });
  },

  render: function() {

    if(this.state.isEditingName) {
      return(
        <CollectionRenameForm
          name={this.state.name}
          onChangeCollectionName={this.setCollectionName}
          onCancelCollectionNameChange={this.toggleEditCollectionName}
        />
      );
    }

    return (
      <div>
        <Header text={this.getHeaderText()} />

        <Button
          label='Rename collection'
          handleClick={this.toggleEditCollectionName}
        />
        <Button
          label='Empty collection'
          handleClick={this.props.onRemoveAllTweetsFromCollection}
        />
        <CollectionExportFrom htmlMarkup={this.props.htmlMarkup} />
      </div>
    );
  }
});

module.exports = CollectionControls;
