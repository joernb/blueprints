[❮ Overview](../../README.md)

<div align="center">
  <h1>
    New Relic
  </h1>
</div>

Collects telemetry data ([Metrics, Events, Logs, Traces](https://newrelic.com/platform/telemetry-data-101)) to monitor application performance and health.

# 🧬 Structure

## Cloud Resources

- Accounts `my-org-staging` / `my-org-production`
  - Node.js Service `next-app`
    - Application name: `NEW_RELIC_APP_NAME`
  - Browser Application `next-app`
    - `Distributed Tracing`: Enabled
    - `Cookie collection`: Enabled
    - Code Snippet: Encode as base64 and store in `NEW_RELIC_CODE_SNIPPET_BASE64`
  - API keys
    - `Ingest - License`: `NEW_RELIC_LICENSE_KEY`
  - Alert conditions (Policies)
    - `next-app Policy`
      - One issue per policy: Group all incidents for this policy into one open issue at a time.
      - Conditions:
        - `next-app`
          - Response time (web): Above 5 sec for at least 5 min.
          - Throughput (web): Below 5 calls for at least 5min.
          - Error percentage: Above 10% for at least 5mins.
          - Apdex score: Below 0.5 for at least 5min.

## Interactions

- [UI](https://one.newrelic.com): Configure account and display telemetry data.
- New Relic provides various APIs to receive telemetry data.
- New Relic sends out alert notifications.

# 🛰️ Operations

## Monitoring

- [Browser -> ... -> Summary](https://docs.newrelic.com/docs/browser/browser-monitoring/getting-started/browser-summary-page): Shows metrics for browser monitoring
  - Largest Contentful Paint
  - First Input Delay
  - Cumulative Layout Shift
- [APM -> ... -> Summary](https://docs.newrelic.com/docs/apm/apm-ui-pages/monitoring/apm-summary-page-view-transaction-apdex-usage-data): Shows metrics for service monitoring
  - Response time (web)
  - Throughput (web)
  - Error percentage
  - Apdex score

## Alerting

- [Alerts & AI -> Overview](https://docs.newrelic.com/docs/alerts-applied-intelligence/new-relic-alerts/get-started/alerts-ai-overview-page): Shows violated alert conditions.
- [Alerts & AI -> Alert conditions (policies)](https://docs.newrelic.com/docs/alerts-applied-intelligence/new-relic-alerts/learn-alerts/alerts-concepts-workflow): Configure alert policies.
