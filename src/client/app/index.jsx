import React from 'react';
import {render} from 'react-dom';
import NodeList from './NodeList.jsx';
import ClusterHealth from './ClusterHealth.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    var that = this;
    this.state = {nodes: {}, nodesPerformance: []};

    var nodes = function() {
      $.get(that.props.elasticSearchRoot + that.props.nodeList, function (result) {
        that.setState({
          nodes: result.nodes
        });
      }.bind(that));
      setTimeout(nodes, that.props.nodeListRefresh * 1000);
    };

    var performance = function() {
      $.get(that.props.elasticSearchRoot + that.props.nodePerformanceList, function (result) {
        that.setState({
          nodesPerformance: result.nodes
        });
      }.bind(that));
      setTimeout(performance, that.props.nodePerformanceListRefresh * 1000);
    };

    var health = function() {
      $.get(that.props.elasticSearchRoot + that.props.clusterHealth, function (result) {
        that.setState({
          clusterHealth: result
        });
      }.bind(that));
      setTimeout(health, that.props.clusterHealthRefresh * 1000);
    };
    setTimeout(nodes, 1);
    setTimeout(performance, 1);
    setTimeout(health, 1);
  };

  render () {
    return (
      <div>
        <ClusterHealth health={this.state.clusterHealth} />
        <NodeList nodes={this.state.nodes} performance={this.state.nodesPerformance} />
      </div>
    );
  }
}
App.defaultProps = {
  elasticSearchRoot: "http://localhost:9202",
  nodeList: "/_nodes/",
  nodeListRefresh: 60, // seconds
  nodePerformanceList: "/_nodes/stats/",
  nodePerformanceListRefresh: 30, //seconds
  clusterHealth: "/_cluster/health/",
  clusterHealthRefresh: 15 // seconds
};

render(<App/>, document.getElementById('app'));