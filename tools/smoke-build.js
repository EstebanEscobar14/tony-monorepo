const fs = require('node:fs');
const path = require('node:path');

const workspaceRoot = path.resolve(__dirname, '..');

const requiredArtifacts = [
  'dist/shell/index.html',
  'dist/mfe-payments/remoteEntry.mjs',
  'dist/mfe-treasury/remoteEntry.mjs',
  'dist/mfe-auth/remoteEntry.mjs',
  'dist/mfe-compliance/remoteEntry.mjs',
  'dist/mfe-onboarding/remoteEntry.mjs',
  'dist/mfe-admin/remoteEntry.mjs',
  'dist/mfe-analytics/analytics-element.js',
  'dist/docs/browser/index.html',
];

const missing = requiredArtifacts.filter((artifact) => !fs.existsSync(path.join(workspaceRoot, artifact)));

if (missing.length > 0) {
  console.error('Missing build artifacts:');
  for (const artifact of missing) {
    console.error(`- ${artifact}`);
  }
  process.exit(1);
}

console.log(`Smoke build check passed for ${requiredArtifacts.length} artifacts.`);
