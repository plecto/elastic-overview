var React = require('react');
var Utils = require('./Utils.js');


var NodeListItem = React.createClass({

	getDefaultProps: function() {
		return {
			'node': {},
			'performance': null
		}
	},

	isMaster: function() {
		return this.props.node.settings.node.master == 'true';
	},

	isData: function() {
		return this.props.node.settings.node.data == 'true';
	},

	render: function() {
		var performanceInfo = 'Loading...';
		if (this.props.performance) {
			var percentFileDescriptors = this.props.performance.process.open_file_descriptors / this.props.node.process.max_file_descriptors * 100;
			performanceInfo = <table>
				<tbody>
				<tr>
					<td>Heap</td>
					<td className={this.props.performance.jvm.mem.heap_used_percent>80 ? 'bg-danger': ''}>{this.props.performance.jvm.mem.heap_used_percent + "%"}</td>
				</tr>
				<tr>
					<td>Load Avg</td>
					<td>{this.props.performance.os.load_average[0]}</td>
				</tr>
				<tr>
					<td>HD Free</td>
					<td className={this.props.performance.fs.total.available_in_bytes<10000000000 ? 'bg-danger': ''}>{Math.round(this.props.performance.fs.total.available_in_bytes / 1000000000)}gb</td>
				</tr>
				<tr>
					<td>Open Files</td>
					<td className={percentFileDescriptors>80 ? 'bg-danger': ''}
						title={this.props.performance.process.open_file_descriptors}>{Math.round(percentFileDescriptors * 1000) / 1000}
						%
					</td>
				</tr>
				<tr>
					<td>Indices</td>
					<td>{Utils.prettyNumber(this.props.performance.indices.docs.count)}</td>
				</tr>
				<tr>
					<td>Segments</td>
					<td>{Utils.prettyNumber(this.props.performance.indices.segments.count)}</td>
				</tr>
				</tbody>
			</table>;
		}
		var nodeType = this.isMaster() ? 'master' : this.isData() ? 'data' : 'client';
		var nodeClass = 'node';
		nodeClass += ' node-type-'+nodeType;

		return (
			<div className={nodeClass}>
				<div className="node-inner">
					<div className="node-header">
						<div className="node-type">{nodeType}</div>
						<div className="node-name">{this.props.node.name}</div>
					</div>
					<div className="node-content">
						{performanceInfo}
					</div>
				</div>
			</div>
		);
	}

});


module.exports = NodeListItem;
