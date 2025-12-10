import { Handle, Position } from 'reactflow';

export const AutomatedNode = ({ data }: any) => {
  return (
    <div className={`node automated-node ${data.hasError ? 'node-error' : ''}`}>
      <div className="node-label">{data.title || data.label}</div>
      {data.automationId && <div className="node-meta">Automated Action</div>}
      {data.hasError && <div className="error-indicator">!</div>}
      
      {/* Connection handles on all sides */}
      <Handle type="target" position={Position.Top} id="target-top" />
      <Handle type="target" position={Position.Bottom} id="target-bottom" />
      <Handle type="target" position={Position.Left} id="target-left" />
      <Handle type="target" position={Position.Right} id="target-right" />
      
      <Handle type="source" position={Position.Top} id="source-top" />
      <Handle type="source" position={Position.Bottom} id="source-bottom" />
      <Handle type="source" position={Position.Left} id="source-left" />
      <Handle type="source" position={Position.Right} id="source-right" />
    </div>
  );
};
