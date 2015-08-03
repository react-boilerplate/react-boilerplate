var AppStore = require('../stores/AppStore');
var AppActions = require('../actions/AppActions');

var App = React.createClass({
	getInitialState: function() {
		return AppStore.getData();
	},
	componentDidMount: function() {
		AppStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
		AppStore.removeChangeListener(this._onChange);
	},
	render: function() {
		AppActions.defaultAction(false);
		return(
			<h1>Hello World! Default: { this.state.default.toString() }</h1>
		);
	},
	_onChange: function() {
	    this.setState(AppStore.getData());
	}
});

module.exports = App;