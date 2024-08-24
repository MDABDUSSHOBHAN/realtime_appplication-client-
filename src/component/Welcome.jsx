import styled from "styled-components";
//import Robot from "../assets/robot.gif";
import Robot from "../assets/robot.gif";
const Welcome = ({currentUser}) => {
    //console.log(currentUser.user.username);
    console.log(currentUser);
    return (
        <div>
            <Container>
      <img src={Robot} alt="" />
      <h1>
        Welcome, <span>{currentUser.user.username}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
        </div>
    );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;
export default Welcome;