module.exports = {
  apps: [{
    name: 'dashboard',
    script: './index.ts',
    interpreter: 'bun',
    cwd: '/Users/nicolasgodefroy/openclaw_control_tower',
    instances: 'max',
    exec_mode: 'fork',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};