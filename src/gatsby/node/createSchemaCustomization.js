module.exports = ({ actions }) => {
  const { createTypes } = actions;

  const typeDefs = `
    type PluginOptions {
      basePath: String
      rootPath: String
    }
    type SitePlugin implements Node {
      pluginOptions: PluginOptions
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
  `;

  createTypes(typeDefs);
};
