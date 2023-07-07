import { useEffect, useState } from "react";
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3000')

function App() {

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const [room, setRoom] = useState("");
  const [username, setUsername] = useState("")

  const joinRoom = () => {
    if(room !== "" && username !== ""){
socket.emit('join_room', room)
    }
  }




  

  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (inputText.trim() !== '') {
      const chatData = {
room:room, 
author: username,
time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
      }
      await socket.emit('send_msg', chatData);
      setInputText('');
    }
  };

  useEffect(() => {
    socket.on('receive_msg', (data) => {
      console.log(data)
    })
  }, []);

  return (
    <div className="m-0 pb-12">
<div>
<h3>
  Join Chat Room
</h3>
<input type="text" placeholder="John..." onChange={(event)=>{setUsername(event.target.value)}} />
<input type="text" placeholder="Room Id..." onChange={(event)=>{setRoom(event.target.value)}} />
<button onClick={joinRoom}>
  Join A Room
</button>
</div>
  

      <ul className="p-0 m-0 list-none" id="messages">
        {messages.map((message, index) => (
          <li className="py-2 px-4" key={index}>{message}</li>
        ))}
      </ul>
      <form className="bg-zinc-100 backdrop-blur-md p-1 flex h-12 fixed bottom-0 left-0 right-0" id="form" onSubmit={handleSubmit}>
        <input
        className="border-none py-0 px-4 flex-grow rounded-[32px] m-1 focus:outline-none"
          id="input"
          type="text"
          autoComplete="off"
          value={inputText}
          onChange={handleChange}
        />
        <button className="bg-[#333] border-none py-0 px-4 m-1 rounded outline-none text-[#fff]" type="submit">Send</button>
      </form>
    </div>
  )
}

export default App
