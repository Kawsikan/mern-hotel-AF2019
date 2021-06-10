import React from 'react';
import Select from 'react-select';
import axios from 'axios';

const initialState = {
    code: '',
    amount: '',
    wing: '',
    pax: '',
    categories: [],
    options: [],
    selectedCategories: []
}

export default class CreateRooms extends React.Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCategorySelect = this.onCategorySelect.bind(this);
        this.state = initialState;
    }

    componentDidMount() {
        axios.get('http://localhost:8080/category/')
            .then(response => {
                this.setState({ categories: response.data.data }, () => {
                    let data = [];
                    this.state.categories.map((item, index) => {
                        let category = {
                            value: item._id,
                            label: item.name
                        }
                        data.push(category)
                    });
                    this.setState({ options: data });
                })
            })
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onCategorySelect(e) {
        this.setState({ selectedCategories: e ? e.map(item => item.value) : [] });
    }


    onSubmit(e) {
        e.preventDefault();
        let room = {
            code: this.state.code,
            amount: this.state.amount,
            wing: this.state.wing,
            pax: this.state.pax,
            categories: this.state.selectedCategories
        };
        console.log('DATA TO SEND', room)
        axios.post('http://localhost:8080/room/create', room)
            .then(response => {
                alert('Room successfully inserted')
            })
            .catch(error => {
                console.log(error.message);
                alert(error.message)
            })
    }

    render() {
        return (
            <div className="container">
            <h1>Create Room</h1>
            <form onSubmit={this.onSubmit}>
                <div className="mb-3">
                    <label htmlFor="code" className="form-label">Room Code</label>
                    <input
                        type="text"
                        className="form-control"
                        id="code"
                        name="code"
                        value={this.state.code}
                        onChange={this.onChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="amount" className="form-label">Room Amount</label>
                    <input
                        type="text"
                        className="form-control"
                        id="amount"
                        name="amount"
                        value={this.state.amount}
                        onChange={this.onChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="wing" className="form-label">Room Wing</label>
                    <input
                        type="text"
                        className="form-control"
                        id="wing"
                        name="wing"
                        value={this.state.wing}
                        onChange={this.onChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="pax" className="form-label">Room Pax</label>
                    <input
                        type="number"
                        className="form-control"
                        id="pax"
                        name="pax"
                        value={this.state.pax}
                        onChange={this.onChange}
                    />
                </div>
                <Select
                    options={this.state.options}
                    onChange={this.onCategorySelect}
                    className="basic-multi-select"
                    isMulti
                />
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
        )
    }
}