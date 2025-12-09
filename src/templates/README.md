# Workflow Templates

This folder contains pre-built workflow templates that can be loaded into the HR Workflow Designer.

## Available Templates

### 1. Complete Employee Onboarding (`employee-onboarding.json`)
**Category:** HR Operations

A comprehensive onboarding workflow covering:
- Document collection (PAN, Aadhaar, Bank Details, etc.)
- IT access setup (Email, Slack, VPN, HRMS)
- Manager approval for device allocation
- Automated welcome email
- Employee ID card generation
- Induction training
- HR final verification
- Team introduction scheduling

**Nodes:** 10 (1 Start, 3 Tasks, 2 Approvals, 3 Automated, 1 End)
**Estimated Duration:** 7-10 business days

### 2. Leave Request Workflow (`leave-request.json`)
**Category:** HR Operations

Complete leave management workflow with:
- Leave application form submission
- Automatic leave balance check
- Manager approval with escalation
- HR approval for extended leaves
- Auto-approval for short leaves (≤2 days)
- HRMS system updates
- Team calendar blocking
- Email and SMS notifications
- Team member notifications
- Rejection handling with alternatives

**Nodes:** 13 (1 Start, 3 Tasks, 2 Approvals, 5 Automated, 2 Ends)
**Features:** Conditional branching, auto-approval logic

### 3. Performance Review Cycle (`performance-review.json`)
**Category:** Performance Management

Annual performance review workflow including:
- Review cycle announcement
- Employee self-assessment
- 360-degree feedback collection
- Manager performance evaluation
- Automated report generation
- Department head calibration
- HR final review and approval
- One-on-one feedback session
- Goal setting for next cycle
- Individual Development Plan (IDP) creation
- HR records update
- Quarterly check-in scheduling

**Nodes:** 16 (1 Start, 6 Tasks, 2 Approvals, 6 Automated, 1 End)
**Estimated Duration:** 4-6 weeks

## JSON Structure

Each template follows this structure:

```json
{
  "name": "Template Name",
  "description": "Detailed description",
  "category": "Category Name",
  "nodes": [
    {
      "id": "unique_id",
      "type": "start|task|approval|automated|end",
      "position": { "x": 250, "y": 50 },
      "data": {
        "label": "Node Label",
        "title": "Node Title",
        "description": "Detailed description",
        // Type-specific fields
      }
    }
  ],
  "edges": [
    {
      "id": "edge_id",
      "source": "source_node_id",
      "target": "target_node_id",
      "type": "default",
      "data": { "label": "Connection Label" }
    }
  ]
}
```

## Node Types and Fields

### Start Node
```json
{
  "type": "start",
  "data": {
    "label": "Start",
    "title": "Process Title",
    "description": "Process description",
    "metadata": { /* custom metadata */ }
  }
}
```

### Task Node
```json
{
  "type": "task",
  "data": {
    "label": "Task",
    "title": "Task Title",
    "description": "Task description",
    "assignee": "email@company.com",
    "dueDate": "2025-01-10",
    "priority": "high|medium|low",
    "estimatedHours": 2
  }
}
```

### Approval Node
```json
{
  "type": "approval",
  "data": {
    "label": "Approval",
    "title": "Approval Title",
    "description": "Approval description",
    "assignee": "approver@company.com",
    "approverRole": "Manager",
    "autoApproveThreshold": 24,
    "escalationHours": 48
  }
}
```

### Automated Node
```json
{
  "type": "automated",
  "data": {
    "label": "Automated",
    "title": "Automation Title",
    "description": "Automation description",
    "automationId": "send-email|generate-pdf|create-account",
    "automationParams": {
      /* automation-specific parameters */
    }
  }
}
```

### End Node
```json
{
  "type": "end",
  "data": {
    "label": "End",
    "title": "Completion Title",
    "message": "Completion message",
    "summary": true
  }
}
```

## How to Use Templates

### In the Application
1. Click "Templates" in the left sidebar
2. Browse available templates
3. Click "Load Template" on desired workflow
4. Template loads onto canvas
5. Customize as needed

### Programmatically
```javascript
// Load template
const response = await fetch('/src/templates/employee-onboarding.json');
const template = await response.json();

// Apply to workflow
setNodes(template.nodes);
setEdges(template.edges);
```

## Creating Custom Templates

1. Build your workflow in the designer
2. Click "Export JSON"
3. Edit the JSON file:
   - Add `name`, `description`, `category` fields
   - Ensure all nodes have proper positions
   - Add detailed descriptions
   - Include metadata
4. Save in `src/templates/` folder
5. Add to templates list in `TemplatesPanel.tsx`

## Best Practices

### Node Positioning
- Start node at top (y: 50)
- Vertical spacing: 120px between nodes
- Horizontal spacing: 150px for branches
- Center alignment: x: 250 for main flow

### Descriptions
- Be specific and actionable
- Include all required information
- Mention tools/systems involved
- Add time estimates

### Metadata
- Include relevant context
- Add priority levels
- Specify roles clearly
- Document conditions

### Edge Labels
- Use action verbs
- Describe the transition
- Keep concise (2-4 words)
- Be consistent

## Template Validation

Before adding a template, ensure:
- [ ] Valid JSON structure
- [ ] All node IDs are unique
- [ ] All edge source/target IDs exist
- [ ] Has exactly one Start node
- [ ] Has at least one End node
- [ ] All nodes are reachable
- [ ] No cycles (unless intentional)
- [ ] Positions are set correctly
- [ ] Labels are descriptive
- [ ] Metadata is complete

## Future Templates

Planned templates:
- Employee Offboarding
- Expense Approval
- Recruitment Process
- Training Request
- Asset Allocation
- Grievance Handling
- Promotion Workflow
- Transfer Request
- Salary Revision
- Exit Interview

## Contributing

To contribute a new template:
1. Create the workflow
2. Export as JSON
3. Add metadata
4. Test thoroughly
5. Document in this README
6. Submit for review
