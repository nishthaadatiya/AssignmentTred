import { useState, useEffect } from 'react';
import type { WorkflowNodeData, AutomationAction } from '../types/workflow';

interface ConfigPanelProps {
  selectedNode: any;
  onUpdate: (nodeId: string, data: WorkflowNodeData) => void;
  automations: AutomationAction[];
}

export const ConfigPanel = ({ selectedNode, onUpdate, automations }: ConfigPanelProps) => {
  const [formData, setFormData] = useState<WorkflowNodeData>({ label: '' });

  useEffect(() => {
    if (selectedNode) {
      setFormData(selectedNode.data);
    }
  }, [selectedNode]);

  if (!selectedNode) {
    return (
      <div className="config-panel">
        <div className="config-empty">
          <p>Select a node to configure</p>
        </div>
      </div>
    );
  }

  const handleChange = (field: string, value: any) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onUpdate(selectedNode.id, newData);
  };

  const selectedAutomation = automations.find(a => a.id === formData.automationId);

  return (
    <div className="config-panel">
      <h3>Configure Node</h3>
      <div className="config-form">
        <div className="form-group">
          <label>Label</label>
          <input
            type="text"
            value={formData.label || ''}
            onChange={(e) => handleChange('label', e.target.value)}
          />
        </div>

        {selectedNode.type !== 'start' && selectedNode.type !== 'end' && (
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

        {(selectedNode.type === 'task' || selectedNode.type === 'approval') && (
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

        {selectedNode.type === 'automated' && (
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
    </div>
  );
};
