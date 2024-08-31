require('dotenv').config({path: 'sample.env'});
const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const contactFrom = '+15076085420';
const client = new twilio(accountSid, authToken);

//const userCellphoneNumber = '+1234567890'; // Replace with the user's cellphone number

console.log({twilio_token: authToken});

  exports.sendSms = (bodyMessage, contactTo)=> {

    (async()=> {
        client.messages
        .create({
            body: bodyMessage,
            from: contactFrom,
            to: await contactTo,
        })
        .then((message) => console.log(message.sid))
    })();
  }