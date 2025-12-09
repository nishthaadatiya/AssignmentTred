import { useState, useCallback, useRef, useEffect } from 'react';
import ReactFlow, {
  type Node,
  addEdge,
  type Connection,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  BackgroundVariant,
  ReactFlowProvider,
  MiniMap,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { StartNode } from './components/nodes/StartNode';
import { TaskNode } from './components/nodes/TaskNode';
import { ApprovalNode } from './components/nodes/ApprovalNode';
import { AutomatedNode } from './components/nodes/AutomatedNode';
import { EndNode } from './components/nodes/EndNode';
import { Sidebar } from './components/Sidebar';
import { SimulationPanel } from './components/SimulationPanel';
import { ContextMenu } from './components/ContextMenu';
import { EditableEdge } from './components/EditableEdge';
import { WorkflowActions } from './components/WorkflowActions';
import { TemplatesPanel } from './components/TemplatesPanel';
import { NodeEditModal } from './components/NodeEditModal';

import type { NodeType, WorkflowNodeData, AutomationAction, SimulationResult } from './types/workflow';
import { getAutomations, simulateWorkflow } from './api/mockApi';
import { validateWorkflow } from './utils/validation';

import './App.css';

const nodeTypes = {
  start: StartNode,
  task: TaskNode,
  approval: ApprovalNode,
  automated: AutomatedNode,
  end: EndNode,
};

const edgeTypes = {
  default: EditableEdge,
};

let nodeId = 0;
const getId = () => `node_${nodeId++}`;

function WorkflowDesigner() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Load workflow from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('workflow');
    if (saved) {
      try {
        const { nodes: savedNodes, edges: savedEdges } = JSON.parse(saved);
        setNodes(savedNodes || []);
        setEdges(savedEdges || []);
      } catch (error) {
        console.error('Failed to load workflow:', error);
      }
    }
  }, []);

  // Auto-save workflow to localStorage
  useEffect(() => {
    if (nodes.length > 0 || edges.length > 0) {
      localStorage.setItem('workflow', JSON.stringify({ nodes, edges }));
    }
  }, [nodes, edges]);

  // Save to history on changes
  useEffect(() => {
    if (nodes.length > 0 || edges.length > 0) {
      setHistory(prev => {
        const newHistory = prev.slice(0, historyIndex + 1);
        newHistory.push({ nodes, edges });
        return newHistory.slice(-50); // Keep last 50 states
      });
      setHistoryIndex(prev => Math.min(prev + 1, 49));
    }
  }, [nodes, edges]);



  const [automations, setAutomations] = useState<AutomationAction[]>([]);
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [showTemplates, setShowTemplates] = useState(false);
  const [editingNode, setEditingNode] = useState<Node | null>(null);
  const [history, setHistory] = useState<{ nodes: any[]; edges: any[] }[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  useEffect(() => {
    getAutomations().then(setAutomations);
  }, []);

  const onConnect = useCallback(
    (params: Connection) => {
      const newEdge = {
        ...params,
        type: 'default',
        data: { 
          label: '',
          onLabelChange: (edgeId: string, label: string) => {
            setEdges((eds) =>
              eds.map((edge) => {
                if (edge.id === edgeId) {
                  return { ...edge, data: { ...edge.data, label } };
                }
                return edge;
              })
            );
          }
        },
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges]
  );

  const onPaneContextMenu = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenu({ x: event.clientX, y: event.clientY });
  }, []);

  const handleContextMenuSelect = useCallback(
    (nodeType: NodeType) => {
      if (!reactFlowInstance || !contextMenu) return;

      const position = reactFlowInstance.screenToFlowPosition({
        x: contextMenu.x,
        y: contextMenu.y,
      });

      const newNode: Node = {
        id: getId(),
        type: nodeType,
        position,
        data: { label: nodeType.charAt(0).toUpperCase() + nodeType.slice(1) },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, contextMenu, setNodes]
  );

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setEditingNode(node);
  }, []);

  const onPaneClick = useCallback(() => {
    setContextMenu(null);
  }, []);

  const handleNodeSave = useCallback(
    (nodeId: string, data: WorkflowNodeData) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === nodeId) {
            return { ...node, data };
          }
          return node;
        })
      );
      setEditingNode(null);
    },
    [setNodes]
  );



  const handleSimulate = useCallback(async () => {
    const workflow = { 
      nodes: nodes as any, 
      edges: edges as any 
    };
    const validation = validateWorkflow(workflow);
    
    setValidationErrors(validation.errors);
    
    // Add visual error indicators to nodes
    const updatedNodes = nodes.map(node => {
      const hasError = validation.errors.some(error => 
        error.toLowerCase().includes(node.data.label?.toLowerCase() || '')
      );
      return {
        ...node,
        data: {
          ...node.data,
          hasError,
        },
      };
    });
    setNodes(updatedNodes);
    
    if (!validation.valid) {
      setSimulationResult(null);
      return;
    }

    setIsSimulating(true);
    try {
      const result = await simulateWorkflow(workflow);
      setSimulationResult(result);
    } finally {
      setIsSimulating(false);
    }
  }, [nodes, edges, setNodes]);

  const handleImport = useCallback((importedNodes: any[], importedEdges: any[]) => {
    setNodes(importedNodes);
    setEdges(importedEdges);
  }, [setNodes, setEdges]);

  const handleLoadTemplate = useCallback((templateNodes: any[], templateEdges: any[]) => {
    setNodes(templateNodes);
    setEdges(templateEdges);
    setShowTemplates(false);
  }, [setNodes, setEdges]);

  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      const prevState = history[historyIndex - 1];
      setNodes(prevState.nodes);
      setEdges(prevState.edges);
      setHistoryIndex(historyIndex - 1);
    }
  }, [history, historyIndex, setNodes, setEdges]);

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const nextState = history[historyIndex + 1];
      setNodes(nextState.nodes);
      setEdges(nextState.edges);
      setHistoryIndex(historyIndex + 1);
    }
  }, [history, historyIndex, setNodes, setEdges]);

  const handleAutoLayout = useCallback(() => {
    const layoutedNodes = nodes.map((node, index) => ({
      ...node,
      position: {
        x: 250,
        y: 50 + index * 150,
      },
    }));
    setNodes(layoutedNodes);
  }, [nodes, setNodes]);

  // Undo/Redo keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        handleUndo();
      } else if ((e.metaKey || e.ctrlKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        handleRedo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleUndo, handleRedo]);

  return (
    <div className="workflow-designer">
      <Sidebar onOpenTemplates={() => setShowTemplates(true)} />
      
      <div className="canvas-container" ref={reactFlowWrapper}>
        <div className="canvas-controls">
          <button 
            className="btn-icon" 
            onClick={handleUndo}
            disabled={historyIndex <= 0}
            title="Undo (Ctrl+Z)"
          >
            ↶ Undo
          </button>
          <button 
            className="btn-icon" 
            onClick={handleRedo}
            disabled={historyIndex >= history.length - 1}
            title="Redo (Ctrl+Y)"
          >
            ↷ Redo
          </button>
          <button 
            className="btn-icon" 
            onClick={handleAutoLayout}
            title="Auto-arrange nodes vertically"
          >
            ⚡ Auto-Layout
          </button>
        </div>

        <div className="canvas-toolbar">
          <WorkflowActions 
            nodes={nodes} 
            edges={edges} 
            onImport={handleImport}
          />
        </div>
        
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          onPaneContextMenu={onPaneContextMenu}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
        >
          <Controls />
          <MiniMap 
            nodeColor={(node) => {
              switch (node.type) {
                case 'start': return '#28a745';
                case 'task': return '#0366d6';
                case 'approval': return '#ffa500';
                case 'automated': return '#6f42c1';
                case 'end': return '#d73a49';
                default: return '#999999';
              }
            }}
            maskColor="rgba(0, 0, 0, 0.1)"
          />
          <Background variant={BackgroundVariant.Dots} gap={16} size={1} color="#e8e8e8" />
        </ReactFlow>
        
        {contextMenu && (
          <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            onSelect={handleContextMenuSelect}
            onClose={() => setContextMenu(null)}
          />
        )}
      </div>

      <div className="bottom-panel">
        <SimulationPanel
          result={simulationResult}
          validationErrors={validationErrors}
          onSimulate={handleSimulate}
          isSimulating={isSimulating}
        />
      </div>

      {showTemplates && (
        <TemplatesPanel
          onLoadTemplate={handleLoadTemplate}
          onClose={() => setShowTemplates(false)}
        />
      )}

      {editingNode && (
        <NodeEditModal
          node={editingNode}
          automations={automations}
          onSave={handleNodeSave}
          onClose={() => setEditingNode(null)}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <ReactFlowProvider>
      <WorkflowDesigner />
    </ReactFlowProvider>
  );
}

export default App;
