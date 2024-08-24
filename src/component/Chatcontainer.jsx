import axios from "axios";
import React, { useEffect,  useRef,  useState } from 'react';
import styled from "styled-components";
import Logout from './Logout';
import Chatinput from './Chatinput';
import Messages from './Messages';
import { v4 as uuidv4 } from "uuid";
import {  getMessageRoute, sendMessageRoute } from "../utils/APIRoutes";


const Chatcontainer = ({ currentChat, currentUser,socket }) => {








//// other
const [messages, setMessages] = useState([]);
console.log(currentChat)
// This is for socket io emplementation....
const scrollRef = useRef();
const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if(currentChat){
       
          const response = await axios.post(getMessageRoute, {
            from: currentUser.user._id,
            to: currentChat._id,
          });

    
        setMessages(response.data); // Assuming the response contains the messages in `response.data`
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [currentUser, currentChat]); // Adding dependencies to re-fetch messages when these props change

  console.log(messages);






 const handleSendMsg = async (msg) => {
    

    try {

      const response = await axios.post(sendMessageRoute, {
        from: currentUser.user._id,
        to: currentChat._id,
        message: msg,
      });

      //This is also for socket coding section of project..

      socket.current.emit("send-msg", {
        to: currentUser.user._id,
        from: currentChat._id,
        message: msg,
      });
      const msgs = [...messages];
      msgs.push({ fromSelf: true, message: msg });
      setMessages(msgs);
// End of the socket.....
      console.log('Message sent successfully:', response.data);

    } catch (error) {

      console.error('Error sending message:', error);

    } 
  };

  // This is for socket Effect.....
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        console.log(msg);
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);







  return (
    <>
      {

        currentChat && (

          <Container>
            <div className="chat-header">
              <div className="user-details">
                <div className="avatar">
                  <img
                    src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                    alt="No"
                  />
                </div>
                <div className="username">
                  <h3>{currentChat.username}</h3>
                </div>

              </div>
              <Logout></Logout>
            </div>

       <div className="chat-messages">

       {
        messages.map( message => {

          return(


            <div ref={scrollRef} key={uuidv4()}>
        
            <div className={`message ${message.fromSelf ? "sended":"Revived"}`}>
              <div>
                <p className="content">
                  {message.message}
                </p>
              </div>
            </div>
            </div>
          
          )
        })
       }
        
      </div>      
          
            {/* This is for chat input section of my project..... */}
            <Chatinput handleSendMsg={handleSendMsg} />

          </Container>






        )
      }





    </>
  );
};


const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 100%;
   
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 90%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;




export default Chatcontainer;