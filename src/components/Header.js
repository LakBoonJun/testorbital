import {useState } from "react";

function Header() {
  return (
    <header>
    <div className="Header" style={{ fontSize:30 ,  backgroundColor: 'limegreen'}}>
      <h1>🍔AXPYREE🍔</h1>
        <OverviewBox />
      </div>
    </header>
  );
}

function OverviewBox() {
  const [name, setName] = useState("...");
  return (
    <div className="HeaderBox" style={{ fontSize:22 }}>
      <h2>Overview</h2>
      <p>
        Welcome back {" "}
        <strong
          role="button"
          onClick={() => {
            const newName = prompt("What is your name?", name);
            setName(newName);
            window.localStorage.setItem("name", newName);
          }}
        >
          {name || "<set a name>"}
        </strong>
        !
      </p>
    </div>
  );
}


export default Header;