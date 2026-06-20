// Local development entrypoint.
// On Vercel, api/index.js is used instead (serverless function).
const app = require('./app');

// Only start a persistent listener when this file is run directly
// (e.g. `node server.js` / `npm run dev`). If some other process
// requires() this file (as some serverless platforms' auto-detection
// can do), skip listen() — calling app.listen() inside a serverless
// function crashes the invocation.
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

module.exports = app;
