var AppStore = require('../stores/AppStore');
var AppActions = require('../actions/AppActions');

var App = React.createClass({
	getInitialState: function() {
		return AppStore.getData();
	},
	render: function() {
		AppActions.defaultAction(false);
		return(
			<h1>Hello World! Default: { this.state.default.toString() }</h1>
		);
	}
});

module.exports = App;