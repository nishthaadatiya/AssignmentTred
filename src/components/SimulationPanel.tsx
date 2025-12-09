import type { SimulationResult } from '../types/workflow';

interface SimulationPanelProps {
  result: SimulationResult | null;
  validationErrors: string[];
  onSimulate: () => void;
  isSimulating: boolean;
}

export const SimulationPanel = ({ result, validationErrors, onSimulate, isSimulating }: SimulationPanelProps) => {
  return (
    <div className="simulation-panel">
      <div className="simulation-header">
        <h3>Test Workflow</h3>
        <button 
          onClick={onSimulate} 
          disabled={isSimulating}
          className="btn-primary"
        >
          {isSimulating ? 'Simulating...' : 'Run Simulation'}
        </button>
      </div>

      {validationErrors.length > 0 && (
        <div className="validation-errors">
          <h4>Validation Errors</h4>
          <ul>
            {validationErrors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {result && (
        <div className="simulation-result">
          <h4>{result.success ? 'Simulation Successful' : 'Simulation Failed'}</h4>
          <div className="simulation-steps">
            {result.steps.map((step, idx) => (
              <div key={idx} className={`step step-${step.status}`}>
                <div className="step-number">{idx + 1}</div>
                <div className="step-content">
                  <div className="step-title">{step.title}</div>
                  <div className="step-message">{step.message}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
