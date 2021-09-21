import historyProvider from './historyProvider'
import { getSymbolName } from '../../../../actions';
import { getLpaddress } from '../../../../actions';
const supportedResolutions = ["1", "3", "5", "15", "30", "60", "120", "240", "D"]

const config = {
	supported_resolutions: supportedResolutions
};

export default {
	onReady: cb => {
		setTimeout(() => cb(config), 0)

	},
	searchSymbols: (userInput, exchange, symbolType, onResultReadyCallback) => {

	},
	resolveSymbol: async (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) => {
		let newSymbolName;
		let lpAddress;
		var split_data = symbolName.split('/')	//description tokenaddress:tokenaddress/coinaddress or tokenname/coinaddress

		if (!split_data[0].includes(':')) {
			let response_ = await getLpaddress(split_data[0], split_data[1]);
			lpAddress = response_.data;
			//get coinsymbol from symbolName (tokenaddress:tokenaddress/coinaddress)
			var coinSymbol_res = await getSymbolName(split_data[1]);
			var coinSymbol = coinSymbol_res.data[0].symbol;
			if (coinSymbol === "WBNB") {
				coinSymbol = "BNB"
			}
			let response = await getSymbolName(split_data[0])
			newSymbolName = response.data[0].symbol + '/' + coinSymbol;
		} else {
			newSymbolName = symbolName;
		}
		var new_split_data = newSymbolName.split('/');
		var symbol_stub = {
			name: newSymbolName,
			description: '',
			type: 'crypto',
			session: '24x7',
			timezone: 'Etc/UTC',
			ticker: lpAddress,
			exchange: new_split_data[0],
			minmov: 1,
			pricescale: 100000000,
			has_intraday: true,
			intraday_multipliers: ['1', '60'],
			supported_resolution: supportedResolutions,
			volume_precision: 8,
			data_status: 'streaming',
		}

		if (new_split_data[1].match(/USD/)) {
			symbol_stub.pricescale = 100000
		}

		if (new_split_data[1].match(/BNB/)) {
			symbol_stub.pricescale = 10000
		}

		setTimeout(function () {
			onSymbolResolvedCallback(symbol_stub)
		}, 0)


		// onResolveErrorCallback('Not feeling it today')

	},
	getBars: function (symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) {
		historyProvider.getBars(symbolInfo, resolution, from, to, firstDataRequest)
			.then(bars => {
				if (bars.length) {
					onHistoryCallback(bars, { noData: false })
				} else {
					onHistoryCallback(bars, { noData: true })
				}
			}).catch(err => {
				console.log({ err })
				onErrorCallback(err)
			})

	},
	subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback) => {
	},
	unsubscribeBars: subscriberUID => {
	},
	calculateHistoryDepth: (resolution, resolutionBack, intervalBack) => {
		//optional
		// while optional, this makes sure we request 24 hours of minute data at a time
		// CryptoCompare's minute data endpoint will throw an error if we request data beyond 7 days in the past, and return no data
		return resolution < 60 ? { resolutionBack: 'D', intervalBack: '1' } : undefined
	},
	getMarks: (symbolInfo, startDate, endDate, onDataCallback, resolution) => {
		//optional
	},
	getTimeScaleMarks: (symbolInfo, startDate, endDate, onDataCallback, resolution) => {
		//optional
	},
	getServerTime: cb => {
	}
}
