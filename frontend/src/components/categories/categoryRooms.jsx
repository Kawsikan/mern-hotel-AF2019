import React from 'react';
import axios from 'axios';

export default class CategoryRooms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
            totAmount: ''
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:8080/category/${this.props.match.params.id}`)
            .then(response => {
                console.log(response.data.data )
                this.setState({ rooms: response.data.data })
            }).catch(error => {
                alert(error.message)
            })
        axios.get(`http://localhost:8080/category/amount/${this.props.match.params.id}`)
            .then(response => {
                console.log(response.data )
                this.setState({ totAmount: response.data.totAmount })
            }).catch(error => {
                alert(error.message)
            })
    }

    render() {
        return (
            <div className="container">
                <h1>Category Rooms</h1>
                <h3>Total amount: {this.state.totAmount}</h3>
                {this.state.rooms.length > 0 && this.state.rooms.map((item, index) => (
                    <div key={index} className="card mb-3">
                        <div className="p-3">
                            <h4>Room Code: {item.code}</h4>
                            <h4>Room Amount: {item.amount}</h4>
                            <h4>Room Wing: {item.wing}</h4>
                            <h4>Room Pax: {item.pax}</h4>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}