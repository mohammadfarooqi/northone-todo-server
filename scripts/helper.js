const rp = require('request-promise');
const Todo = require('../web/models/todo');
const moment = require('moment');

function markReminderAsSent(todo_id) {
  Todo.findByIdAndUpdate(todo_id, { $set: { 'reminder.sent': true } }, { new: true })
    .then(result => {
      console.log('Marked todo with id ' + todo_id + ' as true, response = ', JSON.stringify(result));
    })
    .catch(err => {
      console.error('Error in markReminderAsSent: ', JSON.stringify(err));
    });
}

function sendEmail(from, subject, to, bodyHtml, todo_id) {
  return new Promise((resolve, reject) => {
    const apikey = process.env.ELASTIC_EMAIL_API_KEY
  
    const options = {
        uri: 'http://api.elasticemail.com/v2/email/send',
        qs: {
          apikey, // -> uri + '?access_token=xxxxx%20xxxxx'
          from,
          subject,
          to,
          bodyHtml
        },
        headers: {
          'User-Agent': 'Request-Promise'
        },
        json: true // Automatically parses the JSON string in the response
    };
  
    rp(options)
      .then((result) => {
        console.log('Result of sendEmail: ', JSON.stringify(result));
        
        if (result && result.success && todo_id) {
          markReminderAsSent(todo_id);
        }
        
        resolve(JSON.stringify(result));
      })
      .catch((err) => {
        // API call failed...
        console.error('sendReminders rp get request failed with error: ', JSON.stringify(err));
        reject(JSON.stringify(err));
      });
  });
}

function sendReminders() {
  // console.log('sending reminders');

  let from = 'mohammad.farooqi@gmail.com';
  let subject = 'Reminder: ';
  
  Todo.find().lean(true)
  .then(todos => {
    return Promise.all(todos.map(todo => {
      // 5 min reminder
      if(todo && todo.reminder && todo.reminder.sent === false && 
          (moment().isAfter(moment(todo.due_date)) || moment(todo.due_date).isBetween(moment().subtract(5, 'minutes'), moment(), null, '[]'))) {
          let to = todo.reminder.email || process.env.TO_EMAIL || 'shariq_2001@hotmail.com';
          const bodyHtml = '<strong>Title:</strong> ' + todo.title + 
                           '<br><strong>Description:</strong> ' + todo.description + 
                           '<br><strong>Status:</strong> ' + (todo.status === 'pending' ? 'Pending' : 'Completed') + 
                           '<br><strong>Due On:</strong> ' + moment(todo.due_date).format('MMM DD YYYY hh:mm:ss a');
          
          const todo_id = todo._id;

          return sendEmail(from, subject + todo.title, to, bodyHtml, todo_id);
        } else {
          return new Promise((resolve, reject) => {
            resolve('Skipped');
          });
        }
      }));
    })
    .then(result => {
      console.log('Completed running Send Reminder Job :', JSON.stringify(result));
    })
    .catch(err => {
      console.error('Error in Todo.find (sendReminder func): ', JSON.stringify(err));
    });
}

module.exports = {
  sendReminders
};