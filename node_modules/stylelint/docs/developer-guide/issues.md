# Managing issues

-   Use [labels](https://github.com/stylelint/stylelint/labels):
    -   Add _one_ of the `status: *` labels (or the `help wanted` label when ready-to-go).
    -   Add _zero or one_ of the `type: *` labels.
    -   Add _zero, one or more_ of the `non-standard syntax: *` labels.
    -   Optionally, add the `good first issue` label.
-   Rename the title into a consistent format:
    -   Lead with the [CHANGELOG group names](pull-requests.md), but in the present tense:
        -   "Remove y" e.g. "Remove unit-blacklist".
        -   "Deprecate x in y" e.g. "Deprecate resolvedNested option in selector-class-pattern".
        -   "Add y" e.g. "Add unit-blacklist".
        -   "Add x to y" e.g. "Add ignoreProperties: [] to property-blacklist".
        -   "Fix false positives/negatives for x in y" e.g. "Fix false positives for Less mixins in color-no-hex".
    -   Use `*` if the issue applies to a group of rules e.g. "Fix false negatives for SCSS variables in selector-*-pattern"
-   Provide a link to the relevant section of the [Developer Guide](../developer-guide.md) when:
    -   Adding the `help wanted` label to encourage the original poster to contribute., e.g. [adding an option to an existing rule](../developer-guide/rules.md#adding-an-option-to-an-existing-rule) or [fixing a bug in an existing rule](../developer-guide/rules.md#fixing-a-bug-in-an-existing-rule).
    -   Closing an issue because the feature is best part of ecosystem e.g. [a plugin](https://github.com/stylelint/stylelint/blob/master/docs/developer-guide/plugins.md) or [processor](https://github.com/stylelint/stylelint/blob/master/docs/developer-guide/processors.md).
-   Use milestones only on issues and not on pull requests:
    -   Use the `future-major` milestone for issues that introduce breaking changes.
    -   Optionally, create version milestones (e.g. `8.x`) to manage upcoming releases.
-   Use the following saved reply to close any issue that do not use the template:

```md
Thanks for creating this issue but we are closing it as issues need to follow our issue template, so that we can clearly understand your particular circumstances.

Please help us to help you by [recreating the issue](https://github.com/stylelint/stylelint/issues/new) using the template.
```

General rules of thumb:

-   Use the `status: discussion`, `status: needs clarification` or `status: needs investigation` label when first triaging an issue.
-   Use the `help wanted`, a `type` (and `non-standard syntax: *` and `good first issue`) labels when a course of action is agreed.
-   Use the `status: wip` label when your are, or someone has said they are, about to start working on an issue.
