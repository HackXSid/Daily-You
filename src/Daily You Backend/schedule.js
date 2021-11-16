const schedule = require("node-schedule");
const { sendNotification } = require("./firebase");

const addSchedule = (date, token, message, title) => {
  console.log(date, token, message, title);
  schedule.scheduleJob(
    date,
    function (token, message) {
      sendNotification(token, message, title);
    }.bind(null, token, message, title)
  );
  // sendNotification(token, message, title);
};

module.exports = { addSchedule };
