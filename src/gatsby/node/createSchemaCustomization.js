/* eslint-disable no-console */
module.exports = ({ actions, schema }) => {
  const { createTypes } = actions;

  function getMenuIdentifier(menu) {
    if (menu.identifier) {
      return menu.identifier.toLowerCase();
    }
    if (menu.slug) {
      return menu.slug.toLowerCase().replace(/\//g, );
    } 
    return menu.name.toLowerCase();
  }

  const typeDefs = [`
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
  `,
  schema.buildObjectType({
    name: 'Article',
    fields: {
      menu: {
        type: '[String!]',
        resolve: (source, args, context, info) => {
          const menus = source.menu.map(item => {
            const foundMenu = context.nodeModel.getAllNodes({type: `MenuItem`})
                    .find(menu => getMenuIdentifier(menu) === item);
            if (!foundMenu) {
              throw new Error(`${item} is not a valid identifier`);
            }
            return item;
          })
          if (menus) {
            return [];
          }
          return menus;
        }
      }
    }
  })];

  createTypes(typeDefs);
};
