# Reviewing pull requests

Rules of thumb:

-   Use the [GitHub review system](https://help.github.com/articles/about-pull-request-reviews/).
-   Review against the [Developer Guide criteria](rules.md).
-   Assign one or more of the appropriate [`PR: needs *` labels](https://github.com/stylelint/stylelint/labels) when requesting a change.
-   Resolve conficts by [rebasing](https://www.atlassian.com/git/tutorials/rewriting-history/git-rebase), rather than merging the target branch into the pull request branch.

Merge process:

1.  Make sure the pull request has the correct number of approvals:
    -   For simple documentation fixes: one;
    -   For all other pull requests: two.
2.  "Squash and merge" commits, ensuring the resulting commit message is consistently formatted:
    -   Sentence case.
    -   Descriptive.
3.  Update the [CHANGELOG](https://github.com/stylelint/stylelint/blob/master/CHANGELOG.md) directly via the [GitHub website](https://github.com/stylelint/stylelint/edit/master/CHANGELOG.md) for all merged PRs (except documentation changes):
    -   Create a `# Head` heading if one does not exist already.
    -   Prefix the item with either: Removed, Changed, Deprecated, Added, or Fixed.
    -   Order the item within the group by the widest reaching first to the smallest, and then alphabetically by rule name.
    -   Suffix the item with the relevant pull request number, using the complete GitHub URL so that it works on [the website](https://stylelint.io/CHANGELOG/).
    -   If applicable, lead the item with the name of rule e.g. "Fixed: `unit-blacklist` false positives for SCSS nested properties".
4.  Lastly, post the item as a comment to the pull request.
