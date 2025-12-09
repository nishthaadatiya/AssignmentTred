import { Handle, Position } from 'reactflow';

export const StartNode = ({ data }: any) => {
  return (
    <div className={`node start-node ${data.hasError ? 'node-error' : ''}`}>
      <div className="node-label">{data.label}</div>
      {data.hasError && <div className="error-indicator">!</div>}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};
