const wsUri = "wss://echo-ws-service.herokuapp.com";

const content = document.querySelector(".content");
const inputMsg = document.getElementById("message")
const btnSend = document.querySelector(".b_send");
const btnGeo = document.querySelector(".b_geo");

//создаем глобальную переменную под вебсокет
let websocket = null;

let messageCount = 0

let boolSentGeo = false;

document.onload = () => {
  websocket = new WebSocket(wsUri);
  websocket.onopen = () => {writeMessage('Connected', 'right')};

};
// Вывод сообщения на экран
function writeMessage(message, dir) {
  let pre = document.createElement("div");
  pre.classList.add(dir)
  if (typeof message === 'string') {
    pre.innerHTML = message;
  }
  if (typeof message === 'object') {
    pre = message;
    pre.classList.add(dir);
  }
  content.appendChild(pre)
  messageCount += 1;

  //удаляем первое сообщение чтобы не переполнять список (максимум 10 сообщений)
  if (messageCount > 10) {
    content.removeChild(content.firstChild);
  } 
}

// создаем объект вебсокет и задаем для него обработчики событий
const openSocket = () => {
    websocket = new WebSocket(wsUri);
    websocket.onopen = () => {writeMessage('Connected', 'right')};
    websocket.onclose = () => {
      writeMessage('Disconnected', 'right');
      websocket = null;
    };
    websocket.onmessage = (event) => {
      if (boolSentGeo) { // если послали геолокацию - ответ не выводим
        boolSentGeo = false;
        return;
      }
      writeMessage('ECHO: ' + event.data, 'left')}
      ;
    websocket.onerror = (event) => {writeMessage(event.data, 'error')};
}

btnSend.addEventListener('click', () => {
  if (websocket == null) {
    openSocket()
  }
  else {
    if (websocket.readyState == 1) { // webSocket открыт

      const message = inputMsg.value;
      if (message) {
        console.log(message);
        writeMessage(message, 'right');
        websocket.send(message)
      }
    }
  }
})

const successfulGeolocation = (position) => {
      const {coords} = position;
      console.log (coords.latitude, coords.longitude);
      let maplink = document.createElement("a");
      maplink.href = `https://www.openstreetmap.org/#map=18/${coords.latitude}/${coords.longitude}`;
      maplink.textContent = "Моя Гео-локация";
      writeMessage(maplink, 'right');
      boolSentGeo = true;
      if (websocket == null) {
        openSocket()
      }
      else {
        websocket.send(JSON.stringify([coords.latitude, coords.longitude]));
      }
}

btnGeo.addEventListener('click', () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(successfulGeolocation)

  }
})