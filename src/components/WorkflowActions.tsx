interface WorkflowActionsProps {
  nodes: any[];
  edges: any[];
  onImport: (nodes: any[], edges: any[]) => void;
}

export const WorkflowActions = ({ nodes, edges, onImport }: WorkflowActionsProps) => {
  const handleExport = () => {
    const workflow = { nodes, edges };
    const json = JSON.stringify(workflow, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `workflow-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const workflow = JSON.parse(e.target?.result as string);
        onImport(workflow.nodes || [], workflow.edges || []);
        event.target.value = '';
      } catch (error) {
        alert('Invalid workflow file');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="workflow-actions">
      <button onClick={handleExport} className="btn-action">
        Export JSON
      </button>
      <label className="btn-action" style={{ cursor: 'pointer' }}>
        Import JSON
        <input
          type="file"
          accept=".json"
          onChange={handleImport}
          style={{ display: 'none' }}
        />
      </label>
    </div>
  );
};
