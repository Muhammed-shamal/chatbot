// script.js

document.addEventListener("DOMContentLoaded", () => {
  const chatLog = document.getElementById("chat-log");
  const chatInput = document.getElementById("chat-input");
  const sendButton = document.getElementById("send-button");

  sendButton.disabled = true;

  // Function to add a message to the chat log
  function addMessage(message, sender, isHTML = false) {
    const messageElement = document.createElement("div");
    messageElement.className = `message ${sender}-message`;

    // Create a span element for timestamp
    const timestampSpan = document.createElement("span");
    timestampSpan.className = "message-timestamp";
    const timestamp = new Date().toLocaleTimeString(); // Get current time

    // Set the timestamp text
    timestampSpan.textContent = timestamp;
    messageElement.appendChild(timestampSpan); // Append timestamp to message

    // Append message content
    if (isHTML) {
      messageElement.innerHTML += ": " + message;
    } else {
      messageElement.textContent += ": " + message;
    }

    chatLog.appendChild(messageElement);
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
      greeting: {
        hello: "Hi there! How can I help you today? 😊",
        helo: "Certainly! How can I assist you today? 😊",
        hi: "Hello! How can I assist you today? 😊",
        hai: "Hello! What can I do for you? 😊",
      },
      help:
        "Sure, I'm here to help. What do you need assistance with? Here are my services:<br>" +
        services
          .map(
            (service) => `<button class="service-button">${service}</button>`
          )
          .join(" "),
      contact: "Can you call this number 8304912033?",
      education:
        "I can provide information about various educational topics. What specific information do you need?",
      language:
        "I can assist you with language-related queries. What do you want to know?",
      // Add more categories and responses as needed
      default: "I'm not sure how to respond to that. Can you please rephrase?",
    };

    userMessage = userMessage.toLowerCase();

    // Check for specific categories
    if (userMessage.includes("contact")) {
      return responses.contact;
    } else if (userMessage.includes("education")) {
      return responses.education;
    } else if (userMessage.includes("language")) {
      return responses.language;
    }

    // Check for greetings
    for (const key in responses.greeting) {
      if (userMessage.includes(key)) {
        return responses.greeting[key];
      }
    }

    return responses.default;
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

  // Disable the button when input is empty
  chatInput.addEventListener("input", () => {
    if (chatInput.value.trim() === "") {
      sendButton.disabled = true;
    } else {
      sendButton.disabled = false;
    }
  });
});
