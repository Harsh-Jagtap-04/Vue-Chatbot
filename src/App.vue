<template>
  <div class="container mx-auto">

    <ChatBox @show-pdf="displayPdf" />
    <PdfApp v-if="pdfVisible" style="height: 90vh" :pdf="pdfUrl"></PdfApp>
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