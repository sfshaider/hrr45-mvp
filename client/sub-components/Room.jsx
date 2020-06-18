import React from 'react';
import { withRouter } from "react-router-dom";
import io from 'socket.io-client';



const Chat = ({ match, location }) => {
    const userId = localStorage.getItem("userId");
    const socket = io('http://localhost:1234', { query: { userId } });
    const chatRoomName = new URLSearchParams(location.search).get('roomName');
    const chatroomId = match.params.id;
    const [messages, setMessages] = React.useState([]);
    const messageRef = React.useRef();
    //const [userId, setUserId] = React.useState("");



    const sendMessage = () => {
        if (socket) {
            socket.emit("chatroomMessage", {
                chatroomId,
                message: messageRef.current.value,
            })
            messageRef.current.value = "";
        }
    };

    /*React.useEffect(() => {
        const token = localStorage.getItem("userId");
        if (token) {
            //const payload = JSON.parse(atob(token.split(".")[1]));
            console.log('paylll==>>>', token)
            setUserId(token);
        }
        if (socket) {
            socket.on("newMessage", (message) => {
                //                const newMessages = [...messages, message];

            });
        }
    }, [messages]);*/

    React.useEffect(() => {
        if (socket) {
            socket.emit("joinRoom", { chatroomId }, (existingMessages) => {
                setMessages(existingMessages);
                const chatroomContentDiv = document.getElementById('chatroomContent');
                chatroomContentDiv.scrollTop = chatroomContentDiv.scrollHeight;
            });

            socket.on('newMsg', (message) => {
                setMessages(prevMsgs => [...prevMsgs, message])
                const chatroomContentDiv = document.getElementById('chatroomContent');
                chatroomContentDiv.scrollTop = chatroomContentDiv.scrollHeight;
            })
        }

        return () => {
            if (socket) {
                socket.emit("leaveRoom", {
                    chatroomId,
                });
            }
        };
    }, []);

    return (
        <div className="chatroomPage">
            <div className="chatroomSection">
                <div className="cardHeader">{chatRoomName}</div>
                <div id="chatroomContent" className="chatroomContent">
                    {messages.map((message, i) => (
                        <div key={i} className="message">
                            <span
                                className={
                                    userId === message.user._id ? "ownMessage" : "otherMessage"
                                }
                            >
                                {message.user.name}:
                      </span>{" "}
                            {message.message}
                        </div>
                    ))}
                </div>
                <div className="chatroomActions">
                    <div>
                        <input
                            type="text"
                            name="message"
                            placeholder="Send a message!"
                            ref={messageRef}
                        />
                    </div>
                    <div>
                        <button className="join" onClick={sendMessage}>
                            Send
                    </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withRouter(Chat);
