# Architecture Documentation

## System Overview

The HR Workflow Designer is a single-page application (SPA) that enables visual construction and testing of HR workflows. The architecture follows a modular, component-based design with clear separation of concerns.

## Core Modules

### 1. Canvas Module (`App.tsx`)
**Responsibility**: Main workflow canvas and orchestration

- Manages global workflow state (nodes and edges)
- Handles drag-and-drop interactions
- Coordinates between sidebar, canvas, and configuration panel
- Implements React Flow integration

**Key Features**:
- Node and edge state management using React Flow hooks
- Drag-and-drop from palette to canvas
- Node selection and click handling
- Canvas interactions (pan, zoom, connect)

### 2. Node Definitions (`components/nodes/`)
**Responsibility**: Custom node type implementations

Each node type is a React component that:
- Renders node UI with appropriate styling
- Displays node-specific data (title, assignee, automation, etc.)
- Defines connection handles (input/output ports)

**Node Types**:
- `StartNode`: Single source handle, no target
- `TaskNode`: Both handles, displays assignee
- `ApprovalNode`: Both handles, displays approver
- `AutomatedNode`: Both handles, displays automation type
- `EndNode`: Single target handle, no source

### 3. Configuration Panel (`components/ConfigPanel.tsx`)
**Responsibility**: Node property editing

- Displays form fields based on selected node type
- Handles real-time updates to node data
- Loads automation parameters dynamically
- Validates required fields

**Dynamic Behavior**:
- Start/End nodes: Only label editing
- Task/Approval nodes: Title, description, assignee, due date
- Automated nodes: Automation selection + dynamic parameters

### 4. Sidebar (`components/Sidebar.tsx`)
**Responsibility**: Node palette for drag-and-drop

- Displays available node types
- Implements HTML5 drag-and-drop API
- Visual feedback on hover and drag

### 5. Simulation Panel (`components/SimulationPanel.tsx`)
**Responsibility**: Workflow testing interface

- Triggers workflow validation
- Displays validation errors
- Shows simulation results step-by-step
- Provides execution status for each node

### 6. Mock API Layer (`api/mockApi.ts`)
**Responsibility**: Data fetching and simulation

**Endpoints**:
- `getAutomations()`: Returns available automation actions
- `simulateWorkflow(workflow)`: Executes workflow simulation

**Design for Backend Integration**:
```typescript
// Current: Mock with setTimeout
export const getAutomations = async (): Promise<AutomationAction[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockAutomations), 300);
  });
};

// Future: Real HTTP call
export const getAutomations = async (): Promise<AutomationAction[]> => {
  const response = await fetch('/api/automations');
  return response.json();
};
```

### 7. Validation Module (`utils/validation.ts`)
**Responsibility**: Workflow correctness checking

**Validation Rules**:
1. Must have exactly one Start node
2. Must have at least one End node
3. All nodes must be reachable from Start
4. End node must be reachable from Start
5. No cycles (prevents infinite loops)

**Algorithms**:
- **Reachability**: Breadth-first search (BFS) from Start node
- **Cycle Detection**: Depth-first search (DFS) with recursion stack

### 8. Type Definitions (`types/workflow.ts`)
**Responsibility**: TypeScript type safety

Defines interfaces for:
- Workflow structure (nodes, edges)
- Node data schemas
- Automation actions and parameters
- Simulation results

## Data Flow

```
User Action → Component → State Update → Re-render
     ↓
  Validation
     ↓
  Simulation
     ↓
   Results
```

### Example: Adding a Node

1. User drags node from sidebar
2. `onDragStart` captures node type
3. `onDrop` calculates canvas position
4. New node added to state via `setNodes`
5. React Flow re-renders canvas
6. Node appears on canvas

### Example: Simulating Workflow

1. User clicks "Run Simulation"
2. `handleSimulate` collects nodes and edges
3. `validateWorkflow` checks correctness
4. If valid, `simulateWorkflow` executes
5. Results displayed in simulation panel

## State Management

### Local Component State
- Form inputs in ConfigPanel
- UI toggles and loading states

### Shared State (React Flow)
- `nodes`: Array of workflow nodes
- `edges`: Array of connections
- `selectedNode`: Currently selected node

### Derived State
- Validation errors (computed on-demand)
- Simulation results (from API response)

## Styling Strategy

- **CSS-in-file**: All styles in `App.css`
- **BEM-like naming**: `.node`, `.node-label`, `.node-meta`
- **Modifier classes**: `.start-node`, `.task-node`, etc.
- **Responsive**: Flexbox layout for panels

## Performance Considerations

- React Flow handles canvas virtualization
- Node updates use `useCallback` to prevent re-renders
- Validation runs only on simulation trigger
- Mock API uses setTimeout to simulate network delay

## Extensibility Points

### Adding New Node Types

1. Create component in `components/nodes/`
2. Add type to `NodeType` union in `types/workflow.ts`
3. Register in `nodeTypes` object in `App.tsx`
4. Add to sidebar palette
5. Add configuration fields in ConfigPanel

### Adding New Automations

1. Add to `mockAutomations` array in `mockApi.ts`
2. Define parameters with types
3. ConfigPanel automatically renders form fields

### Backend Integration

Replace mock functions in `api/mockApi.ts`:
```typescript
// Use fetch, axios, or any HTTP client
export const getAutomations = async () => {
  const res = await fetch('/api/automations');
  return res.json();
};
```

## Testing Strategy (Future)

- **Unit Tests**: Validation logic, pure functions
- **Component Tests**: Node rendering, form interactions
- **Integration Tests**: Full workflow creation and simulation
- **E2E Tests**: User flows with Playwright or Cypress

## Security Considerations

- Input sanitization for node data
- Validation before workflow execution
- Rate limiting on simulation endpoint
- Authentication for workflow save/load

## Deployment

```bash
npm run build
# Outputs to dist/ folder
# Deploy to any static hosting (Vercel, Netlify, S3, etc.)
```

## Browser Support

- Modern browsers with ES6+ support
- Chrome, Firefox, Safari, Edge (latest versions)
- React Flow requires canvas and SVG support
