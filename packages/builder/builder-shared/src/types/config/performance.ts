import type webpack from 'webpack';

export type ConsoleType = 'log' | 'info' | 'warn' | 'error' | 'table' | 'group';

// may extends cache options in the futures
export type BuildCacheOptions = {
  /** Base directory for the filesystem cache. */
  cacheDirectory?: string;
};

export interface SharedPerformanceConfig {
  /**
   * Whether to remove `console.xx` in production build.
   */
  removeConsole?: boolean | ConsoleType[];
  /**
   * Whether to remove the locales of [moment.js](https://momentjs.com/).
   */
  removeMomentLocale?: boolean;
  /**
   * Controls the Builder's caching behavior during the build process.
   */
  buildCache?: BuildCacheOptions | boolean;
  /**
   * Whether capture timing information for each module,
   * same as the [profile](https://webpack.js.org/configuration/other-options/#profile) config of webpack.
   */
  profile?: boolean;
  /**
   * Whether to print the file sizes after production build.
   */
  printFileSize?: boolean;
  /**
   * Configure the chunk splitting strategy.
   */
  chunkSplit?: BuilderChunkSplit;
}

export type SplitChunks = webpack.Configuration extends {
  optimization?: {
    splitChunks?: infer P;
  };
}
  ? P
  : never;

export type CacheGroup = webpack.Configuration extends {
  optimization?: {
    splitChunks?:
      | {
          cacheGroups?: infer P;
        }
      | false;
  };
}
  ? P
  : never;

export interface BaseSplitRules {
  strategy: string;
  forceSplitting?: Array<RegExp>;
  override?: SplitChunks;
}

export interface BaseChunkSplit extends BaseSplitRules {
  /** todo: split-by-module not support in rspack */
  strategy:
    | 'split-by-module'
    | 'split-by-experience'
    | 'all-in-one'
    | 'single-vendor';
}

export interface SplitBySize extends BaseSplitRules {
  strategy: 'split-by-size';
  minSize?: number;
  maxSize?: number;
}

export interface SplitCustom extends BaseSplitRules {
  strategy: 'custom';
  splitChunks?: SplitChunks;
}

export type BuilderChunkSplit = BaseChunkSplit | SplitBySize | SplitCustom;
