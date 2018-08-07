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
					<li>Data nodes: {this.props.health.number_of_data_nodes}</li>
					<li>Primary shards: {this.props.health.active_primary_shards}</li>
					<li>Active shards: {this.props.health.active_shards}</li>
				</ul>
				<ul className="cluster-stats">
					<li className={this.props.health.number_of_pending_tasks > 150 ? 'text-danger': ''}>Pending tasks: {this.props.health.number_of_pending_tasks}</li>
					<li>Relocating shards: {this.props.health.relocating_shards}</li>
					<li>Unassigned shards: {this.props.health.unassigned_shards}</li>
				</ul>
			</div>
		);
	}

});


module.exports = ClusterHealth;
