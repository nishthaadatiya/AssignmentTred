# HR Workflow Designer

Visual workflow designer for HR processes built with React, TypeScript, and React Flow. Create, configure, and simulate automated workflows with drag-and-drop interface.

**Live Demo**: [https://assignment-tred.vercel.app/](https://assignment-tred.vercel.app/)

## How to Run

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the application.

## Architecture

### Technology Stack
- **React 18** with TypeScript for type safety and concurrent features
- **React Flow** for visual workflow canvas with custom node rendering
- **Vite** for fast development and optimized production builds
- **Custom Hooks** for state management and reusable logic
- **Context API** for global workflow state management

### Project Structure
```
src/
├── components/
│   ├── nodes/              # Custom React Flow node types
│   ├── NodeEditModal.tsx   # Dynamic form with validation
│   ├── SimulationPanel.tsx # Workflow testing interface
│   └── ContextMenu.tsx     # Right-click node creation
├── hooks/
│   ├── useWorkflowState.ts # State management with history
│   └── useFormValidation.ts # Form validation engine
├── context/
│   └── WorkflowContext.tsx # Global workflow state
├── api/
│   └── mockApi.ts          # Abstracted data layer
└── utils/
    └── validation.ts       # Workflow validation logic
```

## Design Decisions

### React Flow Integration
- **Multi-directional Connections**: All nodes support connections from any edge (top, bottom, left, right)
- **Custom Node Types**: 5 specialized components (Start, Task, Approval, Automated, End)
- **Editable Edges**: Click connections to add descriptive labels
- **Context Menu**: Right-click canvas for intuitive node creation

### State Management
- **Custom Hooks**: Extracted complex logic into `useWorkflowState` and `useFormValidation`
- **Context Pattern**: Global state with React Context for cross-component data sharing
- **Command Pattern**: Undo/redo functionality with immutable state snapshots
- **Auto-persistence**: Debounced localStorage saves for workflow recovery

### Performance Optimizations
- **Memoization**: Strategic use of `useMemo` and `useCallback` for expensive operations
- **Form Validation**: Real-time validation with configurable rules and error feedback
- **Debounced Updates**: Prevents excessive re-renders and localStorage writes

## What's Completed

### Core Features ✅
- Visual workflow canvas with drag-and-drop node creation
- 5 custom node types with specialized properties and multi-directional connections
- Editable connection labels with inline editing
- Real-time node configuration panel with dynamic forms
- Comprehensive workflow validation (cycles, reachability, required nodes)
- Step-by-step simulation engine with mock API integration
- Undo/redo functionality with keyboard shortcuts (Ctrl+Z/Ctrl+Y)
- Auto-save to localStorage with workflow recovery
- Template system with pre-built HR workflows
- Context menu for rapid node creation
- Workflow error visualization with visual indicators

### Technical Implementation ✅
- TypeScript with strict type checking and discriminated unions
- Custom React hooks for reusable state logic
- Context API for global state management
- Dynamic form validation with real-time feedback
- Performance optimizations with memoization strategies
- Mock API layer designed for seamless backend integration
- Responsive design with minimap and canvas controls

## What Would Be Added With More Time

### Enterprise Features
- **Real Backend Integration**: Replace mock API with actual HR system connections using REST/GraphQL
- **Authentication & Authorization**: JWT-based auth with role-based access control (RBAC)
- **Real-time Collaboration**: WebSocket integration for multi-user editing with operational transforms
- **Advanced Analytics**: Workflow performance metrics, bottleneck detection, and execution dashboards
- **Audit Trail**: Complete change history with user attribution and compliance reporting

### Enhanced User Experience
- **Auto-layout Algorithm**: Intelligent node positioning using dagre.js or elk.js for automatic graph layout
- **Conditional Branching**: Decision nodes with multiple output paths and conditional logic
- **Advanced Templates**: Industry-specific workflow libraries with parameterized templates
- **Mobile Optimization**: Touch-friendly interface optimized for tablets and mobile devices
- **Accessibility**: WCAG 2.1 compliance with screen reader support and keyboard navigation

### Scalability & Performance
- **Virtual Canvas**: Efficient rendering for workflows with thousands of nodes using virtualization
- **Plugin Architecture**: Extensible system for custom node types and integrations
- **Webhook Integration**: External system notifications and event-driven triggers
- **Advanced Validation**: Business rule engine with complex constraint validation
- **Internationalization**: Multi-language support with i18n framework integration

### Developer Experience
- **Comprehensive Testing**: Unit tests with Jest, integration tests with React Testing Library, E2E with Playwright
- **Storybook Integration**: Component documentation and visual regression testing
- **CI/CD Pipeline**: Automated testing, building, and deployment with GitHub Actions
- **Performance Monitoring**: Real-time metrics with Sentry and performance profiling tools

This implementation demonstrates React Flow mastery, modern React patterns, complex form handling, and scalable architecture ready for enterprise deployment.