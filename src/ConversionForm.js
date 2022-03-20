import { useState } from 'react';

function ConversionForm(props) {

	const { options, convert } = props;
	const [ amount, updateAmount ] = useState(0);
	const [ base, updateBase ] = useState('');
	const [ target, updateTarget ] = useState('');

	return (
		<div className='card currency-pair p-4'>
			<form>
				<div className='input-wrapper row'>
					<div className='col-sm-4 col-md-4'>
						<input
							placeholder='Amount'
							className='col-12'
							type='number'
							step='0.01'
							min='0'
							onChange={ event => updateAmount(event.target.value) }
						/>
					</div>
					<div className='col-sm-4 col-md-4'>

						<select 
							id='base-currency'
							className='col-12' 
							defaultValue='default'
							onChange={ event => updateBase(event.target.value) }
						>

							<option value='default' disabled hidden>From</option>
							{ options && Object.keys(options).map((key, index) => {
								return <option key={index} value={key}>{ key } - { options[key] }</option>
							})}

						</select>
					</div>
					<div className='col-sm-4 col-md-4'>

						<select 
							id='target-currency' 
							className='col-12' 
							defaultValue='default'
							onChange={ event => updateTarget(event.target.value) }
						>

							<option value='default' disabled hidden>To</option>
							{ options && Object.keys(options).map((key, index) => {
								return <option key={index} value={key}>{ key } - { options[key] }</option>
							})}

						</select>
					</div>
				</div>
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