module.exports = ({ actions }) => {
  actions.createTypes(`
    type Article implements Node {
      id: ID!
      slug: String!
      title: String!
      date: Date! @dateformat
      author: String!
      excerpt(pruneLength: Int = 140): String!
      body: String!
      menu: [String!]
      template: String
      showInHome: Boolean
      hero: File @fileByRelativePath
      timeToRead: Int
      canonical_url: String
    }
  `);
};
