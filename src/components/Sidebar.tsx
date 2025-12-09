interface SidebarProps {
  onOpenTemplates: () => void;
}

export const Sidebar = ({ onOpenTemplates }: SidebarProps) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>HR Workflow Designer</h2>
        <p>Visual Process Builder</p>
      </div>

      <div className="sidebar-nav">
        <div className="nav-section">
          <div className="nav-section-title">Workspace</div>
          <div className="nav-item active">
            <span>Canvas</span>
          </div>
          <div className="nav-item">
            <span>My Workflows</span>
          </div>
          <div className="nav-item" onClick={onOpenTemplates} style={{ cursor: 'pointer' }}>
            <span>Templates</span>
          </div>
        </div>

        <div className="nav-section">
          <div className="nav-section-title">Tools</div>
          <div className="nav-item">
            <span>Settings</span>
          </div>
          <div className="nav-item">
            <span>Documentation</span>
          </div>
          <div className="nav-item">
            <span>Help</span>
          </div>
        </div>
      </div>

      <div className="sidebar-footer">
        Right-click on canvas to add nodes
      </div>
    </div>
  );
};
