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
    * If true, will add filepath + '.map' to the compilation as well.
    * Default true.
    */
    includeSourcemap?: boolean;

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
    typeOfAsset?: string;
  }
}

declare class AddAssetHtmlPlugin {
  constructor(options: AddAssetHtmlPlugin.Options | AddAssetHtmlPlugin.Options[]);
  apply(compiler: any): void;
}

export = AddAssetHtmlPlugin;
