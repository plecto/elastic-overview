$ = jQuery = require('jQuery');
require('./styles.less');
var React = require('react');
var ReactDOM = require('react-dom');
var NodeList = require('./NodeList.jsx');
var ClusterHealth = require('./ClusterHealth.jsx');
var PendingTasks = require('./PendingTasks.jsx');


var App = React.createClass({
	
	getDefaultProps: function() {
		return {
			nodeList: "/_nodes/",
			nodePerformanceList: "/_nodes/stats/",
			clusterHealth: "/_cluster/health/",
			pendingTasks: "/_cluster/pending_tasks/",
			nodeListRefresh: 60,  // seconds
			nodePerformanceListRefresh: 30,
			clusterHealthRefresh: 10,
			pendingTasksRefresh: 10
		}
	},

	getInitialState: function() {
		return {
			'rootUrl': "http://localhost:9201",
			'clusterHealth': {},
			'nodes': {},
			'nodesPerformance': [],
			'pendingTasks': []
		};
	},
	
	componentDidMount: function() {
		var that = this;

		var nodes = function () {
			$.get(that.state.rootUrl + that.props.nodeList, function (result) {
				that.setState({
					nodes: result.nodes
				});
				setTimeout(nodes, that.props.nodeListRefresh * 1000);
			}.bind(that));
		};

		var performance = function () {
			$.get(that.state.rootUrl + that.props.nodePerformanceList, function (result) {
				that.setState({
					nodesPerformance: result.nodes
				});
				setTimeout(performance, that.props.nodePerformanceListRefresh * 1000);
			}.bind(that));
		};

		var health = function () {
			$.get(that.state.rootUrl + that.props.clusterHealth, function (result) {
				that.setState({
					clusterHealth: result
				});
				setTimeout(health, that.props.clusterHealthRefresh * 1000);
			}.bind(that));
		};

		var pendingTasks = function () {
			$.get(that.state.rootUrl + that.props.pendingTasks, function (result) {
				that.setState({
					pendingTasks: result.tasks
				});
				setTimeout(pendingTasks, that.props.pendingTasksRefresh * 1000);
			}.bind(that));
		};
		nodes();
		performance();
		health();
		pendingTasks();
	},

	handleRootUrlChange: function(e) {
		this.setState({
			'rootUrl': e.target.value
		})
	},

	render: function() {
		return (
			<div>
				<input type="text" onChange={this.handleRootUrlChange} value={this.state.rootUrl} className="input-root-url" />
				<ClusterHealth health={this.state.clusterHealth}/>
				<NodeList nodes={this.state.nodes} performance={this.state.nodesPerformance}/>
				<PendingTasks pendingTasks={this.state.pendingTasks}/>
			</div>
		);
	}
});


ReactDOM.render(<App/>, document.getElementById('app'));
