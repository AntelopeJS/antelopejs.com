---
title: Document Title
description: Brief description of the document's purpose and content
navigation:
  icon: i-ph-info
---

# Document Title

Brief introduction that explains the purpose of this document and provides an overview of the content (1-2 paragraphs).

## Overview

Brief introduction that explains the purpose of this document and provides an overview of the content (1-2 paragraphs).

::note
This note provides important context for understanding the concepts discussed in this document.
::

## Section 1

Detailed information about the first major topic. Use clear, concise language and present tense.

::card{icon="i-ph-lightbulb" title="Best Practice"}
Follow these guidelines to ensure your implementation is efficient and maintainable.
::

### Subsection 1.1

Further details about a specific aspect of Section 1.

::::tabs
:::tabs-item{label="Example" icon="i-ph-code"}

```typescript
// Code example demonstrating the concept
function exampleFunction(name: string): string {
  return `Hello, ${name}!`;
}

console.log(exampleFunction("World"));
```

:::
:::tabs-item{label="Output" icon="i-ph-terminal"}

```
Hello, World!
```

:::
::::

You can also use syntax highlighting for inline code: `exampleFunction()`.

### Code With Filename

```typescript [demo.ts]
// TypeScript code with filename
const greeting = (name: string): string => {
  return `Hello, ${name}!`;
};

console.log(greeting("World"));
```

### Highlighted Code Lines

```typescript{3-4} [logger.ts]
// Simple logger utility
function logger(message: string, level: 'info' | 'warn' | 'error' = 'info') {
  // These lines will be highlighted
  const timestamp = new Date().toISOString();
  console.log(`[${level.toUpperCase()}] ${timestamp}: ${message}`);
}
```

### Code Groups

:::code-group

```typescript [utils.ts]
// A simple utility function
export function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}
```

```typescript [app.ts]
// Using the utility function
import { formatDate } from "./utils";

const today = new Date();
console.log(`Today is ${formatDate(today)}`);
```

:::

### Subsection 1.2

Additional details with examples:

- List item 1
- List item 2
- List item 3

### Callouts

::note
This is a standard informational callout.
::

::warning
This warns users about potential issues.
::

::caution
This highlights critical information.
::

::tip
This provides helpful advice.
::

## Section 2

Information about the second major topic.

### Installation Options

:::code-group

```bash [npm]
npm install @antelopejs/cli
```

```bash [yarn]
yarn add @antelopejs/cli
```

```bash [pnpm]
pnpm add @antelopejs/cli
```

:::

### Tables

| Header 1 | Header 2 | Header 3 |
| -------- | -------- | -------- |
| Value 1  | Value 2  | Value 3  |
| Value 4  | Value 5  | Value 6  |

### Step-by-Step Guides

::steps{level="4"}

#### Install the Package

:::code-group

```bash [npm]
npm install @antelopejs/cli
```

```bash [yarn]
yarn add @antelopejs/cli
```

```bash [pnpm]
pnpm add @antelopejs/cli
```

:::

#### Create a Configuration File

```typescript [config.ts]
export default {
  port: 3000,
  debug: true,
};
```

#### Start Your Application

```typescript [index.ts]
// Main application entry point
import config from "./config";

console.log("Starting application with config:", config);
// Application startup code here
```

::

## Component Examples

### Cards

::card-group
::card{icon="i-ph-rocket-launch" title="Getting Started"}
Introduction to the basic concepts and setup.
::
::card{icon="i-ph-book-open" title="Guides"}
Step-by-step tutorials for common tasks.
::
::card{icon="i-ph-code" title="API Reference"}
Complete API documentation.
::
::

### Accordion

::accordion
::accordion-item{label="What is this project?" icon="i-ph-info"}
This project provides tools and libraries for building scalable applications with TypeScript.
::
::accordion-item{label="How do I install it?" icon="i-ph-download"}
You can install it using npm, yarn, or pnpm. See the installation instructions for more details.
::
::

### Large Code Examples

::code-collapse

```typescript [complex-example.ts]
// A more complex TypeScript example
interface User {
  id: number;
  name: string;
  email: string;
}

class UserManager {
  private users: User[] = [];

  constructor(initialUsers: User[] = []) {
    this.users = [...initialUsers];
  }

  addUser(user: User): void {
    const existingUser = this.users.find((u) => u.id === user.id);
    if (existingUser) {
      throw new Error(`User with id ${user.id} already exists`);
    }
    this.users.push(user);
  }

  getUserById(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  getAllUsers(): User[] {
    return [...this.users];
  }

  updateUser(id: number, updates: Partial<User>): void {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new Error(`User with id ${id} not found`);
    }

    this.users[userIndex] = {
      ...this.users[userIndex],
      ...updates,
    };
  }

  deleteUser(id: number): void {
    this.users = this.users.filter((user) => user.id !== id);
  }
}

// Usage example
const manager = new UserManager([{ id: 1, name: "Alice", email: "alice@example.com" }]);

manager.addUser({ id: 2, name: "Bob", email: "bob@example.com" });
console.log(manager.getAllUsers());
```

::

### Keyboard Shortcuts

Press <Kbd value="Ctrl"/> + <Kbd value="S"/> to save your work.

## Command Reference

::::tabs
:::tabs-item{label="Example" icon="i-ph-terminal"}

### cli create

Create a new project.

```bash
cli create <project-name> [options]
```

#### Arguments

| Argument       | Description                   |
| -------------- | ----------------------------- |
| `project-name` | Name of the project to create |

#### Options

| Option           | Description                     | Default |
| ---------------- | ------------------------------- | ------- |
| `--template`     | Template to use for the project | `basic` |
| `--skip-install` | Skip installing dependencies    | `false` |

#### Examples

```bash
# Create a new project with the default template
cli create my-project

# Create a new project with a specific template
cli create my-project --template advanced
```

:::
:::tabs-item{label="Markdown" icon="i-ph-code"}

````markdown
### cli create

Create a new project.

```bash
cli create <project-name> [options]
```

#### Arguments

| Argument       | Description                   |
| -------------- | ----------------------------- |
| `project-name` | Name of the project to create |

#### Options

| Option           | Description                     | Default |
| ---------------- | ------------------------------- | ------- |
| `--template`     | Template to use for the project | `basic` |
| `--skip-install` | Skip installing dependencies    | `false` |

#### Examples

```bash
# Create a new project with the default template
cli create my-project

# Create a new project with a specific template
cli create my-project --template advanced
```
````

:::
::::

## Related Information

- [Getting Started](../1.get-started/1.introduction.md)
- [CLI Reference](../3.cli/1.introduction.md)
