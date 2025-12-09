import { useState, useEffect } from 'react';
import type { WorkflowNodeData, AutomationAction } from '../types/workflow';

interface NodeEditModalProps {
  node: any;
  automations: AutomationAction[];
  onSave: (nodeId: string, data: WorkflowNodeData) => void;
  onClose: () => void;
}

export const NodeEditModal = ({ node, automations, onSave, onClose }: NodeEditModalProps) => {
  const [formData, setFormData] = useState<WorkflowNodeData>({ label: '' });

  useEffect(() => {
    if (node) {
      setFormData(node.data);
    }
  }, [node]);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(node.id, formData);
    onClose();
  };

  const selectedAutomation = automations.find(a => a.id === formData.automationId);

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="node-edit-modal">
        <div className="modal-header">
          <h2>Edit {node.type.charAt(0).toUpperCase() + node.type.slice(1)} Node</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="modal-content">
          <div className="form-group">
            <label>Label</label>
            <input
              type="text"
              value={formData.label || ''}
              onChange={(e) => handleChange('label', e.target.value)}
            />
          </div>

          {node.type !== 'start' && node.type !== 'end' && (
            <>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => handleChange('title', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => handleChange('description', e.target.value)}
                  rows={3}
                />
              </div>
            </>
          )}

          {(node.type === 'task' || node.type === 'approval') && (
            <>
              <div className="form-group">
                <label>Assignee</label>
                <input
                  type="text"
                  value={formData.assignee || ''}
                  onChange={(e) => handleChange('assignee', e.target.value)}
                  placeholder="email@example.com"
                />
              </div>

              <div className="form-group">
                <label>Due Date</label>
                <input
                  type="date"
                  value={formData.dueDate || ''}
                  onChange={(e) => handleChange('dueDate', e.target.value)}
                />
              </div>
            </>
          )}

          {node.type === 'automated' && (
            <>
              <div className="form-group">
                <label>Automation Action</label>
                <select
                  value={formData.automationId || ''}
                  onChange={(e) => handleChange('automationId', e.target.value)}
                >
                  <option value="">Select action...</option>
                  {automations.map((auto) => (
                    <option key={auto.id} value={auto.id}>
                      {auto.name}
                    </option>
                  ))}
                </select>
              </div>

              {selectedAutomation && (
                <div className="automation-params">
                  <h4>Parameters</h4>
                  {selectedAutomation.parameters.map((param) => (
                    <div key={param.name} className="form-group">
                      <label>{param.label} {param.required && '*'}</label>
                      {param.type === 'select' ? (
                        <select
                          value={formData.automationParams?.[param.name] || ''}
                          onChange={(e) => handleChange('automationParams', {
                            ...formData.automationParams,
                            [param.name]: e.target.value
                          })}
                        >
                          <option value="">Select...</option>
                          {param.options?.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={param.type}
                          value={formData.automationParams?.[param.name] || ''}
                          onChange={(e) => handleChange('automationParams', {
                            ...formData.automationParams,
                            [param.name]: e.target.value
                          })}
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-primary" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
};
