module.exports = {
  apps: [{
    name: 'dashboard',
    script: './index.ts',
    interpreter: 'bun',
    instances: 1,
    exec_mode: 'fork',
    autorestart: true,
    watch: ['index.ts', 'public'],
    ignore_watch: ['node_modules', 'bun.lockb', 'logs'],
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true,
    kill_timeout: 5000
  }]
};