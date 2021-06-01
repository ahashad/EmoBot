import { BOT_MSGS } from "./botmsg.js";


const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");
let delay=0;
let i=-1,j=-1;
let msgText="";
let textmsg="";
let res="";
let h=0,s=0,d=0;

let x = document.getElementsByClassName("msger-input")[0];
let y = document.getElementsByClassName("msger-send-btn")[0];


// Icons made by Freepik from www.flaticon.com
const BOT_IMG = "https://image.flaticon.com/icons/svg/327/327779.svg";
const PERSON_IMG = "https://image.flaticon.com/icons/svg/145/145867.svg";
const BOT_NAME = "EmoBot";
let PERSON_NAME = "Joseph";

function mymodel(msg){
  //post to model and get resp
  fetch("https://d7ef6d22-9900-4d1c-8ef1-e37c792b2526.mock.pstmn.io/response",{
    method:'POST',
    mode:'no-cors',
    headers:{
      "Content-type":"application/json"
    },
    body:JSON.stringify(msg)
  }).then(response => response.json())
  .then(data => console.log(data));

}

msgerForm.addEventListener("submit", event => {
  event.preventDefault();
  mymodel("abcd");
  const msg_Text = msgerInput.value;
  if (!msg_Text) return;
  if(i==-1) PERSON_NAME = msg_Text;
 
  appendMessage(PERSON_NAME, PERSON_IMG, "right", msg_Text);
  msgerInput.value = "";
  j++;
 if(textmsg=="check"||textmsg==" ")
 {
   //res=mymodel(msgText)
   res="positive";
   if(res=="positive")
    h++;
   if(msg_Text=="N")
   {
     s++;
     d++;
     res="negative";
     if(textmsg=="check")
      {  i++;j=0;}
   }
 }
 
  botResponse();
});
function resp(){
  let a="";
  if(h>s+d)
    a="You are all OK.<br>No further treatment required."
  else if(s>d)
    a="You are Stressed.<br>Relaxation required to shed stress.Requires regular breaks between works to shed the accumulated stress."  
  else
    a="You are Depressed.<br>Engage in recreational activities.Meditation, relaxation is the need of the hour."
  return "As per our analysis<br>"+a;  
}
function appendMessage(name, img, side, text) {
  //   Simple solution for small apps
  x.disabled = false;
  console.log("76"+text);
  if(text!="check"&&text!=" "){
    if(text=="123")
     {    text="End Session";  // enter the end session text    
          x.placeholder = 'The session has ended.Refresh to start again.';
     }
     x.disabled = true;
     console.log("77"+text);
  const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-img" style="background-image: url(${img})"></div>

      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
          <div class="msg-info-time">${formatDate(new Date())}</div>
        </div>

        <div class="msg-text">${text}</div>
      </div>
    </div>
  `;
  

  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
  }
  if(msgText!="check"&&msgText!=" "&&msgText!="123"&&i>=0)
   { j++;botResponse();}
  if(text=="End Session")
  {
    appendMessage(BOT_NAME, BOT_IMG, "left", resp());
    
  }
   
}

function botResponse() {
  
  if(i<1)i++;
  if(i==0)
    msgText = `Hi ${PERSON_NAME}`;
  else msgText = BOT_MSGS[i][j];
  if(res!="")
  {
    msgText=`I feel that u are ${res}.`;
    j--;
    res="";
  }
  console.log(msgText);
  //console.log(BOT_MSGS[i][j]);
  console.log(i);
  textmsg=msgText;
  delay =msgText.split(" ").length * 200;

  setTimeout(() => {
    appendMessage(BOT_NAME, BOT_IMG, "left", msgText);
  }, delay);
  
  delay=0;
}

// Utils
function get(selector, root = document) {
  return root.querySelector(selector);
}

function formatDate(date) {
  const h = "0" + date.getHours();
  const m = "0" + date.getMinutes();

  return `${h.slice(-2)}:${m.slice(-2)}`;
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}