import "./styles.css";
import * as React from "react";
import axios from "axios";
const { useEffect, useState } = React;

async function getUser() {
  return axios
    .get("https://randomuser.me/api")
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
}

const getFullUserName = (userinfo) => {
  const {
    name: { first, last }
  } = userinfo;
  return `${first}${last}`;
};

export default function App() {
  const [increment, setIncrement] = useState(0);
  const [userdata, setUserdata] = useState("");
  const [userInfos, setUserInfos] = useState([]);

  useEffect(() => {
    getUser().then((randomData) => {
      setUserdata(JSON.stringify(randomData, null, 2) || "Not found");
      setUserInfos(randomData.results);
    });
  }, []);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <p>{increment}</p>
      <button
        onClick={() => {
          setIncrement(increment + 1);
        }}
      >
        Increse Counter
      </button>
      {userInfos.map((user) => (
        <div>
          <p>{user.name.first}</p>
          <p>{user.name.last}</p>
          <img alt="username" src={user.picture.thumbnail} />
        </div>
      ))}
      <pre>{userdata}</pre>
    </div>
  );
}
