import React from 'react';
import Chart from 'chart.js/auto';

class HistoryChart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};

		// Creat a chart ref.
		this.chartRef = React.createRef();
		this.buildChart = this.buildChart.bind(this);

	}

	buildChart(historical_data) {

		// Parse data
		const dateLabels = Object.keys(historical_data);
		const rateLabels = Object.values(historical_data).map(rate => Object.values(rate)[0]);

		if (typeof this.chart !== "undefined") {
			this.chart.destroy();
    	}
    
    	this.chart = new Chart(this.chartRef.current.getContext("2d"), {
      		type: 'line',
      		data: {
        		labels: dateLabels,
        		datasets: [
          			{
            			label: '',
            			data: rateLabels,
            			fill: false,
            			tension: 0,
          			}
        		]
      		},
      		options: {
        		responsive: true,
        		borderColor: '#003D7A',
        		plugins: {
        			legend: {
        				display: false
        			}
        		}
      		}
    	});

	}

	componentDidUpdate() {
		if (this.props.data) {
			this.buildChart(this.props.data.rates);
		}
	}

	render() {

		return (
			<div>
				<div className='bg-overlay'></div>
				<div className={`chart card ${ this.props.data ? "" : "d-none"}`}>
					<h2>30 Day Conversion History from { this.props.baseCurrency } to { this.props.targetCurrency }</h2>
					<canvas ref={ this.chartRef } />
					<div className='loader'></div>
				</div>
			</div>
		);
	}

}

export default HistoryChart;