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
				{Object.keys(this.props.nodes).sort(function(a, b) {
					var nodeA = that.props.nodes[a];
					var nodeB = that.props.nodes[b];
					var scoreA = nodeA.settings.node.data === 'true' ? 2 : nodeA.settings.node.master === 'true' ? 1 : 0;
					var scoreB = nodeB.settings.node.data === 'true' ? 2 : nodeB.settings.node.master === 'true' ? 1 : 0;
					return scoreB - scoreA;
				}).map(function(nodeName, node) {
					var nodeId = that.props.nodes[nodeName].name;
					return <NodeListItem
						key={nodeName}
						node={that.props.nodes[nodeName]}
						performance={that.props.performance ? that.props.performance[nodeName] : null}
						shards={that.props.shards ? that.props.shards[nodeId] : {}}
					/>
				})}
			</div>
		);
	}

});


module.exports = NodeList;
