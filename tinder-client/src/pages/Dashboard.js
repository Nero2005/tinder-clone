import TinderCard from "react-tinder-card";
import { useState } from "react";
import { ChatContainer } from "../components/ChatContainer";
import axios from "axios";

export const Dashboard = () => {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/user?userId=`);
      setUser(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  getUser();

  const characters = [
    {
      name: "Richard Hendricks",
      url: "https://picsum.photos/400",
    },
    {
      name: "Erlich Bachman",
      url: "https://picsum.photos/400",
    },
    {
      name: "Monica Hall",
      url: "https://picsum.photos/400",
    },
    {
      name: "Jared Dunn",
      url: "https://picsum.photos/400",
    },
    {
      name: "Dinesh Chugtai",
      url: "https://picsum.photos/400",
    },
  ];
  const [lastDirection, setLastDirection] = useState();

  const swiped = (direction, nameToDelete) => {
    console.log("removing: " + nameToDelete);
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  return (
    <div className="dashboard">
      <ChatContainer />
      <div className="swipe-container">
        <div className="card-container">
          {characters.map((character) => (
            <TinderCard
              className="swipe"
              key={character.name}
              onSwipe={(dir) => swiped(dir, character.name)}
              onCardLeftScreen={() => outOfFrame(character.name)}
            >
              <div
                style={{ backgroundImage: "url(" + character.url + ")" }}
                className="card"
              >
                <h3>{character.name}</h3>
              </div>
            </TinderCard>
          ))}
        </div>
        <div className="swipe-info">
          {lastDirection ? <p>You swiped {lastDirection}</p> : <p />}
        </div>
      </div>
    </div>
  );
};
