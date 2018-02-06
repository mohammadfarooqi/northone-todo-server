const cron = require('node-cron');

const emailJob = cron.schedule('*/1 * * * *', () => {
  console.log('running a task every minute');
}, false);

module.exports = {
  emailJob
}