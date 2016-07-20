export interface Config {
  ioEndPoint: string
}

export const config: Config = {
	ioEndPoint: 'ws://jp.aka.cn:8080/websocket/token/'
	// ioEndPoint = 'wss://api.wechaty.io/websocket/token/'
}
