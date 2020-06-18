import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const [chatrooms, setChatrooms] = React.useState([]);
    const chatroomNameRef = React.createRef();

    const getChatrooms = () => {
        axios
            .get("http://localhost:1234/chatroom", {
                // headers: {
                // Authorization: "Bearer " + localStorage.getItem("CC_Token"),
                // },
            })
            .then((response) => {
                setChatrooms(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const addRoom = () => {
        const name = chatroomNameRef.current.value
        axios
            .post("http://localhost:1234/chatroom/", {
                name,
            })
            .then(() => {
                getChatrooms();
                chatroomNameRef.current.value = ""
                // alert("Room added");
            })
            .catch((err) => {
                // console.log("looks like we have an error: ", err);
                alert("Room already exists");
            });
    };


    // console.log(chatrooms)
    React.useEffect(() => {
        getChatrooms();
    }, []);

    return (
        <div className="card">
            <div className="cardHeader">Chatrooms</div>
            <div className="cardBody">
                <div className="inputGroup">
                    <label htmlFor="chatroomName">Chatroom Name</label>
                    <input
                        type="text"
                        name="chatroomName"
                        id="chatroomName"
                        placeholder="Enter name"
                        ref={chatroomNameRef}
                    />
                </div>
            </div>
            <button onClick={addRoom}> Create Chatroom</button>
            <div className="chatrooms">
                {chatrooms.map((chatroom) => (
                    <div key={chatroom._id} className="chatroom">
                        <div>{chatroom.name}</div>
                        <Link to={`/chatroom/${chatroom._id}?roomName=${chatroom.name}`} style={{ textDecoration: 'none' }}>
                            <div className="join">Join</div>
                        </Link>
                    </div>
                ))}
            </div>
        </div >
    );
};

export default Dashboard;