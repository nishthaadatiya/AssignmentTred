# Workflow Templates Guide

## Overview

The HR Workflow Designer now includes 3 comprehensive, production-ready workflow templates that demonstrate real-world HR processes with detailed configurations.

## How to Access Templates

1. **Open the application**
2. **Click "Templates"** in the left sidebar under Workspace section
3. **Browse templates** in the modal dialog
4. **Click "Load Template"** to load any workflow onto the canvas
5. **Customize** the loaded workflow as needed

## Available Templates

### 1. Complete Employee Onboarding
**Duration:** 7-10 business days  
**Complexity:** Medium  
**Nodes:** 10

**Process Flow:**
```
Start → Collect Documents → IT Setup → Manager Approval → 
Welcome Email → Generate ID Card → Induction Training → 
HR Verification → Team Introduction → End
```

**Key Features:**
- Document collection checklist
- IT access provisioning
- Device allocation approval
- Automated communications
- Training scheduling
- Multi-level verification

**Use Case:** New hire onboarding from day 1 to completion

---

### 2. Leave Request Workflow
**Duration:** 1-3 days  
**Complexity:** High (with branching)  
**Nodes:** 13

**Process Flow:**
```
Start → Fill Form → Check Balance → Manager Approval
  ├─→ Extended Leave → HR Approval → Update System
  ├─→ Short Leave → Auto-Approve → Update System
  └─→ Rejected → Notify → End

Update System → Update Calendar → Notify Employee → 
Notify Team → End
```

**Key Features:**
- Automatic balance validation
- Conditional branching (short vs extended)
- Auto-approval logic
- Manager and HR approvals
- Calendar integration
- Multi-channel notifications
- Rejection handling

**Use Case:** Employee leave requests with smart routing

---

### 3. Performance Review Cycle
**Duration:** 4-6 weeks  
**Complexity:** High  
**Nodes:** 16

**Process Flow:**
```
Start → Announce → Self-Assessment → 360 Feedback → 
Manager Review → Generate Report → Dept Calibration → 
HR Approval → Feedback Session → Set Goals → 
Create IDP → Update Records → Send Notification → 
Schedule Check-ins → End
```

**Key Features:**
- Self-assessment forms
- 360-degree feedback collection
- Manager evaluation with criteria
- Automated report generation
- Multi-level calibration
- Goal setting (SMART)
- Individual Development Plans
- Quarterly follow-ups

**Use Case:** Annual performance review cycle

## Template Details

### JSON Structure

Each template includes:

**Metadata:**
- Name and description
- Category classification
- Version information

**Nodes:**
- Unique IDs
- Node types (start, task, approval, automated, end)
- Positions for visual layout
- Detailed data fields:
  - Titles and descriptions
  - Assignees and roles
  - Due dates and priorities
  - Automation parameters
  - Custom metadata

**Edges:**
- Source and target connections
- Connection labels
- Edge types

### Example Node Structure

```json
{
  "id": "task_1",
  "type": "task",
  "position": { "x": 250, "y": 150 },
  "data": {
    "label": "Task",
    "title": "Collect Personal Documents",
    "description": "Gather all required documents: PAN Card, Aadhaar, Bank Details...",
    "assignee": "hr_team@company.com",
    "dueDate": "2025-01-10",
    "priority": "high",
    "estimatedHours": 2
  }
}
```

## Customization Guide

After loading a template, you can:

### 1. Modify Nodes
- Click any node to select it
- Edit properties in the right panel:
  - Change titles and descriptions
  - Update assignees
  - Adjust due dates
  - Modify automation parameters

### 2. Edit Connections
- Click connection lines to add/edit labels
- Delete connections by selecting and pressing Delete
- Add new connections by dragging between nodes

### 3. Add/Remove Nodes
- Right-click canvas to add new nodes
- Select and press Delete to remove nodes
- Rearrange by dragging

### 4. Save Your Version
- Click "Export JSON" to save customized workflow
- Import later using "Import JSON"

## Real-World Usage

### Onboarding Template
**Customize for:**
- Different departments (IT, Sales, Operations)
- Remote vs office employees
- Contract vs permanent staff
- Intern onboarding

**Modifications:**
- Add department-specific training
- Include role-specific access requests
- Add mentor assignment
- Include probation review milestones

### Leave Request Template
**Customize for:**
- Different leave types (sick, casual, earned, maternity)
- Country-specific regulations
- Company policies
- Team size considerations

**Modifications:**
- Add medical certificate requirement
- Include backup assignment
- Add leave encashment logic
- Include comp-off handling

### Performance Review Template
**Customize for:**
- Different review cycles (quarterly, bi-annual)
- Various job levels (individual contributor, manager, executive)
- Different departments
- Probation reviews

**Modifications:**
- Add competency frameworks
- Include promotion recommendations
- Add compensation review
- Include succession planning

## Technical Details

### File Locations
```
Assignment/
└── src/
    └── templates/
        ├── employee-onboarding.json
        ├── leave-request.json
        ├── performance-review.json
        └── README.md
```

### Loading Mechanism
Templates are loaded via fetch API:
```javascript
const response = await fetch('/src/templates/template-name.json');
const template = await response.json();
```

### Data Validation
Templates are validated for:
- Valid JSON structure
- Required fields present
- Node ID uniqueness
- Edge connectivity
- Workflow completeness

## Best Practices

### When Using Templates

1. **Review First:** Understand the entire flow before customizing
2. **Adapt to Context:** Modify for your organization's needs
3. **Test Thoroughly:** Use simulation to validate changes
4. **Document Changes:** Keep track of customizations
5. **Version Control:** Export and save different versions

### When Creating Custom Templates

1. **Start Simple:** Build incrementally
2. **Be Descriptive:** Add detailed descriptions
3. **Include Metadata:** Document context and requirements
4. **Test Validation:** Ensure workflow passes validation
5. **Export Clean:** Remove test data before saving

## Troubleshooting

### Template Won't Load
- Check browser console for errors
- Verify JSON file is valid
- Ensure file path is correct
- Try refreshing the page

### Nodes Overlap
- Manually reposition nodes
- Use consistent spacing (120px vertical)
- Center main flow at x: 250

### Validation Errors After Loading
- Check for missing Start/End nodes
- Verify all connections are valid
- Ensure no orphaned nodes
- Remove any cycles

## Future Enhancements

Planned features:
- Template preview before loading
- Template search and filtering
- Custom template upload
- Template versioning
- Template sharing
- Template marketplace
- Template categories
- Template ratings

## Support

For issues or questions:
1. Check this guide
2. Review template README
3. Check application documentation
4. Test with simulation feature

## Contributing Templates

To contribute a new template:
1. Build the workflow in the designer
2. Test thoroughly with simulation
3. Export as JSON
4. Add metadata (name, description, category)
5. Document in templates README
6. Submit for review

---

**Note:** All templates are examples and should be customized to match your organization's specific policies, procedures, and requirements.
