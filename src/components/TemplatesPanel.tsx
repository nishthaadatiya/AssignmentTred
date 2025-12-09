import { useState } from 'react';

interface Template {
  name: string;
  description: string;
  category: string;
  fileName: string;
}

interface TemplatesPanelProps {
  onLoadTemplate: (nodes: any[], edges: any[]) => void;
  onClose: () => void;
}

export const TemplatesPanel = ({ onLoadTemplate, onClose }: TemplatesPanelProps) => {
  const [loading, setLoading] = useState(false);

  const templates: Template[] = [
    {
      name: 'Complete Employee Onboarding',
      description: 'End-to-end onboarding workflow for new hires including documentation, IT setup, approvals, and training',
      category: 'HR Operations',
      fileName: 'employee-onboarding.json'
    },
    {
      name: 'Leave Request Workflow',
      description: 'Complete leave request and approval workflow with manager and HR approvals, calendar updates, and notifications',
      category: 'HR Operations',
      fileName: 'leave-request.json'
    },
    {
      name: 'Performance Review Cycle',
      description: 'Comprehensive annual performance review workflow including self-assessment, manager review, calibration, goal setting, and feedback',
      category: 'Performance Management',
      fileName: 'performance-review.json'
    }
  ];

  const loadTemplate = async (fileName: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/src/templates/${fileName}`);
      const template = await response.json();
      onLoadTemplate(template.nodes || [], template.edges || []);
      onClose();
    } catch (error) {
      console.error('Failed to load template:', error);
      alert('Failed to load template. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="templates-modal">
        <div className="modal-header">
          <h2>Workflow Templates</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="templates-list">
          {templates.map((template) => (
            <div key={template.fileName} className="template-card">
              <div className="template-category">{template.category}</div>
              <h3>{template.name}</h3>
              <p>{template.description}</p>
              <button
                className="btn-load-template"
                onClick={() => loadTemplate(template.fileName)}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Load Template'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
