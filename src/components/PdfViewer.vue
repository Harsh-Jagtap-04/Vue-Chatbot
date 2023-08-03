<template>
    <div class="pdf-viewer">
      <vue-pdf-embed :source="pdfUrl" :width="width" :height="height" />
    </div>
  </template>
  
  <script>
  import VuePdfEmbed from 'vue-pdf-embed';
  
  export default {
    name: 'PdfViewer',
    components: {
      VuePdfEmbed,
    },
    props: {
      pdfUrl: String,
      width: {
        type: Number,
        default: 900,
      },
      height: {
        type: Number,
        default: 600,
      },
    },
  };
  </script>
  
  <style scoped>
  .pdf-viewer {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  </style>