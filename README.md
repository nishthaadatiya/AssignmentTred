# HR Workflow Designer

A visual workflow designer for HR processes built with React, TypeScript, and React Flow. Create, configure, and simulate automated workflows with a drag-and-drop interface.

## How to Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:5173](http://localhost:5173) to view the application.

## Architecture

### Core Technologies
- **React 18** with TypeScript for type safety
- **React Flow** for visual workflow canvas and node management
- **Vite** for fast development and optimized builds

### Project Structure
```
src/
├── components/
│   ├── nodes/              # Custom React Flow node types
│   ├── NodeEditModal.tsx   # Dynamic form handling with validation
│   ├── SimulationPanel.tsx # Workflow testing interface
│   └── ContextMenu.tsx     # Right-click node creation
├── hooks/
│   ├── useWorkflowState.ts # State management with history
│   └── useFormValidation.ts # Reusable form validation
├── context/
│   └── WorkflowContext.tsx # Global workflow state
├── api/
│   └── mockApi.ts          # Abstracted data layer
├── types/
│   └── workflow.ts         # TypeScript definitions
└── utils/
    ├── validation.ts       # Workflow validation logic
    └── performance.ts      # Optimization utilities
```

### Key Architectural Decisions

**Custom Hooks Pattern**: Extracted complex state logic into reusable hooks (`useWorkflowState`, `useFormValidation`) for better testability and code reuse.

**Context + Hooks**: Combined React Context with custom hooks to provide clean global state management without external dependencies.

**Abstracted API Layer**: Mock API designed to mirror real backend structure, making production integration seamless.

**Multi-directional Node Connections**: All nodes support connections from any edge (top, bottom, left, right) for flexible workflow layouts.

**Dynamic Form Validation**: Real-time validation with configurable rules, supporting complex conditional fields based on node types.

## Design Decisions

### React Flow Integration
- **Custom Node Types**: 5 specialized node components (Start, Task, Approval, Automated, End)
- **Editable Edges**: Click any connection to add descriptive labels
- **Context Menu**: Right-click canvas for intuitive node creation
- **Multi-handle Nodes**: Connect from any side for complex workflow patterns

### State Management Strategy
- **Local Component State**: UI interactions and temporary data
- **Workflow State Hook**: Centralized workflow data with undo/redo history
- **Context Provider**: Cross-component data sharing for deep component trees
- **Auto-persistence**: Automatic localStorage saves with debounced updates

### Performance Optimizations
- **Memoized Computations**: Expensive operations cached with `useMemo`
- **Debounced Auto-save**: Prevents excessive localStorage writes
- **Virtual Scrolling**: Ready for large workflow handling
- **Optimized Re-renders**: Strategic use of `useCallback` to prevent unnecessary updates

## What's Completed

### Core Functionality ✅
- Visual workflow canvas with drag-and-drop node creation
- 5 custom node types with specialized properties
- Multi-directional node connections (all edges)
- Editable connection labels
- Real-time node configuration panel
- Comprehensive workflow validation
- Step-by-step simulation engine
- Undo/redo with keyboard shortcuts (Ctrl+Z/Ctrl+Y)
- Auto-save to localStorage
- Template system with pre-built workflows

### Advanced Features ✅
- Dynamic form validation with real-time feedback
- Context menu for rapid node creation
- Workflow error visualization
- Mock API layer with realistic async patterns
- Performance monitoring utilities
- Responsive design with minimap and controls

### Code Quality ✅
- Comprehensive TypeScript coverage
- Custom hooks for reusable logic
- Clean component architecture
- Separation of concerns
- Error boundaries and graceful degradation

## What Would Be Added With More Time

### Enterprise Features
- **Real Backend Integration**: Replace mock API with actual HR system connections
- **User Authentication**: Role-based access control and permissions
- **Real-time Collaboration**: Multi-user editing with WebSocket synchronization
- **Advanced Analytics**: Workflow performance metrics and bottleneck analysis
- **Audit Trail**: Complete change history with user attribution

### Enhanced UX
- **Auto-layout Algorithm**: Intelligent node positioning using dagre or elk.js
- **Conditional Branching**: Decision nodes with multiple output paths
- **Advanced Templates**: Industry-specific workflow libraries
- **Mobile Optimization**: Touch-friendly interface for tablets
- **Accessibility Improvements**: Enhanced screen reader support and keyboard navigation

### Scalability Improvements
- **Plugin Architecture**: Custom node type registration system
- **Webhook Integration**: External system notifications and triggers
- **Advanced Validation**: Business rule engine for complex workflow constraints
- **Performance Optimization**: Virtual canvas rendering for massive workflows
- **Internationalization**: Multi-language support with i18n framework

### Developer Experience
- **Comprehensive Testing**: Unit, integration, and E2E test coverage
- **Storybook Integration**: Component documentation and visual testing
- **CI/CD Pipeline**: Automated testing, building, and deployment
- **Performance Monitoring**: Real-time performance metrics and alerting

## Technical Highlights

This implementation demonstrates:
- **React Flow Mastery**: Custom nodes, edge management, and advanced canvas interactions
- **Modern React Patterns**: Hooks, Context, performance optimization, and clean architecture
- **Complex Form Handling**: Dynamic validation, conditional fields, and real-time feedback
- **Scalable Architecture**: Modular design ready for enterprise requirements
- **Production Readiness**: Error handling, persistence, and user experience polish

The codebase balances rapid prototyping with production-quality patterns, showcasing both delivery speed and architectural thinking.