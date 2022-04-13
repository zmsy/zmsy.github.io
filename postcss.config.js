module.exports = {
  plugins: {
    "@fullhuman/postcss-purgecss": {
      content: ["./**/*.html", "./**/*.js", "./**/*.svg"],
      whitelist: ['fill', 'stroke'],
    },
  },
};
