import { Handle, Position } from 'reactflow';

export const AutomatedNode = ({ data }: any) => {
  return (
    <div className={`node automated-node ${data.hasError ? 'node-error' : ''}`}>
      <Handle type="target" position={Position.Top} />
      <div className="node-label">{data.title || data.label}</div>
      {data.automationId && <div className="node-meta">Automated Action</div>}
      {data.hasError && <div className="error-indicator">!</div>}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};
