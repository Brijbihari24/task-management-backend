module.exports = {
  apps: [
    {
      name: "task-management-app-api",
      cwd: "/var/www/task-management-app-api",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
