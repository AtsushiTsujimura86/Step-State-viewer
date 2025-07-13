# MQTTとSOCKETで組み込みデバイスの状態をブラウザに表示するシステム

## python
`pip install paho.mqtt serial`
シリアルポートを指定して、実行。このときplatformIOのシリアルモニタは使えないので注意。

## frontend
frontendのディレクトリで`npm install` 少々時間かかる
`npm start`で開発用サーバ起動、ブラウザに表示される
ポート番号は3001

## backend
`npm install express cors socket.io mqtt`
ポート番号は3000
