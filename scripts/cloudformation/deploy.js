const fs = require('fs');
const parametersPath = '../../parameters';
const { exec } = require('child_process');
const yargs = require('yargs');

const argv = yargs
  .option('target', {
    alias: 't',
    description: 'create zip directory',
    demandOption: true,
  })
  .help().argv;

(async () => {
  const deploy = (params, target) => {
    return new Promise((resolve, reject) => {
      const formatParams = Object.keys(params).reduce((collection, key) => {
        collection = `${collection === '' ? '' : `${collection} `}${key}=${params[key]}`;
        return collection;
      }, '');

      // const test = `aws cloudformation deploy --stack-name example-sqs --template-file sqs.yaml --parameter-overrides ParameterKey=test test2=2 --capabilities CAPABILITY_NAMED_IAM`;

      // const command =
      //   formatParams !== ''
      //     ? `aws cloudformation deploy \
      //       --stack-name example-${target} \
      //       --template-file ${target}.yaml \
      //       --parameter-overrides \
      //       ${formatParams} \
      //       --capabilities CAPABILITY_NAMED_IAM`
      //     : `make deploy-without-params target="${target}"`;

      // ダブルクォートでformatParamsは括らないと複数のパラメーターを認識できない
      const command =
        formatParams !== ''
          ? `make deploy-with-params params="${formatParams}" target="${target}"`
          : `make deploy-without-params target="${target}"`;

      // ルートで実行しないといけないので cd ../../ でルートに戻ってから実行
      exec(`cd ../../ && ${command}`, (err, stdout, stderr) => {
        if (err) {
          return reject(err);
        }

        return resolve(stdout);
      });
    });
  };

  const readJsonFile = (target) => {
    return JSON.parse(fs.readFileSync(`${parametersPath}/${target}.json`, 'utf8'));
  };

  try {
    if (!argv.target) {
      throw new Error('it must be target argument');
    }

    // commonは共通のparameter
    const commonParams = readJsonFile('common');
    const targetParams = readJsonFile(argv.target);

    // 共通で使うパラメーターと対象のパラメーターをマージする
    await deploy(Object.assign(commonParams, targetParams), argv.target);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
