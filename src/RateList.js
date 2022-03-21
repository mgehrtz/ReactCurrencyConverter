function RateList(props) {

	var main_conversion_msg, classes;
	const { converted_data, target } = props;

	if (converted_data && target) {
		classes = 'rate-list card d-block';
		main_conversion_msg = `${converted_data.amount} ${converted_data.base.replaceAll('"', "")} = ${converted_data.rates[target]} ${target}`;

	} else {
		classes = 'rate-list card not-ready';
		main_conversion_msg = 'Conversion Rates';
	}


	return (
		<div className={classes}>
			<h2>{main_conversion_msg}</h2>
			<p>Nothing to see here yet. Try converting a base currency.</p>
			<ul>{converted_data && Object.keys(converted_data.rates).map((key, index) => {
				return <li key={index} className='individual-currency'>{converted_data.rates[key]} {key}</li>
			})}</ul>
		</div>
	);
}

export default RateList;