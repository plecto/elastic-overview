$ = jQuery = require('jquery');
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
			shardsList: "/_cat/shards/",
			clusterHealth: "/_cluster/health/",
			pendingTasks: "/_cluster/pending_tasks/",
			nodeListRefresh: 60,  // seconds
			nodePerformanceListRefresh: 60,
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
			'shardsPerformance': [],
			'pendingTasks': []
		};
	},
	
	componentDidMount: function() {
		var that = this;

		var nodesRequest = function () {
			$.get(that.state.rootUrl + that.props.nodeList, function (result) {
				that.setState({
					nodes: result.nodes
				});
				setTimeout(nodesRequest, that.props.nodeListRefresh * 1000);
			}.bind(that));
		};

		var nodesPerformanceRequest = function () {
			$.get(that.state.rootUrl + that.props.nodePerformanceList, function (result) {
				that.setState({
					nodesPerformance: result.nodes
				});
				setTimeout(nodesPerformanceRequest, that.props.nodePerformanceListRefresh * 1000);
			}.bind(that));
		};

		var shardsRequest = function () {
			$.get(that.state.rootUrl + that.props.shardsList, function (result) {
				var data = result.split('\n');
				data = data.map(function(line) {
					line = line.split(' ');
					var newLine = [];
					$.each(line, function(i, val) {
						if (val !== '') {
							newLine.push(val);
						}
					});
					return newLine;
				});

				var shardsPerNode = {};
				$.each(data, function(i, shard) {
					var docs = parseInt(shard[4]);
					var node = shard[7];
					if (node) {
						if (!shardsPerNode.hasOwnProperty(node)) {
							shardsPerNode[node] = {
								'shards_count': 0,
								'docs': 0,
							}
						}
						shardsPerNode[node]['shards_count'] += 1;
						shardsPerNode[node]['docs'] += docs;
					}
				});

				that.setState({
					shards: shardsPerNode
				});
			}.bind(that));
		};

		var healthRequest = function () {
			$.get(that.state.rootUrl + that.props.clusterHealth, function (result) {
				that.setState({
					clusterHealth: result
				});
				setTimeout(healthRequest, that.props.clusterHealthRefresh * 1000);
			}.bind(that));
		};

		var pendingTasksRequest = function () {
			$.get(that.state.rootUrl + that.props.pendingTasks, function (result) {
				that.setState({
					pendingTasks: result.tasks
				});
				setTimeout(pendingTasksRequest, that.props.pendingTasksRefresh * 1000);
			}.bind(that));
		};

		nodesRequest();
		nodesPerformanceRequest();
		shardsRequest();
		healthRequest();
		pendingTasksRequest();
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
				<ClusterHealth health={this.state.clusterHealth} />
				<NodeList nodes={this.state.nodes} performance={this.state.nodesPerformance} shards={this.state.shards} />
				<PendingTasks pendingTasks={this.state.pendingTasks} />
			</div>
		);
	}
});


ReactDOM.render(<App/>, document.getElementById('app'));
