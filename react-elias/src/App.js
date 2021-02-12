import logo from './logo.svg';
import './App.css';

// this imports a hook. react has many hook. gives ability to use parts of react 
import {useState} from "react"

var message = "hello world"

function App() {

  const [message, setMessage] = useState("hello world!")

  const handleClick = ()=>{
    setMessage=("goodbye universe")
  }
  return (
    // only one child (the div below) but you can wrap everything is another div. React fragment empty tag. need element if you want styling on it 
    <>
    <div className ="night-mode"> 
      <h1>{message}</h1>
      <button onClick={(handleClick)}>change message</button>
      <img></img>
    </div>
    </>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
