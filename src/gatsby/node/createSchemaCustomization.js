/* eslint-disable no-console */
module.exports = ({ actions }) => {
  const { createTypes } = actions;

  const typeDefs = [`
    type PluginOptions {
      basePath: String
      rootPath: String
    }
    type SitePlugin implements Node {
      pluginOptions: PluginOptions
    }
    type SiteSiteMetadata @infer {
      menuItems: [MenuItem!]
    }
    type MenuItem implements Node @infer {
      name: String!,
      slug: String,
      single: Boolean,
      identifier: String
    }
  `];

  createTypes(typeDefs);
};
