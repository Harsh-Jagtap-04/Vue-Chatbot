<template>
  <div class="container mx-auto">
    <ChatBox />
    <vue-pdf-embed :source="pdfUrl" :width="900" :height="600" />
  </div>
</template>

<script>
import ChatBox from './components/ChatBox.vue';
import VuePdfEmbed from 'vue-pdf-embed';

export default {
  name: 'App',
  components: {
    ChatBox,
    VuePdfEmbed,
  },
  data() {
    return {
      pdfUrl: 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf',
    };
  },
};
</script>