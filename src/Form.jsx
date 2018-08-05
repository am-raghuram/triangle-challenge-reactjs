import React, { Component } from 'react';

var polyStyle = {
    fill: '#3a9ab7',
    stroke: '#1a5178',
    strokeWidth: '1'

};

class Form extends Component {

    constructor(props) {
        super(props);
        this.state = {
            side1: '',
            side2: '',
            side3: '',
            result: '',
            polyPoints: '',
            submit: false,
            validTriangle: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        console.log(event.target.id);
        this.setState({
            [name]: value
        });

    }

    handleSubmit(event) {
        this.setState({ submit: true });
        // alert('A name was submitted: ' + this.state.side1);
        var x = this.state.side1;
        var y = this.state.side2;
        var z = this.state.side3;

        var sorted = [x, y, z].sort((a, b) => {
            return b - a;
        });


        x = sorted[0];
        y = sorted[1];
        z = sorted[2];

        console.log(x + "---" + y + "---" + z);


        var triangle = {
            side1: parseFloat(x),
            side2: parseFloat(y),
            side3: parseFloat(z),
            validTriangle: false,
            type: function () {

                if ((this.side1 > 0 && this.side2 > 0 && this.side3 > 0) && (this.side1 <= (this.side2 + this.side3))) {
                    
                    this.validTriangle = true;
                    if (this.side1 === this.side2 && this.side2 === this.side3 && this.side3 === this.side1) {
                        return "Equilateral";

                    } if (this.side1 === this.side2 || this.side2 === this.side3 || this.side3 === this.side1) {
                        return "Isosceles";

                    } if ((this.side1 !== this.side2) && (this.side2 !== this.side3)) {
                        return "Scalene";

                    }

                } else {
                    this.validTriangle = false
                    return "Side lengths are invalid to form a triangle !";

                }
            },
            height: function () {
                var s = ((this.side1 + this.side2 + this.side3) / 2);
                var A = Math.sqrt(s * (s - this.side1) * (s - this.side2) * (s - this.side3));
                var h = parseFloat(((2 * A) / this.side1));
                return h;
            },
            short: function () {
                var s2s = Math.pow(this.side2, 2);
                var h2 = Math.pow(this.height(), 2);
                var z1 = parseInt(Math.sqrt(s2s - h2), 10);
                return z1;
            }
        };

        this.setState({ result: triangle.type() });
        console.log(triangle.validTriangle);
        this.setState({validTriangle: triangle.validTriangle});

        if (triangle.validTriangle) {
            var x1 = x;
            var x2 = triangle.short();
            var y2 = triangle.height();
            var points = '0,0 ' + x1 + ",0 " + x2 + "," + y2;
            this.setState({ polyPoints: points });
        }

        event.preventDefault();
    }

    render() {
        return (
            <div>
                <form data-ts="Form" id="triangle-input" onSubmit={this.handleSubmit}>
                    <fieldset>

                        <label className={(this.state.submit && this.state.side1 === '' ? 'ts-error' : 'input-validation')}>
                            <label >Side X:</label>
                            <input type="number" name="side1" id="side1" className="form-control" required value={this.state.side1} onChange={this.handleChange} />
                        </label>
                        <dl className={(this.state.submit && this.state.side1 ==='' ? 'ts-errors' : 'ts-errors-hide')}>
                            <dt>Error: Enter a numeric value </dt>
                        </dl>

                    </fieldset>
                    <fieldset>
                        <label className={(this.state.submit && this.state.side2 === '' ? 'ts-error' : 'input-validation')}>
                            <label >Side Y:</label>
                            <input type="number" name="side2" id="side2" className="form-control" required value={this.state.side2} onChange={this.handleChange} />
                        </label>
                        <dl className={(this.state.submit && this.state.side2 === '' ? 'ts-errors' : 'ts-errors-hide')}>
                            <dt>Error: Enter a numeric value </dt>
                        </dl>

                    </fieldset>
                    <fieldset>
                        <label className={(this.state.submit && this.state.side3 === '' ? 'ts-error' : 'input-validation')}>
                            <label>Side Z:</label>
                            <input type="number" name="side3" id="side3" className="form-control" required value={this.state.side3} onChange={this.handleChange} />
                        </label>
                        <dl className={(this.state.submit && this.state.side3 === '' ? 'ts-errors' : 'ts-errors-hide')}>
                            <dt>Error: Enter a numeric value </dt>
                        </dl>

                    </fieldset>
                    <button type="submit" data-ts="Button" id="check-triangle" className="ts-primary">
                        <span>Submit</span>
                    </button>

                </form>
                <div id="result" className={this.state.result === "" ? 'hide' : ''}>
                    <h3>Result:
					<span id="type" className="text-info"> {this.state.result}</span>
                    </h3>
                    <div id="picture" className={!this.state.validTriangle  ? 'hide' : ''}>
                        <svg height="300" width="400">
                            <polygon style={polyStyle} points={this.state.polyPoints} />
                        </svg>
                    </div>
                </div>
            </div>

        );
    }
}

export default Form;