var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var AppActions = {
	defaultAction: function(elem) {
		AppDispatcher.handleAction({
			actionType: AppConstants.DEFAULT_ACTION,
			elem: elem
		});
	}
};

module.exports = AppActions;