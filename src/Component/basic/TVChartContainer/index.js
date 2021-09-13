import React, { useEffect, useState } from 'react';
import Datafeed from './api'
import { makeStyles } from '@material-ui/core/styles';

function getLanguageFromURL() {
	const regex = new RegExp('[\\?&]lang=([^&#]*)');
	const results = regex.exec(window.location.search);
	return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

const useStyles = makeStyles({
	ChartContainer: {
		height: '290px',
		display: 'flex'
	}
});
export default function TVChartContainer(props) {
	const { tokenName, coinName } = props;
	const classes = useStyles();
	// const containerId = 'tv_chart_container' + '_' + Math.random();
	const [containerId, setContainerId] = useState();
	const [tokenSymbol, setTokenSymbol] = useState('poocoin');
	useEffect(() => {
		setContainerId('tv_chart_container' + '_' + Math.random());
		setTokenSymbol(tokenName);
		console.log(coinName);
		console.log(tokenSymbol);
	}, [tokenName])
	const widgetOptions = {
		debug: false,
		symbol: tokenSymbol + '/' + coinName,
		datafeed: Datafeed,
		interval: '15',
		container_id: containerId,
		library_path: '/charting_library/',
		locale: getLanguageFromURL() || 'en',
		disabled_features: ['use_localstorage_for_settings'],
		enabled_features: ['study_templates'],
		charts_storage_url: 'https://saveload.tradingview.com',
		charts_storage_api_version: '1.1',
		client_id: 'tradingview.com',
		user_id: 'public_user_id',
		fullscreen: false,
		autosize: false,
		studies_overrides: {},
		overrides: {
			// "mainSeriesProperties.showCountdown": true,
			"paneProperties.background": "#131722",
			"paneProperties.vertGridProperties.color": "#363c4e",
			"paneProperties.horzGridProperties.color": "#363c4e",
			"symbolWatermarkProperties.transparency": 90,
			"scalesProperties.textColor": "#AAA",
			"mainSeriesProperties.candleStyle.wickUpColor": '#336854',
			"mainSeriesProperties.candleStyle.wickDownColor": '#7f323f',
		}
	};
	if (containerId != undefined) {
		console.log(widgetOptions);
		window.TradingView.onready(() => {
			const widget = window.tvWidget = new window.TradingView.widget(widgetOptions);
			widget.onChartReady(() => {
				console.log('Chart has loaded!')
			});
		});
	}
	console.log(containerId);
	return (
		<div>
			<div
				id={containerId}
				className={classes.ChartContainer}
			/>
		</div>
	);
}
