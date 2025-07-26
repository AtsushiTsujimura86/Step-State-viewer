# 組み込みデバイスの状態をブラウザに表示するシステム ステップ実行.ver

## 概要
組み込みデバイスのログ(Serialログ)に出力された、デバイスの状態をlogファイルに保存し、それをもとにブラウザ上で状態遷移図をもってその状態の遷移のログを追うことができる。また、ブラウザ上に表示する状態遷移図は、json形式で読み込む。ログファイル、jsonファイルはいずれもブラウザ上でアップロードする。

## 使い方

### frontend
frontendのディレクトリのコンソールで以下を実行(初回のみ)。
``` bash
npm install
npm install mermaid
```
<br>

`npm start`で開発用サーバ起動、ブラウザに表示される
ポート番号は重複がないようにfrontend/ package.json内で設定する(3000など)。
``` json
  "scripts": {
    "start": "set PORT=3001 && react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
```
<br>

### PlatformIO CLIで書き込み＆実行＆ログ出力
vscodeの左側のPlatformIOのアイコン（蟻のアイコン） > Miscellaneous > New TerminalでPlatformIO CLIを開く。その後以下のコマンドを入力すると、
組み込みデバイスの書き込み＆シリアルのログを取得できる。
``` bash
$date = Get-Date -Format "MMddyyyy_HHmmss"
pio device monitor | Tee-Object -FilePath "logs/${date}_log.txt"
```
~/logs/の中に日時のついたログファイルが追加される。
``` bash
例 \logs\07202025_170200_log.txt
--- Terminal on COM13 | 115200 8-N-1
--- Available filters and text transformations: colorize, debug, default, direct, hexlify, log2file, nocontrol, printable, send_on_enter, time
--- More details at https://bit.ly/pio-monitor-filters
--- Quit: Ctrl+C | Menu: Ctrl+T | Help: Ctrl+T followed by Ctrl+H
STATE: TX
STATE: IDLE
STATE: RX
STATE: TX
STATE: IDLE
STATE: RX

```
<br>

組み込みデバイスに書き込むプログラムには以下を必ず入れるようにする。`STATE: 状態名`の形式でシリアル出力できればいい。
```cpp
SerialDebug.print("STATE: ");
SerialDebug.println(currentState);
```
<br>
<br>







