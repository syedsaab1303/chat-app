const AWS = require('aws-sdk');
const SES = new AWS.SES({ region: 'ap-south-1' }); // Update to your AWS region

const sendEmail = async (options) => {
    const params = {
        Source: process.env.FROM_EMAIL, // Your verified email in Amazon SES
        Destination: {
            ToAddresses: [options.to]
        },
        Message: {
            Subject: {
                Data: options.subject
            },
            Body: {
                Text: {
                    Data: options.text
                }
            }
        }
    };

    try {
        await SES.sendEmail(params).promise();
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Email sending failed');
    }
};

module.exports = sendEmail;
