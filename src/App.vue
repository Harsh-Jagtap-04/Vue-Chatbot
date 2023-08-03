<template>
  <div class="container mx-auto">
    <ChatBox />
    <PdfViewer :pdfUrl="pdfUrl" @show-pdf="updatePdfUrl" />
  </div>
</template>

<script>
import ChatBox from '@/components/ChatBox.vue'; // Adjust the path as needed
import PdfViewer from '@/components/PdfViewer.vue'; // Adjust the path as needed


export default {
  name: 'App',
  components: {
    ChatBox,
    PdfViewer,
  },
  data() {
    return {
      pdfUrl: '',
    };
  },
  methods: {
    // ... other methods

    updatePdfUrl(pdfUrl) {
        this.pdfUrl = pdfUrl;
    }
}
};
</script>