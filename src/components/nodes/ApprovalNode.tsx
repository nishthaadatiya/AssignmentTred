import { Handle, Position } from 'reactflow';

export const ApprovalNode = ({ data }: any) => {
  return (
    <div className={`node approval-node ${data.hasError ? 'node-error' : ''}`}>
      <Handle type="target" position={Position.Top} />
      <div className="node-label">{data.title || data.label}</div>
      {data.assignee && <div className="node-meta">Approver: {data.assignee}</div>}
      {data.hasError && <div className="error-indicator">!</div>}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};
