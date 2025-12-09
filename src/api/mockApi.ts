import type { AutomationAction, Workflow, SimulationResult, SimulationStep } from '../types/workflow';

// Mock automation actions
export const mockAutomations: AutomationAction[] = [
  {
    id: 'send-email',
    name: 'Send Email',
    description: 'Send an automated email notification',
    parameters: [
      { name: 'to', type: 'email', label: 'To', required: true },
      { name: 'subject', type: 'text', label: 'Subject', required: true },
      { name: 'body', type: 'text', label: 'Body', required: true },
    ],
  },
  {
    id: 'generate-pdf',
    name: 'Generate PDF',
    description: 'Generate a PDF document',
    parameters: [
      { name: 'template', type: 'select', label: 'Template', required: true, options: ['Offer Letter', 'Contract', 'Handbook'] },
      { name: 'fileName', type: 'text', label: 'File Name', required: true },
    ],
  },
  {
    id: 'create-account',
    name: 'Create Account',
    description: 'Create user account in system',
    parameters: [
      { name: 'email', type: 'email', label: 'Email', required: true },
      { name: 'role', type: 'select', label: 'Role', required: true, options: ['Employee', 'Manager', 'Admin'] },
    ],
  },
];

export const getAutomations = async (): Promise<AutomationAction[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockAutomations), 300);
  });
};

export const simulateWorkflow = async (workflow: Workflow): Promise<SimulationResult> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const steps: SimulationStep[] = workflow.nodes.map((node, index) => ({
        nodeId: node.id,
        nodeType: node.type,
        title: node.data.title || node.data.label,
        status: 'completed' as const,
        message: `Step ${index + 1}: ${node.data.title || node.data.label} executed successfully`,
      }));

      resolve({
        success: true,
        steps,
      });
    }, 500);
  });
};
