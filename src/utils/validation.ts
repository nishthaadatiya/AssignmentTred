import type { Workflow } from '../types/workflow';

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export const validateWorkflow = (workflow: Workflow): ValidationResult => {
  const errors: string[] = [];

  // Check if workflow has nodes
  if (workflow.nodes.length === 0) {
    errors.push('Workflow must have at least one node');
    return { valid: false, errors };
  }

  // Check for Start node
  const startNodes = workflow.nodes.filter(n => n.type === 'start');
  if (startNodes.length === 0) {
    errors.push('Workflow must have a Start node');
  } else if (startNodes.length > 1) {
    errors.push('Workflow can only have one Start node');
  }

  // Check for End node
  const endNodes = workflow.nodes.filter(n => n.type === 'end');
  if (endNodes.length === 0) {
    errors.push('Workflow must have an End node');
  }

  // Check if all nodes are connected (reachability)
  if (startNodes.length > 0 && endNodes.length > 0) {
    const reachable = getReachableNodes(workflow, startNodes[0].id);
    const unreachableNodes = workflow.nodes.filter(n => !reachable.has(n.id));
    
    if (unreachableNodes.length > 0) {
      errors.push(`Unreachable nodes: ${unreachableNodes.map(n => n.data.label).join(', ')}`);
    }

    if (!reachable.has(endNodes[0].id)) {
      errors.push('End node is not reachable from Start node');
    }
  }

  // Check for cycles
  if (hasCycle(workflow)) {
    errors.push('Workflow contains cycles (infinite loops)');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

const getReachableNodes = (workflow: Workflow, startId: string): Set<string> => {
  const reachable = new Set<string>();
  const queue = [startId];

  while (queue.length > 0) {
    const current = queue.shift()!;
    if (reachable.has(current)) continue;
    
    reachable.add(current);
    
    const outgoingEdges = workflow.edges.filter(e => e.source === current);
    outgoingEdges.forEach(edge => queue.push(edge.target));
  }

  return reachable;
};

const hasCycle = (workflow: Workflow): boolean => {
  const visited = new Set<string>();
  const recStack = new Set<string>();

  const dfs = (nodeId: string): boolean => {
    visited.add(nodeId);
    recStack.add(nodeId);

    const outgoingEdges = workflow.edges.filter(e => e.source === nodeId);
    for (const edge of outgoingEdges) {
      if (!visited.has(edge.target)) {
        if (dfs(edge.target)) return true;
      } else if (recStack.has(edge.target)) {
        return true;
      }
    }

    recStack.delete(nodeId);
    return false;
  };

  for (const node of workflow.nodes) {
    if (!visited.has(node.id)) {
      if (dfs(node.id)) return true;
    }
  }

  return false;
};
