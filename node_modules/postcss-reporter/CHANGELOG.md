# Changelog

## 6.0.1

- Fix support for messages without text (by @nodaguti).

## 6.0.0

- Upgrade to PostCSS 7.
- Drop support for Node 4.

## 5.0.0

- Move PostCSS from `peerDependencies` to `dependencies`.
- Drop support for Node 0.12.

## 4.0.0

- Upgrade to PostCSS v6. (If you still use PostCSS v5, stick with v3 until you can upgrade your PostCSS.)
- Switched PostCSS to a peer dependency.

## 3.0.0

- Replace `clearMessages` option with `clearReportedMessages` and `clearAllMessages`.

## 2.0.0

- Only log warning messages (`type: "warning"`) by default.

## 1.4.1
- Add `filter` option.
- Add blacklist functionality to `plugins` option with `!` prefix`.

## 1.3.3
- Fix regression that caused positions from sources without incoming sourcemaps not to be logged.

## 1.3.2
- Find more accurate positions of preprocessed files with sourcemaps.

## 1.3.1
- Fix Windows path bug.

## 1.3.0
- Check individual messages for distinct sources, then group messages by those sources,
  instead of always using the PostCSS Result's source.
- Output empty string from `formatter` if there are no messages, instead of `undefined`.

## 1.2.1
- Handle variable and absent input sources.

## 1.2.0
- Add `noIcon` and `noPlugin` options to both reporter and formatter.

## 1.1.0
- Use PostCSS 5's line/column properties on warnings, instead of relying on the source node.

## 1.0.0
- Upgrade to PostCSS 5.

## 0.4.0
- Add `positionless` option (to both the reporter and the formatter), with default value `"first"`.
- Cleaner npm install (files specified in `package.json`).

## 0.3.1
- Remove leftover debugging log statement.

## 0.3.0
- Add `sortByPosition` option (to both the reporter and the formatter), with default value `true`.

## 0.2.0
- Alter `defaultFormatter` to use warning symbol and not repeat `# postcss-reporter`.

## 0.1.0
- First release.
