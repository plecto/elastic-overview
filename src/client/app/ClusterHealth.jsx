import React from 'react';
import prettyNumber from './Utils';

export default class ClusterHealth extends React.Component {

  render() {
      if (!this.props.health) {
          return <div>Loading...</div>;
      }
    return (
      <div>
        <h1 className={this.props.health.status}>{this.props.health.cluster_name}</h1>
          <div>Relocating: {this.props.health.relocating_shards}</div>
          <div>Unassigned: {this.props.health.unassigned_shards}</div>
          <div className={this.props.health.number_of_pending_tasks>150 ? 'red': ''}>Pending tasks: {this.props.health.number_of_pending_tasks}</div>
      </div>
    );
  }

}
