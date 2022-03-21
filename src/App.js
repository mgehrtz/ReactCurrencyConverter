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

        // Validation
        if (!amt || base === 'default' || target === 'default') {
            
            // Add error to state
            this.setState({ error: 'Please fill out all fields before continuing.'});

            // Stop
            return;   
        } else {

            this.setState({ error: null });

        }

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
          <div className='app'>
            <header className='top-bar'>
                <h1 className='brand'>Currency Exchange Rates</h1>
            </header>
            <div className='main-content'>
                <ConversionForm options={ currencies } convert={this.convertCurrency} errors={this.state.error} />
                <RateList converted_data={ this.state.converted_data } target={this.state.target}/>
            </div>
            <footer>
                <p>Follow me</p>
                <div className='social-wrapper d-flex'>
                    <a href='https://github.com/mgehrtz' target='_blank' rel='noreferrer'>
                        <img alt='View me on Github' width='20' height='20' src={process.env.PUBLIC_URL + '/github.svg'} className='icon'/>
                    </a>
                    <a href='https://www.linkedin.com/in/michael-gehrtz-96776a1a8/' target='_blank' rel='noreferrer'>
                        <img alt='View my LinkedIn profile' width='20' height='20' src={process.env.PUBLIC_URL + '/linkedin.svg'} className='icon'/>
                    </a>
                </div>
            </footer>
          </div>
        )
    }
}

export default App;
