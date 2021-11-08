import logo from './logo.svg';
import './App.css';
import liff from '@line/liff';
import { useState, useEffect } from 'react';

function App() {

  const [pictureUrl, setPictureUrl] = useState(logo)
  const [idToken, setIdToken] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [statusMessage, setStatusMessage] = useState("")
  const [userID, setUserID] = useState("")

  const logout = () => {
    liff.logout();
    window.location.reload();
  }

  const initLine = () => {
    // liff.init({ liffId: "1656611418-mq5eJBqr" }, ()=> {
    //   if (liff.isLoggedIn) {
    //     runApp();
    //   } else {
    //     liff.login();
    //   }
    // }, err => console.error(err));
    liff.init({liffId: "1656612490-nKdY5Drg"})
    .then(()=>{
      if (liff.isLoggedIn) {
        runApp();
      } else {
        liff.login();
      }
    }).catch((err)=>{
      console.log(err.code, err.message);
    });
  }

  const runApp = () => {
    const idToken = liff.getIDToken();
    setIdToken(idToken)
    liff.getProfile().then( profile => {
      console.log(profile)
      setDisplayName(profile.displayName)
      setPictureUrl(profile.pictureUrl)
      setStatusMessage(profile.statusMessage)
      setUserID(profile.userId)
    }).catch(err => console.error(err));
  }

  useEffect(() => {
    initLine();
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ textAlign: "center"}}>
          <h1>React with Line login</h1>
          <hr />
          <img src={pictureUrl} width="300px" height="300px" />
          <p style={{ textAlign: "left", marginLeft:"20%", marginRight:"20%", wordBreak: 'break-all' }}><b>ID token : </b> { idToken }</p>
          <p style={{ textAlign: "left", marginLeft:"20%", marginRight:"20%", wordBreak: 'break-all' }}><b>Display name : </b> { displayName }</p>
          <p style={{ textAlign: "left", marginLeft:"20%", marginRight:"20%", wordBreak: 'break-all' }}><b>Status message : </b> { statusMessage }</p>
          <p style={{ textAlign: "left", marginLeft:"20%", marginRight:"20%", wordBreak: 'break-all' }}><b>User ID : </b> { userID }</p>

          <button onClick={()=>logout()} style={{ width: "100%", height: 30}}>Logout</button>
        </div>
      </header>
    </div>
  );
}

export default App;
