<template>
  <div class="container">
    <div class="pdf-container">
      <PdfApp v-if="pdfVisible" style="height: 100%; width: 100%;" :pdf="pdfUrl" />
    </div>
    <div class="chatbox-container">
      <ChatBox @show-pdf="displayPdf" />
    </div>
  </div>
</template>

<script>
import ChatBox from '@/components/ChatBox.vue';
import PdfApp from "vue3-pdf-app";
import "vue3-pdf-app/dist/icons/main.css";

export default {
  name: 'App',
  components: {
    ChatBox,
    PdfApp,
  },
  data() {
    return {
      pdfUrl: '',
      pdfVisible: false,
    };
  },
  methods: {
    displayPdf(pdfUrl) {
      console.log('Received PDF URL:', pdfUrl);
      this.pdfUrl = pdfUrl;
      this.pdfVisible = true;
    },
  },
};
</script>



<style>
.container {
  display: flex;
}

.pdf-container {
  flex: 70; /* 70% width */
  height: 100vh; /* 100% viewport height */
  overflow: auto; /* Add scrollbars if the PDF exceeds the container height */
}

.chatbox-container {
  flex: 30; /* 30% width */
  padding: 20px; /* Add padding as needed */
  box-sizing: border-box;
}
</style>