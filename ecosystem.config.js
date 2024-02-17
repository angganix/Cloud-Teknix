module.exports = {
  apps: [
    {
      name: "cloud-teknix",
      script: "./server.js",
      env: {
        NODE_ENV: "development",
        PORT: 2001,
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 2001,
      },
    },
  ],
};
