<template>
  <div class="chatbox-container">
    <div class="container">
      <h1>Ai Chat Bot</h1>
      <div class="messageBox mt-8">
        <div v-for="(message, index) in messages" :key="index" :class="message.from === 'user' ? 'messageFromUser' : 'messageFromChatGpt'">
          <div :class="message.from === 'user' ? 'userMessageWrapper' : 'chatGptMessageWrapper'">
            <div :class="message.from === 'user' ? 'userMessageContent' : 'chatGptMessageContent'">
              {{ message.data }}
            </div>

            <div v-if="message.pdfPath" class="showPdfButton">
               <button @click="showPdf(message.pdfPath)">Show PDF</button>
            </div>
            
          </div>
        </div>
      </div>
      
      <div class="inputContainer">
        <input
          v-model="currentMessage"
          type="text"
          class="messageInput"
          placeholder="Ask me anything..."
          @keyup.enter="handleSendEvent(currentMessage)"
        />
        <button @click="handleSendEvent(currentMessage)" class="askButton">
          <!--<i class="fas fa-paper-plane"></i>
           Font Awesome icon for paper plane -->
           <i class="fas fa-paper-plane fa-1x" aria-hidden="true"></i>
        </button>
        <button @click="recordAudio" class="audioButton">
          <!--<i class="fas fa-microphone"></i> Font Awesome icon for microphone -->
          <i class="fa fa-microphone fa-1x" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatBox',
  data() {
    return {
      currentMessage: '',
      messages: [],
    };
  },

  methods: {
    async handleSendEvent(message) {
      this.messages.push({
        from: 'user',
        data: message,
      });

      this.currentMessage = ''; // Clear the input field

      const response = await fetch('http://127.0.0.1:5000/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: message }),
      });
      const res = await response.json();

      for (const doc of res.source_documents) {
  this.messages.push({
    from: 'chatGpt',
    data: res.answer,
    pdfPath: doc.pdf_url, // Access pdf_url from the document in source_documents
  });
}
            // Speak the response
            this.speak(res.answer);
    },
    recordAudio() {
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        console.log('Voice activated');
      };

      recognition.onresult = (event) => {
        const resultIndex = event.resultIndex;
        const transcript = event.results[resultIndex][0].transcript;
        this.currentMessage = transcript;
        this.handleSendEvent(this.currentMessage);
      };

      recognition.onerror = (event) => {
        console.error('Error occurred in recognition: ' + event.error);
      };

      recognition.start();
    },

    // Function to handle text-to-speech
    speak(text) {
      if (!text) return;

      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    },

    showPdf(pdfPath) {
      console.log('Show PDF button clicked for:', pdfPath);
      const pdfUrl = `http://127.0.0.1:5000${pdfPath}`;
      this.$emit('show-pdf', pdfUrl); // Emit event to parent component
    },

  },

};

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');

.chatbox-container {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
}

.container {
  width: 360px;
  height: 600px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: 'Roboto', sans-serif;
}

h1 {
  font-size: 24px;
  font-weight: 500;
  text-align: center;
  color: #222;
  padding: 16px;
  margin: 0;
  background-color: #f7f7f7;
  border-bottom: 1px solid #e7e7e7;
}

.messageBox {
  padding: 16px;
  flex-grow: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.messageFromUser,
.messageFromChatGpt {
  display: flex;
  justify-content: flex-end;
}

.userMessageWrapper,
.chatGptMessageWrapper {
  display: flex;
  flex-direction: column;
}

.userMessageWrapper {
  align-self: flex-end;
}

.chatGptMessageWrapper {
  align-self: flex-start;
}

.userMessageContent,
.chatGptMessageContent {
  max-width: 60%;
  padding: 8px 12px;
  border-radius: 18px;
  margin-bottom: 2px;
  font-size: 14px;
  line-height: 1.4;
}

.userMessageContent {
  background-color: #1877f2;
  color: white;
  border-top-left-radius: 18;
  border-bottom-right-radius: 0;
}

.chatGptMessageContent {
  background-color: #ededed;
  color: #222;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.inputContainer {
  display: flex;
  align-items: center;
  padding: 8px;
  background-color: #f0f0f0;
}

.messageInput {
  flex-grow: 1;
  border: none;
  outline: none;
  padding: 12px;
  font-size: 16px;
  background-color: white;
  border-radius: 24px;
  margin-right: 8px;
}
.askButton {
  background-color: #1877f2;
  color: white;
  font-size: 16px;
  padding: 8px 8px;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 50%;
  transition: background-color 0.3s ease-in-out;
  margin-right: 6px;
}

.askButton:hover {
  background-color: #145cb3;
}

.audioButton {
  background-color: #1877f2;
  color: white;
  font-size: 16px;
  padding: 8px 8px;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 50%;
  transition: background-color 0.3s ease-in-out;
}

.audioButton:hover {
  background-color: #145cb3;
}
/*
.askButton {
  background-color: #1877f2;
  color: white;
  font-size: 16px;
  padding: 8px 16px;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 24px;
  transition: background-color 0.3s ease-in-out;
}

.askButton:hover {
  background-color: #145cb3;
}

.audioButton {
  background-color: #1877f2;
  color: white;
  font-size: 16px;
  padding: 8px 16px;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 24px;
  transition: background-color 0.3s ease-in-out;
}

.audioButton:hover {
  background-color: #145cb3;
}
*/
@media (max-width: 480px) {
  .container {
    width: 100%;
    max-width: none;
    border-radius: 0;
  }
}
</style>