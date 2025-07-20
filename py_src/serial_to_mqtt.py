import serial
import paho.mqtt.client as mqtt

SERIAL_PORT = 'COM5' # シリアルポートの設定
BAUD_RATE = 9600 # ボーレートの設定

#MQTTブローカーの設定
MQTT_BROKER = 'localhost'
MQTT_PORT = 1883
MQTT_TOPIC = 'device/log'

try:
    ser = serial.Serial(SERIAL_PORT, BAUD_RATE)
except Exception as e:
    print(f"❌ シリアルポートのオープン中に例外が発生しました: {e}")
    exit(1)

client = mqtt.Client()
try:
    result = client.connect(MQTT_BROKER, MQTT_PORT, 60)
    if result != 0:
        print(f"❌ MQTTブローカーへの接続に失敗しました (コード: {result})")
        ser.close()
        exit(1)
except Exception as e:
    print(f"❌ MQTTブローカーへの接続中に例外が発生しました: {e}")
    ser.close()
    exit(1)

print(f" Serial → MQTT 接続中: {SERIAL_PORT} → mqtt://{MQTT_BROKER}:{MQTT_PORT}")

try:
    while True:
        line = ser.readline().decode('utf-8').strip()
        if line:
            print(f"📤 送信: {line}")
            client.publish(MQTT_TOPIC, line)
except KeyboardInterrupt:
    print("\n🛑 終了します。")
finally:
    ser.close()
    client.disconnect()