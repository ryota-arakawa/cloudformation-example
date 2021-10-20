const AWS = require('aws-sdk');

AWS.config.update({ region: 'ap-northeast-1' });

(async () => {
  try {
    const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

    const sqsList = await sqs.listQueues({}).promise();

    console.log(sqsList);
  } catch (e) {
    console.error(e);
  }
})();
