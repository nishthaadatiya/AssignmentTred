import type { NodeType } from '../types/workflow';

interface ContextMenuProps {
  x: number;
  y: number;
  onSelect: (nodeType: NodeType) => void;
  onClose: () => void;
}

export const ContextMenu = ({ x, y, onSelect, onClose }: ContextMenuProps) => {
  const menuItems = [
    { type: 'start' as NodeType, label: 'Start Node', color: '#28a745' },
    { type: 'task' as NodeType, label: 'Task Node', color: '#0366d6' },
    { type: 'approval' as NodeType, label: 'Approval Node', color: '#ffa500' },
    { type: 'automated' as NodeType, label: 'Automated Node', color: '#6f42c1' },
    { type: 'end' as NodeType, label: 'End Node', color: '#d73a49' },
  ];

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 999,
        }}
        onClick={onClose}
      />
      <div
        className="context-menu"
        style={{
          top: y,
          left: x,
        }}
      >
        {menuItems.map((item, index) => (
          <div key={item.type}>
            <div
              className="context-menu-item"
              onClick={() => {
                onSelect(item.type);
                onClose();
              }}
            >
              <span className="context-menu-indicator" style={{ backgroundColor: item.color }} />
              <span>{item.label}</span>
            </div>
            {index === 0 && <div className="context-menu-divider" />}
            {index === 3 && <div className="context-menu-divider" />}
          </div>
        ))}
      </div>
    </>
  );
};
