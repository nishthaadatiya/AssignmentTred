import { Handle, Position } from 'reactflow';

export const StartNode = ({ data }: any) => {
  return (
    <div className={`node start-node ${data.hasError ? 'node-error' : ''}`}>
      <div className="node-label">{data.label}</div>
      {data.hasError && <div className="error-indicator">!</div>}
      
      {/* Connection handles on all sides */}
      <Handle type="source" position={Position.Top} id="top" />
      <Handle type="source" position={Position.Bottom} id="bottom" />
      <Handle type="source" position={Position.Left} id="left" />
      <Handle type="source" position={Position.Right} id="right" />
    </div>
  );
};
