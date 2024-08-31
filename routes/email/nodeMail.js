var http = require('node:http')
const url = require('url');
const fs = require('fs');

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: '@outlook.com',
    auth: {
      user: 'trevor279@live.com',
      pass: 'Trevor@1684716!'
    }
  });

  const sendMail = (req, res) => {
    const { username, email, country_name, amount, destination, pending_action, user_id } = req.body;
  
    var mailOptions = {
      from: 'trevor279@live.com',
      to: `${email}, trevor279@live.com`,
      subject: 'Sending Email using Node.js',
      text: "please send my email",
      html: `<p>Hello ${username} your request to send an amount of ${amount} to ${destination} 
      is being proccessed</p>
      <p>Status: ${pending_action}</P>`,
    };
  
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        res.write(error);
        res.end();
      } else {
        res.write(info.response);
        res.end();
      }
    });
    //res.write("Email sent");
  }

  //update proof
  const updatePendingActionMail = (req, res) => {
    const { username, email, country_name, amount, destination, pending_action, user_id } = req.body;
  
    var mailOptions = {
      from: 'trevor279@live.com',
      to: `${email}, trevor279@live.com`,
      subject: 'Sending Email using Node.js',
      text: "please send my email",
      html: `<p>Hello ${username} your request to send an amount of ${amount} to ${destination} 
      is successfully sent!</p>
      <p>Status: <span style="color: green;">${pending_action}</span></P>`,
    };
  
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        res.write(error);
        res.end();
      } else {
        res.write(info.response);
        res.end();
      }
    });
    //res.write("Email sent");
  }

  const sendPasswordResetMail = (req, res, token) => {
    const { email } = req.body;
    const portNumber = req.port || req.headers['x-forwarded-port'] || req.headers['host'].split(':')[1];
    
    console.log({port: portNumber})
    const fullLink = `${req.protocol}://${req.hostname}:${portNumber}/api/auth/reset-password/${token}`;
    console.log(fullLink);

    var mailOptions = {
      from: 'trevor279@live.com',
      to: `${email}`,
      subject: 'Reset Password link',
      text: "press link to reset password",
      html: `<p>Click <a href="${fullLink}">here</a> to reset your password.</p>`,
    };
  
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        res.write(error);
        res.end();
      } else {
        res.write(info.response);
        res.end();
      }
    });
    console.log("Reset password Email sent");
  }
  

module.exports = {
    sendMail,
    updatePendingActionMail,
    sendPasswordResetMail,
}

/**
 * const fullLink = `${req.protocol}://${req.hostname}${req.originalUrl}`;
    console.log(fullLink)
  
    var mailOptions = {
      from: 'trevor279@live.com',
      to: `${email}`,
      subject: 'Reset Password link',
      text: "press link to reset password",
      html: `<p>Click <a href="${fullLink}/reset-password/${token}">here</a> to reset your password.</p>`,
    };
 */