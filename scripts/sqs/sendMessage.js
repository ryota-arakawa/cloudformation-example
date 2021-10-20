const AWS = require('aws-sdk');

AWS.config.update({ region: 'ap-northeast-1' });

const sqsUrl = 'https://sqs.ap-northeast-1.amazonaws.com/932446063073/dev-myapp-mail.fifo';

(async () => {
  try {
    const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

    const params = {
      // Remove DelaySeconds parameter and value for FIFO queues
      // DelaySeconds: 10,
      MessageAttributes: {
        Title: {
          DataType: 'String',
          StringValue: 'The Whistler',
        },
        Author: {
          DataType: 'String',
          StringValue: 'John Grisham',
        },
        WeeksOn: {
          DataType: 'Number',
          StringValue: '6',
        },
      },
      MessageBody: 'Information about current NY Times fiction bestseller for week of 12/11/2016.',
      // MessageDeduplicationId: "TheWhistler",  // Required for FIFO queues
      MessageGroupId: 'Group1', // Required for FIFO queues
      QueueUrl: sqsUrl,
    };

    sqs.sendMessage(params, (err, data) => {
      if (err) {
        throw err;
      } else {
        console.log('Success', data.MessageId);
      }
    });
  } catch (e) {
    console.error(e);
  }
})();
