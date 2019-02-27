var React = require('react');


var PendingTasks = React.createClass({

	getDefaultProps: function() {
		return {
			'pendingTasks': []
		}
	},

	render: function () {
		if (!this.props.pendingTasks) {
			return <div>Loading...</div>;
		}
		return (
			<div className="tasks">
				<h3>Pending tasks</h3>
				<table className="tasks-table">
					<colgroup>
						<col width="20%" />
						<col width="20%" />
						<col width="60%" />
					</colgroup>
					<thead>
					<tr>
						<th>Priority</th>
						<th>Time in queue</th>
						<th>Source</th>
					</tr>
					</thead>
					<tbody>
					{this.props.pendingTasks.map(function(task, i) {
						return <tr key={i}>
							<td>{task.priority}</td>
							<td>{task.time_in_queue}</td>
							<td>{task.source}</td>
						</tr>
					})}
					</tbody>
				</table>
			</div>
		);
	}

});


module.exports = PendingTasks;
