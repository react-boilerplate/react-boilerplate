declare namespace AddAssetHtmlPlugin {
  interface Options {
    /**
     * The absolute path of the file you want to add to the compilation, and resulting HTML file.
     * Mandatory.
     */
    filepath: string;

    /**
     * Files that the assets will be added to.
     * By default the assets will be included in all files. If files are defined, the
     * assets will only be included in specified file globs.
     */
    files?: string | string[];

    /**
     * If true, will append a unique hash of the file to the filename. This is useful for cache busting.
     * Default false.
     */
    hash?: boolean;

    /**
     * If `true`, will add `filepath + '.*'` to the compilation as well. E.g `filepath.map` and `filepath.gz`.
     * Default true.
     */
    includeRelatedFiles?: boolean;

    /**
     * If set, will be used as the output directory of the file.
     */
    outputPath?: string;

    /**
     * If set, will be used as the public path of the script or link tag.
     */
    publicPath?: string;

    /**
     * Can be set to css to create a link-tag instead of a script-tag.
     * Default 'js'
     */
    typeOfAsset?: 'js' | 'css';

    /**
     * Extra attributes to be added to the generated tag. Useful to for instance add
     * `nomodule` to a polyfill script. The `attributes` object uses the key as the
     * name of the attribute, and the value as the value of it. If value is simply
     * `true` no value will be added.
     */
    attributes?: Object;
  }
}

declare class AddAssetHtmlPlugin {
  constructor(
    options: AddAssetHtmlPlugin.Options | AddAssetHtmlPlugin.Options[],
  );
  apply(compiler: any): void;
}

export = AddAssetHtmlPlugin;
