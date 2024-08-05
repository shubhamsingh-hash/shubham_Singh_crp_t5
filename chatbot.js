async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    appendToChatBox(`You: ${userInput}`);
    document.getElementById('user-input').value = '';
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userInput })
      });
      const data = await response.json();
      appendToChatBox(`Bot: ${data.reply}`);
    } catch (error) {
      console.error('Error communicating with the server:', error);
      appendToChatBox('Bot: Something went wrong, please try again later.');
    }
  }
  function appendToChatBox(text) {
    const chatBox = document.getElementById('output-box');
    const messageElement = document.createElement('div');
    messageElement.textContent = text;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
  }
  