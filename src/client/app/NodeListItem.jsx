import React from 'react';
import prettyNumber from './Utils';

class NodeListItem extends React.Component {
  constructor(props) {
    super(props);
    this.isMaster.bind(this);
    this.isData.bind(this);
  }

  isMaster() {
    return this.props.node.settings.node.master == 'true';
  }

  isData() {
    return this.props.node.settings.node.data == 'true';
  }

  render() {
    var performance_info = 'Loading...';
    if (this.props.performance) {
      var percentFileDescriptors = this.props.performance.process.open_file_descriptors / this.props.node.process.max_file_descriptors * 100;
      performance_info = <table>
        <tbody>
          <tr>
            <td>Heap</td>
            <td className={this.props.performance.jvm.mem.heap_used_percent>80 ? 'red': ''}>{this.props.performance.jvm.mem.heap_used_percent + "%"}</td>
          </tr>
          <tr>
            <td>Load Avg</td>
            <td>{this.props.performance.os.load_average[0]}</td>
          </tr>
          <tr>
            <td>HD Free</td>
            <td className={this.props.performance.fs.total.available_in_bytes<10000000000 ? 'red': ''}>{Math.round(this.props.performance.fs.total.available_in_bytes / 1000000000)}gb</td>
          </tr>
          <tr>
            <td>Open Files</td>
            <td className={percentFileDescriptors>80 ? 'red': ''} title={this.props.performance.process.open_file_descriptors}>{Math.round(percentFileDescriptors*1000)/1000} %</td>
          </tr>
          <tr>
            <td>Indices</td>
            <td>{prettyNumber(this.props.performance.indices.docs.count)}</td>
          </tr>
        <tr>
            <td>Segments</td>
            <td>{prettyNumber(this.props.performance.indices.segments.count)}</td>
          </tr>
        </tbody>
      </table>;
    }
    performance_info = <div>{performance_info}</div>;

    return (
      <div style={{float: 'left', width: '150px'}} className={this.isMaster() ? 'master' : this.isData() ? 'data' : 'client'}>
        <b>{this.props.node.name}</b>&nbsp;
        {performance_info}
      </div>
    );
  }

}

export default NodeListItem;