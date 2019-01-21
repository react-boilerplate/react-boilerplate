# Semantic versioning policy

We follow [semantic versioning](http://semver.org). However, due to the nature of stylelint as a code quality tool, we've defined the following policy for stylelint:

-   patch release (intended to not break your lint build)
    -   a bug fix in a rule that results in stylelint reporting fewer errors
    -   a bug fix to the CLI or core (including formatters)
    -   improvements to documentation.
    -   non-user-facing changes such as refactoring code or modifying tests
    -   re-releasing after a failed release (i.e., publishing a release that doesn't work for anyone)

-   minor release (might break your lint build)
    -   a bug fix in a rule that results in stylelint reporting more errors
    -   a new rule is created
    -   a new option to an existing rule that does not result in stylelint reporting more errors by default
    -   an existing rule is deprecated
    -   a new CLI capability is created
    -   a new public API capability is created
    -   a new formatter is created

-   major release (likely to break your lint build)
    -   a change in the documented behaviour of an existing rule results in stylelint reporting more errors by default
    -   an existing rule is removed
    -   an existing formatter is removed
    -   part of the a CLI is removed or changed in an incompatible way
    -   part of the public API is removed or changed in an incompatible way
