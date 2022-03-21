import { useState } from 'react';

function ConversionForm(props) {

	const { options, convert, errors } = props;
	const [ amount, updateAmount ] = useState(0);
	const [ base, updateBase ] = useState('default');
	const [ target, updateTarget ] = useState('default');

	function switchCurrencyOrder() {

		if ( base === "default" || target === "default" ) { 
			return;
		}

		const newBase = target;
		const newTarget = base;

		updateBase(newBase);
		updateTarget(newTarget);
	}

	return (
		<div className='card currency-pair p-4'>
			<h2>Choose a currency to convert:</h2>
			<form>
				<div className='input-wrapper row'>
					<div className='col-sm-12 col-md-3'>
						<input
							placeholder='Amount'
							className='col-12'
							type='number'
							step='0.01'
							min='0'
							onChange={ event => updateAmount(event.target.value) }
						/>
					</div>
					<div className='col-sm-12 col-md-4'>

						<select 
							id='base-currency'
							className='col-12' 
							value={base}
							onChange={ event => updateBase(event.target.value) }
						>

							<option value='default' disabled hidden>From</option>
							{ options && Object.keys(options).map((key, index) => {
								return <option key={index} value={key}>{ key } - { options[key] }</option>
							})}

						</select>
					</div>
					<div className='col d-flex switch-currency'>
						<img 
							alt='Swtich currency order.' 
							width='40' 
							height='40' 
							src={process.env.PUBLIC_URL + '/double-arrow.svg'} 
							className='switch d-block mx-auto'
							onClick={switchCurrencyOrder}
						/>
					</div>
					<div className='col-sm-12 col-md-4'>

						<select 
							id='target-currency' 
							className='col-12' 
							value={target}
							onChange={ event => updateTarget(event.target.value) }
						>

							<option value='default' disabled hidden>To</option>
							{ options && Object.keys(options).map((key, index) => {
								return <option key={index} value={key}>{ key } - { options[key] }</option>
							})}

						</select>
					</div>
				</div>
				<p className='error-message'>
					{errors}
				</p>
				<input
					type='submit'
					value='Convert'
					className='d-block mt-3 mx-auto btn btn-primary'
					onClick={(e) => convert(e, amount, base, target)}
				/>
			</form>
		</div>
	);
}

export default ConversionForm;