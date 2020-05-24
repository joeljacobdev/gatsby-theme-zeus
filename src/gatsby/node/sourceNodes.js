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
      hero: File @fileByRelativePath
      timeToRead: Int
      canonical_url: String
    }
    type SiteSiteMetadata @infer {
      menuItems: [MenuItem]
    }
    type MenuItem implements Node @infer {
      id: ID!,
      name: String!,
      slug: String,
      identifier: String
    }
  `);
};
