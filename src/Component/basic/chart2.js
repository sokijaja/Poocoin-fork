import React, { useEffect, useRef } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";

const Chart = (props) => {
  const chartContainerRef = useRef();
  const chart = useRef();
  const resizeObserver = useRef();

  useEffect(() => {
    chart.current = createChart(chartContainerRef.current, {
      // width: chartContainerRef.current.clientWidth,
      // height: chartContainerRef.current.clientHeight,
      width: "300px",
      height: "400px",
      layout: {
        backgroundColor: "#141722",
        textColor: "rgba(255, 255, 255, 0.9)",
      },
      grid: {
        vertLines: {
          color: "#334158",
        },
        horzLines: {
          color: "#334158",
        },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      priceScale: {
        borderColor: "#485c7b",
      },
      timeScale: {
        borderColor: "#485c7b",
      },
    });

    const candleSeries = chart.current.addCandlestickSeries({
      upColor: "#4bffb5",
      downColor: "#ff4976",
      borderDownColor: "#ff4976",
      borderUpColor: "#4bffb5",
      wickDownColor: "#838ca1",
      wickUpColor: "#838ca1",
    });

    setTimeout(async () => {
      let symbolAddress = props.symbolAddress;
      let symbolName = props.symbolName;
      if (symbolAddress == null) {
        symbolAddress = "0x20E82Ab3f8614Debc5c64fD3Bc99Cf481f82cFA5";
      }

      let date = new Date();
      let year = date.getFullYear();
      let month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      let day = date.getDate();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();

      let dateTime =
        year +
        "-" +
        month +
        "-" +
        day +
        "T" +
        hours +
        ":" +
        minutes +
        ":" +
        seconds;
      let lpAddress = '0xe859b6a32d953A0Ece0027C0fC8575571862c0BB'
      let baseLp = '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16'

      let url = "https://api2.poocoin.app/candles-bsc?to=2021-09-05T13%3A35%3A00.000Z&limit=90&lpAddress=" + lpAddress + "&interval=15m&baseLp=" + baseLp
      const response = await fetch(
        // `https://api.lunarcrush.com/v2?data=assets&key=688o9wuzvzst3uybpg6eh&symbol=ETH&data_points=90&interval=day`
        url
      );
      const data = await response.json();
      console.log(data);
      candleSeries.setData(data)
    });

  }, []);

  // Resize chart on container resizes.
  useEffect(() => {
    resizeObserver.current = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      chart.current.applyOptions({ width, height });
      setTimeout(() => {
        chart.current.timeScale().fitContent();
      }, 0);
    });

    resizeObserver.current.observe(chartContainerRef.current);

    return () => resizeObserver.current.disconnect();
  }, []);

  return (
    <div className="App" style={{ height: 300 }}>
      <div ref={chartContainerRef} className="chart-container" />
    </div>
  );
};

export default Chart;
