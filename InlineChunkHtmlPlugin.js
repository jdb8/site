/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Forked from https://github.com/facebook/create-react-app/blob/d5c0fe287a6bc24c60ee52ca768bdf3a10b937e1/packages/react-dev-utils/InlineChunkHtmlPlugin.js

class InlineChunkHtmlPlugin {
  constructor(htmlWebpackPlugin, tests) {
    this.htmlWebpackPlugin = htmlWebpackPlugin;
    this.tests = tests;
  }

  getInlinedScriptTag(publicPath, assets, tag) {
    if (!tag.attributes.src) {
      return tag;
    }

    const scriptName = publicPath
      ? tag.attributes.src.replace(publicPath, '')
      : tag.attributes.src;
    if (!this.tests.some((test) => scriptName.match(test))) {
      return tag;
    }
    const asset = assets[scriptName];
    if (asset == null) {
      return tag;
    }
    return { tagName: 'script', innerHTML: asset.source(), closeTag: true };
  }

  getInlinedLinkTag(publicPath, assets, tag) {
    if (!tag.attributes.href) {
      return tag;
    }

    const styleName = publicPath
      ? tag.attributes.href.replace(publicPath, '')
      : tag.attributes.href;

    if (!this.tests.some((test) => styleName.match(test))) {
      return tag;
    }

    const asset = assets[styleName];
    if (asset == null) {
      return tag;
    }

    return { tagName: 'style', innerHTML: asset.source(), closeTag: true };
  }

  getInlinedTag(publicPath, assets, tag) {
    if (!tag.attributes) {
      return tag;
    }

    switch (tag.tagName) {
      case 'script':
        return this.getInlinedScriptTag(publicPath, assets, tag);
      case 'link':
        return this.getInlinedLinkTag(publicPath, assets, tag);
      default:
        return tag;
    }
  }

  apply(compiler) {
    let publicPath = compiler.options.output.publicPath || '';
    if (publicPath && !publicPath.endsWith('/')) {
      publicPath += '/';
    }

    compiler.hooks.compilation.tap('InlineChunkHtmlPlugin', (compilation) => {
      const tagFunction = (tag) =>
        this.getInlinedTag(publicPath, compilation.assets, tag);

      const hooks = this.htmlWebpackPlugin.getHooks(compilation);
      hooks.alterAssetTagGroups.tap('InlineChunkHtmlPlugin', (assets) => {
        assets.headTags = assets.headTags.map(tagFunction);
        assets.bodyTags = assets.bodyTags.map(tagFunction);
      });

      // Still emit the runtime chunk for users who do not use our generated
      // index.html file.
      // hooks.afterEmit.tap('InlineChunkHtmlPlugin', () => {
      //   Object.keys(compilation.assets).forEach(assetName => {
      //     if (this.tests.some(test => assetName.match(test))) {
      //       delete compilation.assets[assetName];
      //     }
      //   });
      // });
    });
  }
}

module.exports = InlineChunkHtmlPlugin;