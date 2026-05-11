import { useMemo, useState } from 'react';
import { buildAnalyticsMetrics, buildTreasuryRows, formatCompactNumber, formatCurrency } from '@tony-ui/utils';

export function AnalyticsDashboard() {
  const [open, setOpen] = useState(false);
  const rows = useMemo(
    () =>
      buildTreasuryRows(12).map((row) => ({
        id: row.id,
        account: row.account,
        region: row.region,
        available: formatCurrency(row.available),
      })),
    []
  );

  return (
    <section className="analytics-page">
      <header className="analytics-header">
        <div>
          <p className="eyebrow">mfe-analytics</p>
          <h2>React dashboard consumiendo la misma identidad visual</h2>
          <p>
            Este remote mantiene el mismo tema del workspace, consume Web Components de
            <code>@tony-ui/core</code> y se ejecuta de forma aislada dentro del host.
          </p>
        </div>
        <ton-button-wc variant="primary" type="button" onClick={() => setOpen(true)}>
          Open insight
        </ton-button-wc>
      </header>

      <div className="metric-grid">
        {buildAnalyticsMetrics().map((metric) => (
          <article key={metric.label}>
            <span>{metric.label}</span>
            <strong>{metric.label === 'Liquidity alerts' ? metric.value : `${metric.value}%`}</strong>
            <p>{metric.trend}</p>
          </article>
        ))}
        <article>
          <span>Monthly volume</span>
          <strong>{formatCompactNumber(18240000)}</strong>
          <p>Across 6 active corridors</p>
        </article>
      </div>

      <div className="panel">
        <h3>Available cash by account</h3>
        <p>Snapshot de disponibilidad por cuenta para la vista consolidada del shell.</p>
        <div className="table-shell">
          <table className="analytics-table">
            <thead>
              <tr>
                <th>Account</th>
                <th>Region</th>
                <th className="align-right">Available</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td>{row.account}</td>
                  <td>{row.region}</td>
                  <td className="align-right">{row.available}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {open ? (
        <div className="modal-backdrop" role="presentation" onClick={() => setOpen(false)}>
          <div
            className="modal-card"
            role="dialog"
            aria-modal="true"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-copy">
              <h3>Cross-framework contract</h3>
              <p>
                The host consumes the React dashboard as an isolated microfrontend while preserving
                a consistent visual language.
              </p>
            </div>
            <ton-button-wc variant="outline" type="button" onClick={() => setOpen(false)}>
              Close
            </ton-button-wc>
          </div>
        </div>
      ) : null}
    </section>
  );
}
