// script.js

document.addEventListener("DOMContentLoaded", () => {
  const chatLog = document.getElementById("chat-log");
  const chatuser = document.getElementById("chat-user");
  const chatbot = document.getElementById("chat-bot");
  const chatInput = document.getElementById("chat-input");
  const sendButton = document.getElementById("send-button");

  // Function to add a message to the chat log
  function addMessage(message, sender, isHTML = false) {
    const messageElement = document.createElement("div");
    const You = document.createElement("div");
    const Bot = document.createElement("div");

    messageElement.className = `message ${sender}-message`;
    if (isHTML) {
      messageElement.innerHTML = "Bot" + message;
      Bot.innerHTML = "Bot";
    } else {
      You.textContent = "You";
      messageElement.textContent = message;
    }

    chatLog.appendChild(messageElement);
    chatuser.appendChild(You);
    chatbot.append(Bot);

    chatLog.scrollTop = chatLog.scrollHeight;
  }

  // Function to add a loading spinner to the chat log
  function addLoadingSpinner() {
    const spinnerElement = document.createElement("div");
    spinnerElement.className = "message bot-message loading-spinner";
    spinnerElement.innerHTML = `
      <div >
        <span class="loader"></span>
      </div>
    `;
    spinnerElement.id = "loading-spinner";
    chatLog.appendChild(spinnerElement);
    chatLog.scrollTop = chatLog.scrollHeight;
  }

  // Function to remove the loading spinner from the chat log
  function removeLoadingSpinner() {
    const spinnerElement = document.getElementById("loading-spinner");
    if (spinnerElement) {
      chatLog.removeChild(spinnerElement);
    }
  }

  // Function to handle user input and bot response
  function handleUserInput() {
    const userMessage = chatInput.value.trim();
    if (userMessage === "") return;

    addMessage(userMessage, "user");
    chatInput.value = "";

    addLoadingSpinner();

    // Simulate bot response
    setTimeout(() => {
      removeLoadingSpinner();
      const botMessage = getBotResponse(userMessage);
      addMessage(botMessage, "bot", true);
      addClickHandlers();
    }, 1300);
  }

  // Function to generate bot response
  function getBotResponse(userMessage) {
    const services = ["Service A", "Service B", "Service C", "Service D"];

    const responses = {
      hello: "Hi there! How can I help you today? 😊",
      hel: "Certainly! How can I assist you today? 😊",
      hi: "Hello! How can I assist you today? 😊",
      hai: "Hello! What can I do for you? 😊",
      help:
        `Sure, I'm here to help. What do you need assistance with? Here are my services:<br>` +
        services
          .map(
            (service) => `<button class="service-button">${service}</button>`
          )
          .join(" "),
      default: "I'm not sure how to respond to that. Can you please rephrase?",
      services: "Can you call this number 8304912033?",
    };

    userMessage = userMessage.toLowerCase();
    return responses[userMessage] || responses.default;
  }

  // Function to handle service button clicks
  function addClickHandlers() {
    const serviceButtons = document.querySelectorAll(".service-button");
    serviceButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const service = button.textContent;
        addMessage(`You selected: ${service}`, "user");
        addMessage(
          `You selected ${service}. How can I assist you with ${service}?`,
          "bot"
        );
      });
    });
  }

  // Event listeners for input and button
  sendButton.addEventListener("click", handleUserInput);
  chatInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      handleUserInput();
    }
  });
});
