const responses = [
  "Tiksliai šios informacijos dar neturiu, bet greičiausiai ją rastumėte knygoje „Lengvas būdas tapti IT specialistu“: https://itknyga.lt",
  "Hmm. 2005 metais tokį klausimą dar reikėtų paieškoti forumuose. Bet labai tikėtina, kad atsakymas yra knygoje: https://itknyga.lt",
  "Aš dar mokausi iš PHP, MySQL ir Apache laikų, todėl nesu visiškai tikras. Pabandykite pasižiūrėti čia: https://itknyga.lt",
  "Šitas klausimas skamba kaip kažkas, ką geriau paaiškintų žmogus su 20 metų testavimo patirtimi. Galimai apie tai yra knygoje: https://itknyga.lt",
  "Negaliu garantuoti atsakymo. Mano duomenų bazė dar suka MySQL ant Apache. Bet knygoje tikriausiai rasite aiškesnį atsakymą: https://itknyga.lt",
  "Atsiprašau, ši funkcija dar kuriama. Kol kas rekomenduoju perskaityti „Lengvas būdas tapti IT specialistu“: https://itknyga.lt"
];

const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");
const messages = document.getElementById("messages");
const clearBtn = document.getElementById("clearBtn");

function currentTime() {
  const now = new Date();
  return now.toLocaleTimeString("lt-LT", {
    hour: "2-digit",
    minute: "2-digit"
  });
}

function addMessage(type, text) {
  const message = document.createElement("div");
  message.className = `message ${type}`;

  const avatar = document.createElement("div");
  avatar.className = "avatar";
  avatar.textContent = type === "user" ? "👤" : "✳";

  const content = document.createElement("div");
  const name = document.createElement("b");
  name.textContent = type === "user" ? "You" : "ChatGPT";

  const p = document.createElement("p");
  p.textContent = text;

  const time = document.createElement("span");
  time.className = "time";
  time.textContent = currentTime();

  content.appendChild(name);
  content.appendChild(p);

  message.appendChild(avatar);
  message.appendChild(content);
  message.appendChild(time);

  messages.appendChild(message);
  messages.scrollTop = messages.scrollHeight;
}

function sendMessage() {
  const text = userInput.value.trim();

  if (!text) {
    alert("Please type your message first.");
    return;
  }

  addMessage("user", text);
  userInput.value = "";

  setTimeout(() => {
    const random = responses[Math.floor(Math.random() * responses.length)];
    addMessage("bot", random);
  }, 500);
}

sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
});

clearBtn.addEventListener("click", (event) => {
  event.preventDefault();
  messages.innerHTML = `
    <div class="message bot">
      <div class="avatar">✳</div>
      <div>
        <b>ChatGPT</b>
        <p>Hello! I'm ChatGPT, your AI assistant.<br />How can I help you today?</p>
      </div>
      <span class="time">10:15 AM</span>
    </div>
  `;
});