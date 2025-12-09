# HR Workflow Designer

A visual workflow designer for HR processes built with React, TypeScript, and React Flow. This prototype allows HR administrators to create, configure, and test automated workflows such as employee onboarding, approval chains, and task automation.

## Features

- **Visual Workflow Canvas**: Right-click context menu for node creation powered by React Flow
- **Editable Connection Labels**: Click on any connection line to add descriptive labels
- **5 Custom Node Types**:
  - **Start Node**: Entry point for workflows
  - **Task Node**: Manual tasks with assignee and due dates
  - **Approval Node**: Approval steps with designated approvers
  - **Automated Node**: Automated actions (email, PDF generation, account creation)
  - **End Node**: Workflow completion point
- **Real-time Configuration**: Edit node properties in the right panel
- **Workflow Validation**: Checks for start/end nodes, reachability, and cycles
- **Simulation Sandbox**: Test workflow execution with step-by-step output
- **Mock API Layer**: Simulates automation actions and workflow execution

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

## How to Use

1. **Add Nodes**: Right-click anywhere on the canvas to open the context menu and select a node type
2. **Connect Nodes**: Click and drag from one node's handle to another to create connections
3. **Label Connections**: Click on any connection line to add a descriptive label (e.g., "Send for verification")
4. **Configure Nodes**: Click a node to edit its properties in the right panel
5. **Test Workflow**: Click "Run Simulation" to validate and execute the workflow

## Project Structure

```
src/
├── api/
│   └── mockApi.ts          # Mock API for automations and simulation
├── components/
│   ├── nodes/              # Custom React Flow node components
│   │   ├── StartNode.tsx
│   │   ├── TaskNode.tsx
│   │   ├── ApprovalNode.tsx
│   │   ├── AutomatedNode.tsx
│   │   └── EndNode.tsx
│   ├── Sidebar.tsx         # Node palette for drag-and-drop
│   ├── ConfigPanel.tsx     # Node configuration form
│   └── SimulationPanel.tsx # Workflow testing interface
├── types/
│   └── workflow.ts         # TypeScript type definitions
├── utils/
│   └── validation.ts       # Workflow validation logic
├── App.tsx                 # Main application component
├── App.css                 # Application styles
└── main.tsx                # Application entry point
```

## Architecture Decisions

### Module Organization

The application is structured into clear, single-responsibility modules:

- **API Layer** (`api/`): Handles data fetching and simulation. Currently uses mock data but designed for easy backend integration.
- **Components** (`components/`): Reusable UI components with clear props interfaces.
- **Types** (`types/`): Centralized TypeScript definitions for type safety across the app.
- **Utils** (`utils/`): Pure functions for validation and business logic.

### State Management

Uses React's built-in hooks (`useState`, `useCallback`) and React Flow's state management hooks (`useNodesState`, `useEdgesState`). This keeps the prototype simple while remaining scalable for future state management libraries if needed.

### Validation Strategy

Workflow validation runs before simulation and checks:
- Presence of exactly one Start node
- Presence of at least one End node
- All nodes are reachable from Start
- End node is reachable from Start
- No cycles exist (prevents infinite loops)

### Mock API Design

The mock API (`mockApi.ts`) simulates:
- `GET /automations`: Returns available automation actions with dynamic parameters
- `POST /simulate`: Accepts workflow JSON and returns execution steps

This design allows easy replacement with real HTTP calls using `fetch` or `axios`.

## Technology Stack

- **React 18**: UI framework
- **TypeScript**: Type safety and developer experience
- **React Flow**: Visual workflow canvas and node management
- **Vite**: Fast development server and build tool

## Future Enhancements

- **Undo/Redo**: Implement command pattern for workflow history
- **Node Templates**: Pre-built workflow templates (onboarding, offboarding, etc.)
- **JSON Export/Import**: Save and load workflows
- **Auto-layout**: Automatic node positioning using dagre or elk.js
- **Conditional Branching**: Add decision nodes with multiple output paths
- **Real Backend Integration**: Connect to actual HR systems and APIs
- **Collaboration**: Multi-user editing with real-time sync
- **Version Control**: Track workflow changes over time
- **Analytics Dashboard**: Monitor workflow execution metrics

## Development Notes

- Node IDs are auto-generated using a simple counter
- Drag-and-drop uses the HTML5 Drag and Drop API
- React Flow handles canvas interactions (pan, zoom, selection)
- All node data updates trigger re-renders via React state

## License

MIT
