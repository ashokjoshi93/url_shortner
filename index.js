const config = require('./config');
const app = require('./server/express');

const application = config.application;

app.listen(application.port, () => {
  console.info(`server started on port ${application.port} (${application.env})`);
});
