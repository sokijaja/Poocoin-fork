import React from "react";
import { TradingViewEmbed, widgetType } from "react-tradingview-embed";
import "react-vis/dist/style.css";
// import "../css/chart.css";

class Chart extends React.Component {
  state = {
    domData: [],
    times: [],
    high: [],
    low: [],
    chartData: [],
    dominanceData: [],
    globalDominance: [],
    query: "BTC",
    leaderboard: [],
    addressData: "",
    symbol: "",
    globalDom: [],
    socialData: []
  };

  componentDidMount() {
    this.loadChartData();
  }

  loadChartData = async () => {
    const response = await fetch(
      `https://api.lunarcrush.com/v2?data=assets&key=688o9wuzvzst3uybpg6eh&symbol=${this.state.query}&data_points=90&interval=day`
    );
    const data = await response.json();
    const dominanceData = [];
    const globalDominance = [];
    const dataArray = [];
    const socialDataRaw = [];
    const bulkData = data["data"][0]["timeSeries"];

    bulkData.map(
      (y) =>
        dataArray.push({
          x: y.time * 1000,
          y: y.market_cap
        }),
      bulkData.map(
        (y) =>
          dominanceData.push({
            x: y.time * 1000,
            y: y.market_cap_global * (y.market_dominance / 100),
            z: y.market_dominance
          }),
        bulkData.map((y) =>
          socialDataRaw.push({
            x: y.time * 1000,
            y: y.social_score,
            z: y.social_dominance
          })
        ),
        bulkData.map((y) =>
          globalDominance.push({
            x: y.time * 1000,
            y: y.market_cap_global
          })
        )
      )
    );

    this.setState({
      chartData: dataArray,
      dominanceData,
      globalDominance,
      socialDataRaw
    });
    this.setState({ symbol: this.state.query });
  };

  handleInputChange = () => {
    this.setState({
      query: this.search.value
    });
  };

  render() {
    const {
      query,
    } = this.state;

    return (
      <div>
        <div className="charty">
          {query.length > 2 ? (
            <TradingViewEmbed
              widgetType={widgetType.ADVANCED_CHART}
              widgetConfig={{
                interval: "1D",
                colorTheme: "dark",
                width: "100%",
                height: '300px',
                symbol: query + "USD",
                studies: [
                  // "MACD@tv-basicstudies",
                  // "StochasticRSI@tv-basicstudies",
                  "TripleEMA@tv-basicstudies"
                ]
              }}
            />
          ) : (
            "BTCUSD"
          )}
        </div>
      </div>
    );
  }
}

export default Chart;