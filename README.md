# MQTTとSOCKETで組み込みデバイスの状態をブラウザに表示するシステム

## python
`pip install paho.mqtt pyserial`
シリアルポートを指定して、実行。このときplatformIOのシリアルモニタは使えないので注意。
<br>

## frontend
frontendのディレクトリで
``` bash
npm install
npm install mermaid
```
`npm start`で開発用サーバ起動、ブラウザに表示される
ポート番号は3001
<br>

## backend
`npm install express cors socket.io mqtt`
ポート番号は3000
<br>


## MQTTブローカー

#### ① MSYS2のインストール

- 公式サイト：[https://www.msys2.org](https://www.msys2.org)
- インストーラーをダウンロード → 実行
- インストール先はそのまま `C:\msys64` 推奨（変更しない）
- MSYS2 MINGW64を起動

---

#### ③ 初回アップデート

```bash
pacman -Syuu
```

- 一度終了して再起動を求められたら、再実行

---

#### ④ MQTT用ライブラリとC++ビルド環境の導入

```bash
pacman -S mingw-w64-x86_64-mosquitto mingw-w64-x86_64-gcc
```

- `libmosquitto`: MQTTライブラリ
- `g++`: C++ビルド用
- `mosquitto`: ブローカー（動作確認にも使える）

#### MQTTブローカー起動コマンド

```bash
mosquitto -v          # → mosquittoが起動する（Ctrl+Cで終了）
```
