import React from 'react';
import NodeListItem from './NodeListItem.jsx';

export default class NodeList extends React.Component {

  render() {
    return (
      <div>
        {Object.keys(this.props.nodes).map((nodeName, i) =>
          <NodeListItem key={i} node={this.props.nodes[nodeName]} performance={this.props.performance ? this.props.performance[nodeName] : null} />
        )}
      </div>
    );
  }

}

//export default NodeList;
