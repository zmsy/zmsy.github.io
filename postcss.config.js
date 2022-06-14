module.exports = {
  plugins: {
    "@fullhuman/postcss-purgecss": {
      content: ["./**/*.html", "./**/*.js", "./**/*.svg"],
      safelist: ["fill", "style", "stroke", ".navbar-menu.is-active", "modal"],
    },
  },
};
