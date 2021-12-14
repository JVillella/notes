module.exports = {
  siteMetadata: {
    title: "Julian's Notes",
    description: "Personal notes as I think through new topics; making public in case it's helpful to others.",
  },
  plugins: [
    {
      resolve: "gatsby-theme-garden",
      options: {
        rootNote: "/README",
        contentPath: `${__dirname}/../`,
        ignore: [
          "**/_layouts/**",
          "**/.git/**",
          "**/.github/**",
          "**/.vscode/**",
        ],
        parseWikiLinks: true,
      },
    },
  ],
};
