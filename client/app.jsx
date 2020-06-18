import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./sub-components/Home.jsx";
import Login from "./sub-components/Login.jsx";
import Register from "./sub-components/Register.jsx";
import Dashboard from "./sub-components/Dashboard.jsx";
import Room from "./sub-components/Room.jsx";
import io from 'socket.io-client';

function App() {
    const [socket, setSocket] = React.useState(null);

    // const setupSocket = () => {
    //     const token = localStorage.getItem("userId");
    //     if (token && !socket) {
    //         const newSocket = io("http://localhost:1234", {
    //             query: {
    //                 userId: localStorage.getItem("userId"),
    //             },
    //         });

    //         newSocket.on("disconnect", () => {
    //             setSocket(null);
    //             // setTimeout(setupSocket, 3000);
    //             // makeToast("error", "Socket Disconnected!");
    //         });

    //         newSocket.on("connect", () => {
    //             // makeToast("success", "Socket Connected!");
    //         });

    //         setSocket(newSocket);
    //     }
    // };

    // React.useEffect(() => {
    //     //setupSocket();
    // }, []);


    // function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact={true} path="/" component={Home} />
                <Route path="/login" render={props => <Login />} />
                <Route path="/register" component={Register} />
                <Route path="/dashboard" render={props => <Dashboard {...props} socket={socket} />} />
                <Route path="/chatroom/:id" render={props => <Room {...props} socket={socket} />} />
            </Switch>
        </BrowserRouter>
    );
    // }
}

export default App;