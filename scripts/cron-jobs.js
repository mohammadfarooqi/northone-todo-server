const cron = require('node-cron');
const moment = require('moment');
const helper = require('./helper.js')
// runs every one min for now
const emailJob = cron.schedule('*/1 * * * *', () => {
  console.log('Beginning to send our reminders (if any) at', moment().format('MMM DD YYYY hh:mm:ss a'));

  helper.sendReminders();
}, false);

module.exports = {
  emailJob
}