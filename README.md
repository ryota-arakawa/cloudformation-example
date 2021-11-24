# cloudformation-example
cloudformationのサンプルです。alb、dynamodb、lambda、github actions、vpc、sqsなどと連携できます。

## デプロイ
### Envの設定
.envファイルをまず初めに設定してください。Environmentはparameters配下のdirectoryを指します。
```
.env
Environment=dev
```

### makeコマンドのデプロイ

scripts/cloudformation/deploy.js を使ってデプロイします。
deploy.jsは parameters/$(target).json と parameters/common.json のパラメーターをマージして
デプロイします。
common.json のパラメーターは共通の値です。

```
make deploy target="$(target)"
```

target引数はyamlの名前とparameters配下のjsonファイルの名前です。

## 更新

makeコマンドのupdate-packageコマンドを使ってリソースを更新します。
make deployコマンドでもできると思いますがこちらはchangeSetに変更を指定し、登録することができます。

### update-package
指定する変更を登録。

```
make update-package target="lambda" changeSetName="update1"
make update-package target="lambda" changeSetName="update2"
```

### execute-update-package
指定した変更を実行する。

```
make execute-update-package target="lambda" changeSetName="update1"
```

### list-change-set
登録したchangeSetの変更点を出力する。

```
make list-change-set target="lambda"
```

## 確認
templateに誤りがないか確認する。

### validate

```
make validate target="$(target)"
```
