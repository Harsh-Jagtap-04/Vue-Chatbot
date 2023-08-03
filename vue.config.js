const path = require('path');

module.exports = {
  transpileDependencies: true,

  configureWebpack: {
    module: {
      rules: [
        // Add this rule to handle PDF files
        {
          test: /\.pdf$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'pdfs/', // Change this output path as needed
              },
            },
          ],
        },
      ],
    },
  },
};
