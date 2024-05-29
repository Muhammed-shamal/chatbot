// script.js

document.addEventListener("DOMContentLoaded", () => {
    const chatLog = document.getElementById("chat-log");
    const chatInput = document.getElementById("chat-input");
    const sendButton = document.getElementById("send-button");
  
    // Function to add a message to the chat log
    function addMessage(message, sender) {
      const messageElement = document.createElement("div");
      messageElement.className = `message ${sender}-message`;
      messageElement.textContent = message;
      chatLog.appendChild(messageElement);
      chatLog.scrollTop = chatLog.scrollHeight;
    }
  
    // Function to add a loading spinner to the chat log
    function addLoadingSpinner() {
      const spinnerElement = document.createElement("div");
      spinnerElement.className = "message bot-message loading-spinner";
      spinnerElement.innerHTML = `
        <div class="loader"></div>
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
        addMessage(botMessage, "bot");
      }, 1000);
    }
  
    // Function to generate bot response
    function getBotResponse(userMessage) {
      // Simple logic to generate bot responses
      const responses = {
        hello: "Hi there! How can I help you today?",
        hi: "Hello! What can I do for you?",
        help: "Sure, I'm here to help. What do you need assistance with?",
        default: "I'm not sure how to respond to that. Can you please rephrase?"
      };
  
      userMessage = userMessage.toLowerCase();
      return responses[userMessage] || responses.default;
    }
  
    // Event listeners for input and button
    sendButton.addEventListener("click", handleUserInput);
    chatInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        handleUserInput();
      }
    });
  });
  