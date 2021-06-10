import React from 'react';
import axios from 'axios';

export default class Rooms extends React.Component {

    constructor(props) {
        super(props);
        this.state = { rooms: [] }
    }

    componentDidMount() {
        axios.get('http://localhost:8080/room/')
            .then(response => {
                this.setState({ rooms: response.data.data });
            })
    }


    render() {
        return (
            <div className="container">
                <h1>Rooms</h1>
                {this.state.rooms.length > 0 && this.state.rooms.map((item, index) => (
                    <div key={index} className="card mb-3">
                        <div className="p-3" >
                            <h4>Room Code: {item.code}</h4>
                            <h5>Room Amount: {item.amount}</h5>
                            <h5>Room Wing: {item.wing}</h5>
                            <h5>Room Pax: {item.pax}</h5>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}