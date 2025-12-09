import { Handle, Position } from 'reactflow';

export const EndNode = ({ data }: any) => {
  return (
    <div className={`node end-node ${data.hasError ? 'node-error' : ''}`}>
      <Handle type="target" position={Position.Top} />
      <div className="node-label">{data.label}</div>
      {data.hasError && <div className="error-indicator">!</div>}
    </div>
  );
};
