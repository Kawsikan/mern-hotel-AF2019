import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/navBar/navBar';
import Categories from './components/categories/categories';
import Rooms from './components/rooms/rooms';
import CreateRooms from './components/createRoom/createRoom';
import CategoryRooms from './components/categories/categoryRooms';


export default function App() {
    return (
        <Router>
            <NavBar />
            <section>
                <Switch>
                    <Route path="/create-room" component={CreateRooms} />
                    <Route path="/rooms" component={Rooms} />
                    <Route path="/:id" component={CategoryRooms} />
                    <Route path="/" component={Categories} exact />
                </Switch>
            </section>
        </Router>
    )
}