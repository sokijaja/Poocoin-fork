var rp = require('request-promise').defaults({ json: true })

// const api_root = 'https://min-api.cryptocompare.com'
const history = {}
// const api_key = 'a6c625fb5265a4b6b52e6d3034cbc5b0715c5629ff43a8789ed6eefb9b1fa600'

const api_temp_root = 'https://api2.poocoin.app/candles-bsc?'
const baseLp = '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16'
let date = new Date().toISOString().split('.').shift() + '.000Z';
export default {
	history: history,

	getBars: function (symbolInfo, resolution, from, to, first, limit) {
		const qs = {
			to: date,
			limit: 321,
			lpAddress: symbolInfo.ticker,
			interval: '15m',
			baseLp: baseLp
		}

		return rp({
			// url: `${api_root}${url}`,
			url: `${api_temp_root}`,
			qs,
			// headers: {
			// 	// "Access-Control-Allow-Origin": "*",
			// },
		})
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
