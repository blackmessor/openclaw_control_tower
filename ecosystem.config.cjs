module.exports = {
  apps: [{
    name: 'dashboard',
    script: './index.ts',
    interpreter: 'bun',
    instances: 1,
    autorestart: true,
    watch: ['index.ts', 'public'],
    ignore_watch: ['node_modules', 'bun.lock'],
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
};