# Quick Start Guide

## Installation & Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open http://localhost:5173 in your browser.

## Creating Your First Workflow

### Step 1: Add a Start Node
1. Drag the **Start** node from the left sidebar onto the canvas
2. This is the entry point of your workflow

### Step 2: Add Task Nodes
1. Drag a **Task** node onto the canvas
2. Click the task node to select it
3. In the right panel, configure:
   - **Title**: "Complete New Hire Paperwork"
   - **Description**: "Fill out tax forms and employment agreement"
   - **Assignee**: "hr@company.com"
   - **Due Date**: Select a date

### Step 3: Add an Approval Node
1. Drag an **Approval** node onto the canvas
2. Configure it:
   - **Title**: "Manager Approval"
   - **Assignee**: "manager@company.com"

### Step 4: Add an Automated Node
1. Drag an **Automated** node onto the canvas
2. Configure it:
   - **Automation Action**: Select "Send Email"
   - **To**: "newemployee@company.com"
   - **Subject**: "Welcome to the Team!"
   - **Body**: "Your onboarding is complete"

### Step 5: Add an End Node
1. Drag the **End** node onto the canvas
2. This marks the completion of your workflow

### Step 6: Connect the Nodes
1. Click and drag from the **bottom handle** of the Start node
2. Drop on the **top handle** of the Task node
3. Repeat to connect: Task → Approval → Automated → End

### Step 7: Test Your Workflow
1. Click **"Run Simulation"** in the bottom right panel
2. If there are validation errors, they'll appear in red
3. If valid, you'll see step-by-step execution results

## Example Workflows

### Employee Onboarding
```
Start → Task (Paperwork) → Task (IT Setup) → Automated (Send Welcome Email) → End
```

### Leave Request
```
Start → Task (Submit Request) → Approval (Manager) → Approval (HR) → Automated (Update Calendar) → End
```

### Performance Review
```
Start → Task (Self Assessment) → Task (Manager Review) → Approval (Director) → Automated (Generate PDF) → End
```

## Tips & Tricks

- **Delete Nodes**: Select a node and press `Delete` or `Backspace`
- **Delete Edges**: Click an edge and press `Delete`
- **Pan Canvas**: Click and drag on empty space
- **Zoom**: Use mouse wheel or trackpad pinch
- **Multi-select**: Hold `Shift` and click multiple nodes
- **Fit View**: Use the controls in the bottom-left corner

## Common Validation Errors

| Error | Solution |
|-------|----------|
| "Workflow must have a Start node" | Add a Start node from the sidebar |
| "Workflow must have an End node" | Add an End node from the sidebar |
| "Unreachable nodes" | Connect all nodes to the main flow |
| "End node is not reachable" | Ensure there's a path from Start to End |
| "Workflow contains cycles" | Remove circular connections |

## Keyboard Shortcuts

- `Delete` / `Backspace`: Delete selected node or edge
- `Cmd/Ctrl + Z`: Undo (coming soon)
- `Cmd/Ctrl + Y`: Redo (coming soon)

## Next Steps

- Explore the automation actions (Send Email, Generate PDF, Create Account)
- Build complex workflows with multiple branches
- Check out `ARCHITECTURE.md` for technical details
- Read `README.md` for full documentation
