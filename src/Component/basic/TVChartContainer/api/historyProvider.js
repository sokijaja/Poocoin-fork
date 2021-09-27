var rp = require('request-promise').defaults({ json: true })

const history = {}

const baseLp = '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16'
let date = new Date().toISOString().split('.').shift() + '.000Z';
export default {
	history: history,

	getBars: function (symbolInfo, resolution, from, to, first, limit) {
		// const qs = {
		// 	to: date,
		// 	limit: 321,
		// 	lpAddress: symbolInfo.ticker,
		// 	interval: '15m',
		// 	baseLp: baseLp
		// }
		return fetch(`/api2/candles-bsc?to=${date}&limit=321&lpAddress=${symbolInfo.ticker}&interval=15m&baseLp=${baseLp}`)
			.then(res => res.json())
			.then(data => {
				if (data.Response && data.Response === 'Error') {
					return []
				}
				if (data.length) {
					var bars = data.map(el => {
						return {
							time: new Date(el.time).getTime(), //TradingView requires bar time in ms
							low: el.low,
							high: el.high,
							open: el.open,
							close: el.close,
							volume: el.volume
						}
					})
					if (first) {
						var lastBar = bars[bars.length - 1]
						history[symbolInfo.name] = { lastBar: lastBar }
					}
					return bars
				} else {
					return []
				}
			})
	}
}
