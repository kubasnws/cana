import React, { Component } from 'react';

class Test extends Component {
    state = {
        localStorage: localStorage.getItem('test'),
    }

    componentDidMount() {
        // this.getLocal()
    }

    getLocal = () => {
        this.setState({
            localStorage: localStorage.getItem('test')
        });
    }

    setLocal = e => {
        const val = e.target.value

        localStorage.setItem('test', val)
        this.setState({
            localStorage: val,
        });
    }

    render() {
        const { localStorage } = this.state;
        return (
            <div>
                <h1>Strona testowa</h1>
                <div>
                    <input type="text" name="text" id="text" value={localStorage} onChange={e => this.setLocal(e)} />
                </div>
                <button onClick={this.getLocal}></button>
                <div className="result">
                    {localStorage}
                </div>
            </div>
        );
    }
}

export default Test;