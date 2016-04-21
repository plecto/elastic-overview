var React = require('react');
var NodeListItem = require('./NodeListItem.jsx');


var NodeList = React.createClass({

	getDefaultProps: function() {
		return {
			'nodes': {},
			'performance': {}
		}
	},

	render() {
		var that = this;
		return (
			<div className="node-list">
				{Object.keys(this.props.nodes).map(function(nodeName, i) {
					return <NodeListItem
						key={nodeName}
						node={that.props.nodes[nodeName]}
						performance={that.props.performance ? that.props.performance[nodeName] : null}
					/>
				})}
			</div>
		);
	}

});


module.exports = NodeList;
