---
description: Create a commit message based on the analyzing the git diffs
allowed-tools: Bash(git status:*), Bash(git diff --staged:*), Bash(git commit:*)
---

## Context

- Current git status: !`git status`
- Current git diff: !`git diff --staged`

## Task

Analyze the git diffs/changes and create a new commit message. Try to explain "why" something is done rather than "what" has just changed, where possible of course.

## Commit message style

If the commit goes into one of these categories prefix it with the corresponding emoji

- ✨ - New feature
- 🔨 - Refactor
- 🐛 - Bug fix
- ✅ - Tests

Use present tense.

Create a single sentence message (or two in rare case where more appropriate).

## Output

1. Show summary of the changes
2. Propose a commit message
3. Ask for confirmation to perform the commit. Wait for user approval, and when granted then do it.
