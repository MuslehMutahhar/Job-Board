# Contributing to Job Board

Thank you for your interest in contributing to our Job Board project! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct, which is to treat all contributors with respect and create a positive environment for everyone.

## How Can I Contribute?

### Reporting Bugs

This section guides you through submitting a bug report. Following these guidelines helps maintainers understand your report, reproduce the behavior, and find related reports.

- **Use a clear and descriptive title** for the issue to identify the problem.
- **Describe the exact steps which reproduce the problem** in as many details as possible.
- **Provide specific examples to demonstrate the steps**. Include links to files or GitHub projects, or copy/pasteable snippets, which you use in those examples.
- **Describe the behavior you observed after following the steps** and point out what exactly is the problem with that behavior.
- **Explain which behavior you expected to see instead and why.**
- **Include screenshots and animated GIFs** which show you following the described steps and clearly demonstrate the problem.

### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion, including completely new features and minor improvements to existing functionality.

- **Use a clear and descriptive title** for the issue to identify the suggestion.
- **Provide a step-by-step description of the suggested enhancement** in as many details as possible.
- **Provide specific examples to demonstrate the steps or point out the part of code which could be improved**.
- **Describe the current behavior and explain which behavior you expected to see instead** and why.
- **Explain why this enhancement would be useful** to most users.
- **List some other applications where this enhancement exists** if applicable.

### Pull Requests

- Fill in the required template
- Do not include issue numbers in the PR title
- Include screenshots and animated GIFs in your pull request whenever possible
- Follow the [JavaScript](#javascript-styleguide) and [CSS/SCSS](#css-styleguide) styleguides
- Document new code
- End all files with a newline

## Styleguides

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line
* Consider starting the commit message with an applicable emoji:
    * 🎨 `:art:` when improving the format/structure of the code
    * 🐎 `:racehorse:` when improving performance
    * 📝 `:memo:` when writing docs
    * 🐛 `:bug:` when fixing a bug
    * 🔥 `:fire:` when removing code or files
    * ✅ `:white_check_mark:` when adding tests
    * 🔒 `:lock:` when dealing with security
    * ⬆️ `:arrow_up:` when upgrading dependencies
    * ⬇️ `:arrow_down:` when downgrading dependencies

### JavaScript Styleguide

All JavaScript code is linted with [ESLint](https://eslint.org/) and formatted with [Prettier](https://prettier.io/).

* Prefer the object spread operator (`{...anotherObj}`) to `Object.assign()`
* Use TypeScript for all new code
* Use camelCase for variables, functions, and instances
* Use PascalCase for classes and React components
* Use async/await instead of Promise chains
* Prefer arrow functions over function expressions
* Use template literals instead of string concatenation

### CSS Styleguide

* Use Tailwind CSS utility classes when possible
* For custom CSS:
  * Use kebab-case for class names
  * Use variables for colors, spacing, and other design tokens
  * Group related styles together
  * Add comments for complex style blocks

## Project Structure

Please maintain the existing project structure and naming conventions when adding new files.

## Testing

Write tests for all new features and bug fixes. Run the existing tests before submitting your changes.

## Documentation

Update the documentation when necessary, particularly when adding or changing features.

Thank you for contributing to the Job Board project! 