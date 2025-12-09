# Usage Guide - Updated UI

## Creating Your First Workflow

### Step 1: Add Nodes via Context Menu

1. **Right-click** anywhere on the white canvas
2. A context menu will appear with 5 node options:
   - ▶ Start Node (green)
   - 📋 Task Node (blue)
   - ✓ Approval Node (yellow)
   - ⚡ Automated Node (purple)
   - ■ End Node (red)
3. Click on any node type to add it to the canvas

**Example Workflow Start:**
- Right-click → Select "Start Node"
- Right-click again → Select "Task Node"
- Right-click again → Select "End Node"

### Step 2: Connect Nodes

1. **Hover** over a node to see connection handles (small circles)
2. **Click and drag** from the bottom handle of one node
3. **Drop** on the top handle of another node
4. A connection line appears

### Step 3: Label Your Connections

This is the NEW feature that makes workflows readable!

1. **Click** on any connection line
2. A text input appears: "Click to add label"
3. **Type** a description, for example:
   - "Data Processing"
   - "Send for Verification"
   - "Approved"
   - "Rejected"
   - "Generate Report"
4. **Press Enter** or click away to save

**Example Labels:**
```
Start → "Submit Request" → Task
Task → "Send for Approval" → Approval
Approval → "Approved - Generate PDF" → Automated
Automated → "Complete" → End
```

### Step 4: Configure Node Details

1. **Click** on any node to select it
2. The right panel shows configuration options
3. Fill in details based on node type:

**Task Node:**
- Title: "Complete Onboarding Paperwork"
- Description: "Fill out tax forms and employment agreement"
- Assignee: "hr@company.com"
- Due Date: Select date

**Approval Node:**
- Title: "Manager Approval"
- Assignee: "manager@company.com"

**Automated Node:**
- Automation Action: "Send Email"
- Parameters: to, subject, body

### Step 5: Test Your Workflow

1. Click **"Run Simulation"** in the right panel
2. The system validates:
   - ✓ Has Start node
   - ✓ Has End node
   - ✓ All nodes connected
   - ✓ No infinite loops
3. If valid, see step-by-step execution
4. If errors, they appear in red with fixes

## Navigation Sidebar

The left sidebar is now a navigation bar with sections:

### Workspace
- **Canvas** (active) - Current workflow editor
- **My Workflows** - Saved workflows (future)
- **Templates** - Pre-built workflows (future)

### Tools
- **Settings** - App configuration (future)
- **Documentation** - Help docs (future)
- **Help** - Support (future)

### Quick Actions
- **Export JSON** - Download workflow (future)
- **Import JSON** - Load workflow (future)

## Keyboard Shortcuts

- **Delete/Backspace**: Delete selected node or edge
- **Escape**: Close context menu
- **Enter**: Save edge label when editing

## Tips & Best Practices

### Naming Connections
Good connection labels make workflows self-documenting:

✅ **Good Labels:**
- "Submit for Review"
- "Approved - Proceed"
- "Rejected - Return to Sender"
- "Generate Welcome Email"
- "Create User Account"

❌ **Avoid:**
- "Next"
- "Go"
- "Step 2"
- Empty labels

### Workflow Organization

1. **Start at the top**: Place Start node at top of canvas
2. **Flow downward**: Arrange nodes vertically
3. **Group related tasks**: Keep similar nodes close together
4. **Label everything**: Every connection should have a clear label

### Example: Employee Onboarding

```
Start
  ↓ "New Employee Registered"
Task: Complete Paperwork
  ↓ "Submit for Approval"
Approval: HR Review
  ↓ "Approved - Setup Accounts"
Automated: Create Email Account
  ↓ "Account Created"
Automated: Send Welcome Email
  ↓ "Onboarding Complete"
End
```

## Common Workflows

### 1. Leave Request
```
Start
  → "Submit Request" → Task (Fill Form)
  → "Send to Manager" → Approval (Manager)
  → "Approved" → Approval (HR)
  → "Update Calendar" → Automated (Calendar API)
  → "Notify Employee" → Automated (Email)
  → "Complete" → End
```

### 2. Performance Review
```
Start
  → "Begin Review" → Task (Self Assessment)
  → "Submit to Manager" → Task (Manager Review)
  → "Send for Approval" → Approval (Director)
  → "Generate Report" → Automated (PDF)
  → "Archive" → Automated (Database)
  → "Complete" → End
```

### 3. Equipment Request
```
Start
  → "Submit Request" → Task (Request Form)
  → "Manager Approval" → Approval (Manager)
  → "Budget Check" → Approval (Finance)
  → "Order Equipment" → Automated (Purchase Order)
  → "Notify Requester" → Automated (Email)
  → "Complete" → End
```

## Troubleshooting

### Context Menu Not Appearing
- Make sure you're right-clicking on the white canvas area
- Not on a node or connection line
- Try clicking elsewhere first to deselect

### Can't Edit Connection Label
- Click directly on the connection line (not near nodes)
- The line will highlight when hovering
- Click once to enter edit mode

### Validation Errors
- **"Must have Start node"**: Right-click → Add Start Node
- **"Must have End node"**: Right-click → Add End Node
- **"Unreachable nodes"**: Connect all nodes to the main flow
- **"Contains cycles"**: Remove circular connections

## Auto-Save

Your workflow automatically saves to browser localStorage:
- Saves every time you add/remove/edit nodes
- Persists across page refreshes
- Clears when you clear browser data

## Next Steps

1. Build your first workflow
2. Add descriptive labels to all connections
3. Configure each node with real data
4. Test with simulation
5. Export as JSON (coming soon)
