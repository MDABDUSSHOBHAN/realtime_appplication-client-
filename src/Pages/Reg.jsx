import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Form, Link } from 'react-router-dom';
import styled from "styled-components";
import logo from '../assets/logo.svg'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


import { registerRoute } from '../utils/APIRoutes';

const Reg = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();
  const toastOption = {


        position:"bottom-right",
        autoClose:1200,
        pauseOnHover:true,
        draggable:true,
        theme:"dark",
    
  }

  //this is for redirect....
  useEffect(() => {

    if(localStorage.getItem('chat-app')){
  
      navigate('/');
    }
   },[])

  


  //this is for change


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  

  const handleSubmit = (event) => {
    event.preventDefault();
  

   
    if(handleValidation()){
      console.log(formData)
      axios.post(registerRoute, formData)
      .then(response => {
       
        console.log('Data submitted successfully:', response.data);
        localStorage.setItem("chat-app",JSON.stringify(response.data));
        navigate("/");
      })
      .catch(error => {
        console.error('There was an error submitting the form:', error);
      });
    }
  };






  const handleValidation = () =>{


    const {password, confirmPassword,username,email}= formData;
    if(password!== confirmPassword){
        console.log("invalid",toast)
       toast.error("Password and confirm password should be same.",
    toastOption
       );
       return false;
    }
    else if(username.length <3){

      toast.error("Username should be grater than 3 characters",toastOption
      

      );
      return false;
    }
    else if(password.length<8){


      toast.error("Password should be equal or greater than 8 characters",
      toastOption
      );
      return false;
    }
    //this is for email
    else if(email === ""){


      toast.error("email is required",
      toastOption
      );
      return false;
    }
    
  }

  //This is anoter...

 
 


  return (
    <>
     

      <FormContainer>
        <form onSubmit = {handleSubmit} >
          <div className="brand">
            <img src= {logo} alt="" />
            <h1>snappy</h1>
          </div>
          <input
            type="text"
            className="text"
            placeholder="userName"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
            <input
            type="email"
            
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
            <input
            type="password"
            
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
            <input
            type="password"
          
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
           <button type="submit">Submit</button>
            <ToastContainer></ToastContainer>
            <span>already have an account ? <Link to = '/login'>Login</Link></span>
        </form>
      </FormContainer>
    </>
  );
};
const FormContainer = styled.div`
 height:100vh;
 width:100vw;
 display:flex;
 flex-direction:column;
 gap:1rem;
 align-items:center;
 background-color:#121224;
 .brand{
 display:flex;
 align-items:center;
 gap:1rem;
 justify-content:center;
 img{
 height:5rem;
 }
 h1{
 color:white;
 text-transform:uppercase;
 }

 
 }
 form{
 display:flex;
 flex-direction:column;
 gap:2rem;
 background-color: #00000076;
 border-radius:2rem;
 padding:3rem 5rem;
 
 input{
 background-color:transparent;
 padding:1rem;
 border:0.1 rem solid #420eff;
 border-radius:0.4rem;
 color:white;
 width:100%
 font-size:1rem;
 &:focus{
 bord}
 }
 
 }
 button{
 background-color:#997af0;
 color:white;
 padding:1rem 2rem;
 border:none;
 font-weight:bold;
 cursor:pointer;
 font-size:1rem;
 text-transform:uppercase;
 &:hover{
 background-color:4e0eff
 }
 
 }
 span{
 color:white;
 text-transform:uppercase;
 a{
 color:#4e0eff;
 text-decoration:none;
 font-weight:bold;
 
 }
 
 }
`;
export default Reg;















