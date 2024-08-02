module.exports = {
  apps: [
    {
      name: 'task-manager-api.demo.com',
      cwd: '/var/www/task-manager-api.demo.com',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
      },
    },

  ],
};
