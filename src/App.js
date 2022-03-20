import React from 'react'
import './App.css';
import ConversionForm from './ConversionForm';
import RateList from './RateList';



class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};

        this.convertCurrency = this.convertCurrency.bind(this);
    }

    // Fetch all currencies from API  and update state
    componentDidMount() {
        fetch(`https://api.frankfurter.app/currencies`)
            .then(resp => resp.json())
            .then((currencies) => {

                // Save data to const and update state
                this.setState({currencies});

            });
    }

    // Fetch the conversion rate from API and update state
    convertCurrency(event, amt, base, target) {

        // Prevent page relaod.
        event.preventDefault();

        // Ping API
        fetch(`https://api.frankfurter.app/latest?amount=${amt}&from=${base}`)
            .then(resp => resp.json())
            .then((converted_data) => {
                this.setState({converted_data});
                this.setState({target});
        });

    }

    // Render App
    render() {
        const { currencies } = this.state;
        return (
          <div className='app m-5'>
            <header className='top-bar'>
                <h1 className='brand'>Currency Exchange Rates</h1>
            </header>
            <div className='main-content'>
                <ConversionForm options={ currencies } convert={this.convertCurrency}/>
                <RateList converted_data={ this.state.converted_data } target={this.state.target}/>
            </div>
            <footer>
                <p>Follow me</p>
                <div className='social-wraper d-flex'>
                    <a href='#'>
                        <img width='20' height='20' src={process.env.PUBLIC_URL + '/github.svg'} className='icon'/>
                    </a>
                    <a href='#'>
                        <img width='20' height='20' src={process.env.PUBLIC_URL + '/linkedin.svg'} className='icon'/>
                    </a>
                </div>
            </footer>
          </div>
        )
    }
}

export default App;
