

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Reg from './Pages/Reg'
import Login from './Pages/Login'
import Chat from './Pages/Chat'
import Avatar from './Pages/Avatar'



function App() {
 

  return (
    <>
   
      <BrowserRouter>
      <Routes>
      <Route path='/register' element ={<Reg></Reg>}></Route>
      <Route path='/login' element ={<Login></Login>}></Route>
      <Route path='/setAvatar' element ={<Avatar></Avatar>}></Route>
      <Route path='/' element ={<Chat></Chat>}></Route>
    
      


      </Routes>
      
      </BrowserRouter> 
  
  
     
     
    </>
  )
}

export default App
