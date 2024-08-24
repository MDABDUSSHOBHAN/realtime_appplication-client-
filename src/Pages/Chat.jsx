import React, { useEffect, useState,useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled  from 'styled-components';
import { allUsersRoute,host } from "../utils/APIRoutes";
import axios from 'axios';
import { io } from "socket.io-client";
import Contact from '../component/Contact';
import Welcome from '../component/Welcome';
import Chatcontainer from '../component/Chatcontainer';


const Chat = () => {

    const socket = useRef();

    const [contacts, setContacts] = useState([]);
    const [currentChat, setCurrentChat] = useState(undefined);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [loading, setLoading] = useState('');
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchCurrentUser = async () => {
          try {
            const userFromLocalStorage = localStorage.getItem('chat-app');
            if (userFromLocalStorage) {
              const parsedUser = JSON.parse(userFromLocalStorage);
              setCurrentUser(parsedUser);
              setLoading(true);
            } else {
              // Handle case where 'chat-app' is not found in localStorage
              navigate("/login");
            }
          } catch (error) {
            console.error('Error fetching current user:', error);
            // Handle error if needed
          }
        };
      
        fetchCurrentUser();
      }, []);


      //socket emplement....

      useEffect(() => {
        if (currentUser) {
          socket.current = io(host);
          socket.current.emit("add-user", currentUser.user._id);
        }
      }, [currentUser]);




    //this is another useeffect...


    useEffect(() => {
        const fetchContacts = async () => {
          if (currentUser) {
            console.log(currentUser.user._id);
            if (currentUser.isAvatarImageSet) {
              try {
                const response = await axios.get(`${allUsersRoute}/${currentUser.user._id}`);
                setContacts(response.data);
              } catch (error) {
                console.error('Error fetching contacts:', error);
                // Handle error if necessary
              }
            } else {
              navigate("/setAvatar");
            }
          }
        };
    
        fetchContacts();
      }, [currentUser, setContacts]);
      








   



    //This is for display....
    




  















      const handleChatChange = (chat) => {
        setCurrentChat(chat);
      };


    return (
        <Container>
            <div className='container'>
        
            <Contact
             contacts={contacts} 
             currentUser={currentUser}
            changeChat={handleChatChange}
             
            
            >


            </Contact>

            {

      loading &&   currentChat === undefined ?(

                <Welcome 
               
                currentUser={currentUser}
                 ></Welcome>
              ):<Chatcontainer currentUser = {currentUser}  currentChat={currentChat} socket ={socket} ></Chatcontainer>
            }
           


            </div>
          
        </Container>
    );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;