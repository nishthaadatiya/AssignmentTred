// Core workflow types
export type NodeType = 'start' | 'task' | 'approval' | 'automated' | 'end';

export interface WorkflowNodeData {
  label: string;
  title?: string;
  description?: string;
  assignee?: string;
  dueDate?: string;
  automationId?: string;
  automationParams?: Record<string, any>;
}

export interface WorkflowNode {
  id: string;
  type: NodeType;
  position: { x: number; y: number };
  data: WorkflowNodeData;
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
}

export interface Workflow {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
}

export interface AutomationAction {
  id: string;
  name: string;
  description: string;
  parameters: AutomationParameter[];
}

export interface AutomationParameter {
  name: string;
  type: 'text' | 'email' | 'select' | 'number';
  label: string;
  required: boolean;
  options?: string[];
}

export interface SimulationStep {
  nodeId: string;
  nodeType: NodeType;
  title: string;
  status: 'pending' | 'completed' | 'failed';
  message: string;
}

export interface SimulationResult {
  success: boolean;
  steps: SimulationStep[];
  errors?: string[];
}
