import React, { useRef } from 'react';
import './App.css';
import gptLogo from './assets/chatgpt.svg';
import addBtn from './assets/add-30.png';
import msgIcon from './assets/message.svg';
import home from './assets/home.svg';
import saved from './assets/bookmark.svg';
import rocket from './assets/rocket.svg';
import sendBtn from './assets/send.svg';
import userIcon from './assets/user-icon.png';
import gptImgLogo from './assets/chatgptLogo.svg';

import { useState,useEffect } from 'react';
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

function App() {
  const msgEnd = useRef(null);
  const [input, setInput] = useState("");
  const [messages, setmessage] = useState([
    {
        text: "Hi, I am BharatGPT, a state-of-the-art language model developed by OpenAI. I'm designed to understand and generate human-like text based on the input I received.",
        isBot: true,
    }
  ]);

  async function sendMsgtoOpenAI(message) {
    openai
      .createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      })
      .then((res) => {
        console.log(res.data.choices[0].message.content);
        console.log(typeof res.data.choices[0].message.content);
        // return res.data.choices[0].message.content
        setmessage(prevMessages => [
          ...prevMessages,
          { text: res.data.choices[0].message.content, isBot: true }
        ]);
      })
      .catch((e) => {
        console.log(e);
      });
    }

  useEffect(() => {
    msgEnd.current.scrollIntoView();
  }, [messages]);

  const handleEnter = async (e) => {
    if(e.key=== 'Enter') await handleSend();

  }
  const handleSend = async () => {
    const text = input;
    setInput('');
    setmessage(prevMessages => [
      ...prevMessages,
      { text, isBot: false }
    ]);
    try {
      sendMsgtoOpenAI(text)
    
    } catch (error) {
      console.error("Error sending message to OpenAI:",error);
  }
  
  };

  const handleQuery = async (e) => {
    const text = e.target.value;
    setmessage(prevMessages => [
      ...prevMessages,
      { text, isBot: false }
    ]);
    try {
      sendMsgtoOpenAI(text)
      
    } catch (error) {
      console.error("Error sending message to OpenAI:",error);
  }

  }

  

  return (
    <div className="App">
      <div className="sideBar">
        <div className="upperSide">
          <div className="upperSideTop"><img src={gptLogo} alt="Logo" className="logo" /><span className="brand">BharatGPT</span></div>
          <button className="midBtn" onClick={()=>{window.location.reload()}}><img src={addBtn} alt="new chat" className="addBtn" />New Chat</button>
          <div className="upperSideBottom">
            <button className="query"onClick={handleQuery} value={"What is Programming ?"}><img src={msgIcon} alt="Query" />What is Programming ?</button>
            <button className="query"onClick={handleQuery} value={"How to use an API ?"}><img src={msgIcon} alt="Query" />How to use an API ?</button>

          </div>
        </div>
        <div className="lowerSide">
          <div className="listItems"><img src={home} alt="Home" className="listItemsImg" />Home</div>
          <div className="listItems"><img src={saved} alt="Saved" className="listItemsImg" />Saved</div>
          <div className="listItems"><img src={rocket} alt="Upgrade" className="listItemsImg" />Upgrade to Pro</div>

        </div>
         
      </div>
      { <div className="main">
        <div className="chats">
        
          {messages.map((message, i) => 
             <div key={i} className={message.isBot?"chat bot":"chat"}>
              
                  <img className='chatImg'src={message.isBot?gptImgLogo:userIcon} alt="" /><p className="txt">{ message.text }</p>
          </div>

          
          )}
          <div ref={msgEnd}/>
        </div>
        <div className="chatFooter">
          <div className="inp">
            <input type="text"placeholder='Send a message' value={input} onKeyDown={handleEnter} onChange={(e)=>{setInput(e.target.value)}}/><button className="send" onClick={handleSend}><img src={sendBtn} alt="" /></button>
          </div>
          <p>BharatGPT may produce inaccurate information about people, places, or facts. BharatGPT January 24 version.</p>
        </div>

      </div> }
    </div>
  );
}

export default App;
