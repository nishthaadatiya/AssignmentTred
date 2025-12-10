import { Handle, Position } from 'reactflow';

export const EndNode = ({ data }: any) => {
  return (
    <div className={`node end-node ${data.hasError ? 'node-error' : ''}`}>
      <div className="node-label">{data.label}</div>
      {data.hasError && <div className="error-indicator">!</div>}
      
      {/* Connection handles on all sides */}
      <Handle type="target" position={Position.Top} id="top" />
      <Handle type="target" position={Position.Bottom} id="bottom" />
      <Handle type="target" position={Position.Left} id="left" />
      <Handle type="target" position={Position.Right} id="right" />
    </div>
  );
};
