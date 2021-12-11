module.exports = {
  pathPrefix: `/`,
  siteMetadata: {
    title: `Julian's Notes`,
  },
  plugins: [
    {
      resolve: `gatsby-theme-garden`,
      options: {
        rootNote: "/README.md",
        contentPath: `${__dirname}/docs`,
        ignore: [
          "**/_layouts/**",
          "**/.git/**",
          "**/.github/**",
          "**/.vscode/**",
        ],
      },
    },
  ],
};
