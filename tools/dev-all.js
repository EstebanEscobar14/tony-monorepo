const { execSync, spawn } = require('child_process');

const ROOT = process.cwd();
const PORTS = [4200, 4201, 4202, 4203, 4204, 4205, 4206, 4207, 4301];
const NPX = process.platform === 'win32' ? 'npx.cmd' : 'npx';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function killPortWindows(port) {
  try {
    const output = execSync(`netstat -ano | findstr :${port}`, {
      cwd: ROOT,
      stdio: ['ignore', 'pipe', 'ignore'],
      encoding: 'utf8',
    });

    const pids = [...new Set(
      output
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => line.split(/\s+/).pop())
        .filter((pid) => pid && pid !== '0')
    )];

    for (const pid of pids) {
      try {
        execSync(`taskkill /PID ${pid} /F`, {
          cwd: ROOT,
          stdio: ['ignore', 'ignore', 'ignore'],
        });
      } catch(_error) {
        console.error(`Failed to check port ${port}: ${_error.message}`);
      }
    }
  } catch(_error) {
    console.error(`Failed to check port ${port}: ${_error.message}`);
  }
}

function killPorts() {
  if (process.platform !== 'win32') {
    return;
  }

  for (const port of PORTS) {
    killPortWindows(port);
  }
}

function startCommand(name, command) {
  const child = spawn(command, {
    cwd: ROOT,
    stdio: 'inherit',
    shell: true,
  });

  child.on('exit', (code) => {
    if (code && code !== 0) {
      console.error(`[${name}] exited with code ${code}`);
    }
  });

  return child;
}

async function main() {
  killPorts();

  startCommand('shell', `${NPX} nx serve shell`);
  await sleep(5000);
  startCommand('analytics', `${NPX} nx serve mfe-analytics`);
  startCommand('docs', `${NPX} nx serve docs`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
