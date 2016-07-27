const nodemailer = require('nodemailer');

const NodemailerAdapter = ({ transporter, fromAddress }) => {

  if (!transporter) {
    throw new Error('NodemailerAdapter requires nodemailer transporter.');
  } else if (!fromAddress) {
    throw new Error('NodemailerAdapter requires fromAddress.');
  }

  const sendMail = ({ to, subject, text }) => new Promise ((resolve, reject) => {

    transporter.sendMail({
      to: to,
      from: fromAddress,
      subject: subject,
      text: text
    }, (err, info) => {
      if (err) {
        reject(err);
      }
      resolve(info);
    });
  });

  return Object.freeze({
    sendMail
  });
};

module.exports = NodemailerAdapter;
