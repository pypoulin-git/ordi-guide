module.exports = {
  apps: [{
    name: 'catalogue-agent',
    script: './catalogue-agent.js',
    cwd: '/mnt/c/dev/NemoClaw/ordi-guide/agent',
    cron_restart: '0 3 * * *',
    autorestart: false,
    env: {
      NODE_ENV: 'production',
      GOOGLE_API_KEY: process.env.GOOGLE_API_KEY || '',
    },
  }],
}
