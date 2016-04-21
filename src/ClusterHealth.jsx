var React = require('react');


var ClusterHealth = React.createClass({

	getDefaultProps: function() {
		return {
			'health': {}
		}
	},

	render: function () {
		if (!this.props.health) {
			return <div>Loading...</div>;
		}
		var clusterClass = 'cluster';
		clusterClass += ' cluster-health-'+this.props.health.status;
		return (
			<div className={clusterClass}>
				<h1 className="cluster-name">{this.props.health.cluster_name}</h1>
				<ul className="cluster-stats">
					<li>Relocating: {this.props.health.relocating_shards}</li>
					<li>Unassigned: {this.props.health.unassigned_shards}</li>
					<li className={this.props.health.number_of_pending_tasks > 150 ? 'text-danger': ''}>Pending tasks: {this.props.health.number_of_pending_tasks}</li>
				</ul>
			</div>
		);
	}

});


module.exports = ClusterHealth;
