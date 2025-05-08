---
title: Documentation Style Guide
description: Standards for formatting and structuring Antelopejs documentation
---

# Antelopejs Documentation Style Guide

This guide defines the standards for formatting and structuring all Antelopejs documentation. Following these guidelines ensures consistency across all documentation files and improves readability for users.

## Document Structure

### Frontmatter

Each documentation file should begin with YAML frontmatter that includes at least a title:

```yaml
---
title: Introduction
description: A brief description of the page content
navigation:
  icon: i-ph-info
---
```

::note
The frontmatter section controls how your page appears in both navigation and search results. Be sure to include a descriptive title and concise description.
::

Common frontmatter properties:

- `title`: Page title (required)
- `description`: Brief summary of the page content (recommended)
- `navigation`: Control how the page appears in navigation
  - `icon`: Icon to display (using the i-ph-\* format)
  - `order`: Custom ordering number
- `navigation: false`: Hide page from navigation

### Headings

- Start page content with an H2 (##) since the title in frontmatter serves as H1
- Use heading levels sequentially (H2, then H3, then H4)
- Never skip heading levels
- Use sentence case for headings (capitalize first word and proper nouns only)
- Do not end headings with punctuation

::card{icon="i-ph-info" title="Heading Best Practices"}
Well-structured headings improve document readability and create better navigation through the auto-generated table of contents.
::

#### Heading Hierarchy

- **Title (frontmatter)**: Document title/main topic
- **H2 (##)**: Major sections
- **H3 (###)**: Subsections
- **H4 (####)**: Minor subsections (use sparingly)

### File Organization

Documentation files should follow this order:

1. Frontmatter with title and description
2. Brief introduction (1-2 paragraphs)
3. Main content with appropriate headings
4. Related links (if applicable)

## Formatting

### Code Blocks

Always specify the language for syntax highlighting:

::::tabs
:::tabs-item{label="Example" icon="i-ph-eye"}

```typescript
// TypeScript code here
function greet(name: string): string {
  return `Hello, ${name}!`;
}
```

:::
:::tabs-item{label="Markdown" icon="i-ph-code"}

````markdown
```typescript
// TypeScript code here
function greet(name: string): string {
  return `Hello, ${name}!`;
}
```
````

:::
::::

You can also add a filename to your code blocks:

```typescript [index.ts]
// TypeScript code with filename
const greeting = (name: string): string => {
  return `Hello, ${name}!`;
};

console.log(greeting("World"));
```

For inline code, use single backticks: `variable`.

::tip
When showing multiple code examples for different environments or languages, use the `code-group` component to organize them.
::

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

### Code Groups

For related code examples that should be viewed together, use code groups:

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

### Using Code Groups for Package Manager Commands

When showing installation or setup commands for different package managers, always use the code group component:

:::code-group

```bash [npm]
npm install @antelopejs/core
```

```bash [yarn]
yarn add @antelopejs/core
```

```bash [pnpm]
pnpm add @antelopejs/core
```

:::

**Important**: Always include all common package manager options (npm, yarn, pnpm) when showing installation commands to provide flexibility for users.

### Highlighting Code Lines

To emphasize specific lines in code examples, use the line highlighting syntax:

```typescript{3-4} [logger.ts]
// Simple logger utility
function logger(message: string, level: 'info' | 'warn' | 'error' = 'info') {
  // These lines will be highlighted
  const timestamp = new Date().toISOString();
  console.log(`[${level.toUpperCase()}] ${timestamp}: ${message}`);
}
```

### Mermaid Diagrams

Use the `<Mermaid>` component tags for all Mermaid diagrams:

::code-preview
<Mermaid>
flowchart TB
A[Start] --> B{Decision}
B -->|Yes| C[Result 1]
B -->|No| D[Result 2]
</Mermaid>

#code

```html
<Mermaid>
  flowchart TB A[Start] --> B{Decision} B -->|Yes| C[Result 1] B -->|No| D[Result 2]
</Mermaid>
```

::

### Tables

Format tables with aligned pipes:

| Header 1 | Header 2 | Header 3 |
| -------- | -------- | -------- |
| Value 1  | Value 2  | Value 3  |

```markdown
| Header 1 | Header 2 | Header 3 |
| -------- | -------- | -------- |
| Value 1  | Value 2  | Value 3  |
```

### Lists

- Use hyphens (-) for unordered lists
- Use numbers (1., 2., etc.) for ordered lists
- Maintain consistent indentation (2 spaces) for nested lists

### Callouts

Use the callout component to highlight important information:

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

```markdown
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
```

You can also add custom icons to standard callout components:

```markdown
::note{icon="i-ph-download"}
This note uses a custom download icon.
::

::tip{icon="i-ph-lightbulb"}
This tip uses a custom lightbulb icon.
::
```

**Important**: Always use these standard callout components (note, warning, caution, tip) rather than custom-colored callouts. Using the predefined types ensures consistency throughout the documentation and proper accessibility for all users. You may customize the icon if needed, but don't use custom colors.

### Accordion Components

Use accordions for FAQs or sections that can be expanded/collapsed:

::accordion
::accordion-item{label="What is Antelopejs?" icon="i-ph-info"}
Antelopejs is a framework for building scalable applications with TypeScript.
::
::accordion-item{label="How do I install Antelopejs?" icon="i-ph-download"}
You can install Antelopejs using npm, yarn, or pnpm. See the installation instructions for more details.
::
::

```markdown
::accordion
::accordion-item{label="What is Antelopejs?" icon="i-ph-info"}
Antelopejs is a framework for building scalable applications with TypeScript.
::
::accordion-item{label="How do I install Antelopejs?" icon="i-ph-download"}
You can install Antelopejs using npm, yarn, or pnpm. See the installation instructions for more details.
::
::
```

**Important**: Do NOT use accordions for important content that should always be visible, such as:

- Best practices
- Key principles or rules
- Reference information
- Lists of options or features

For this type of content, use regular headings with standard text or bulleted/numbered lists instead. This ensures all critical information is immediately visible without requiring user interaction.

### Step-by-Step Guides

For tutorials or procedures, use the steps component:

::steps{level="4"}

#### Install Antelopejs

```bash
npm install @antelopejs/cli
```

#### Create a configuration file

```typescript [config.ts]
export default {
  port: 3000,
  debug: true,
};
```

#### Start your application

```typescript [index.ts]
// Main application entry point
import { formatDate } from "./utils";
import { calculateTotal } from "./calculator";

// Create sample data
const orderDate = new Date();
const items = [
  { name: "Keyboard", price: 59.99, quantity: 1 },
  { name: "Mouse", price: 29.99, quantity: 1 },
];

// Display order summary
console.log(`Order Date: ${formatDate(orderDate)}`);
console.log(`Total: $${calculateTotal(items).toFixed(2)}`);
```

::

````markdown
::steps{level="4"}

#### Install Antelopejs

```bash
npm install @antelopejs/cli
```

#### Create a configuration file

```typescript [config.ts]
export default {
  port: 3000,
  debug: true,
};
```

#### Start your application

```typescript [index.ts]
// Main application entry point
import { formatDate } from "./utils";
import { calculateTotal } from "./calculator";

// Create sample data
const orderDate = new Date();
const items = [
  { name: "Keyboard", price: 59.99, quantity: 1 },
  { name: "Mouse", price: 29.99, quantity: 1 },
];

// Display order summary
console.log(`Order Date: ${formatDate(orderDate)}`);
console.log(`Total: $${calculateTotal(items).toFixed(2)}`);
```

::
````

### Links

Use descriptive link text and relative paths:

```markdown
[Interface documentation](../4.ref/api/1.introduction.md)
```

For internal navigation, use relative paths with the correct dot notation for directory and file names.

### Card Components

Use cards to highlight important sections or create visual navigation:

::card-group
::card{icon="i-ph-rocket-launch" title="Getting Started"}
Introduction to Antelopejs and basic setup.
::
::card{icon="i-ph-book-open" title="Guides"}
Step-by-step tutorials for common tasks.
::
::card{icon="i-ph-code" title="API Reference"}
Complete API documentation.
::
::

```markdown
::card-group
::card{icon="i-ph-rocket-launch" title="Getting Started"}
Introduction to Antelopejs and basic setup.
::
::card{icon="i-ph-book-open" title="Guides"}
Step-by-step tutorials for common tasks.
::
::card{icon="i-ph-code" title="API Reference"}
Complete API documentation.
::
::
```

## Language and Tone

- Use direct, clear language
- Use present tense
- Address the reader as "you"
- Be concise and avoid unnecessary words
- Use consistent terminology throughout

::note
Consistency in terminology helps users build a mental model of how Antelopejs works.
::

## Examples

All code examples should:

- Be functional and tested
- Include comments for complex parts
- Demonstrate best practices
- Use consistent naming conventions
- Be minimal while still demonstrating the concept

### Collapsible Large Code Examples

For larger code examples, use the code-collapse component:

::code-collapse

```typescript [advanced-example.ts]
// A more complex TypeScript example

// Define our types
interface Product {
  id: number;
  name: string;
  price: number;
}

interface CartItem {
  product: Product;
  quantity: number;
}

// Create a shopping cart class
class ShoppingCart {
  private items: CartItem[] = [];

  // Add an item to the cart
  addItem(product: Product, quantity: number = 1): void {
    const existingItem = this.items.find((item) => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({ product, quantity });
    }
  }

  // Remove an item from the cart
  removeItem(productId: number): void {
    this.items = this.items.filter((item) => item.product.id !== productId);
  }

  // Calculate the total price of items in the cart
  getTotal(): number {
    return this.items.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  }

  // Get all items in the cart
  getItems(): CartItem[] {
    return [...this.items];
  }
}

// Usage example
const keyboard: Product = { id: 1, name: "Mechanical Keyboard", price: 59.99 };
const mouse: Product = { id: 2, name: "Wireless Mouse", price: 29.99 };

const cart = new ShoppingCart();
cart.addItem(keyboard);
cart.addItem(mouse, 2);

console.log(`Total: $${cart.getTotal().toFixed(2)}`);
```

::

## Technical References

### CLI Command Documentation

For CLI commands, follow this structure:

1. Command name and brief description
2. Command syntax with placeholders in `<angle brackets>`
3. Description section explaining the command's purpose
4. Arguments table (if applicable)
5. Options table (if applicable)
6. Examples section with common use cases

::::tabs
:::tabs-item{label="Example" icon="i-ph-terminal"}

### cli generate

Generate a new project component.

```bash
cli generate <component-type> <name> [options]
```

#### Arguments

| Argument         | Description                                                |
| ---------------- | ---------------------------------------------------------- |
| `component-type` | Type of component to generate (module, component, service) |
| `name`           | Name of the component                                      |

#### Options

| Option         | Description                                          |
| -------------- | ---------------------------------------------------- |
| `--dry-run`    | Show what would be generated without writing to disk |
| `--skip-tests` | Skip generating test files                           |

#### Examples

```bash
# Generate a new module
cli generate module auth

# Generate a component with no tests
cli generate component button --skip-tests
```

:::
:::tabs-item{label="Markdown" icon="i-ph-code"}

````markdown
### cli generate

Generate a new project component.

```bash
cli generate <component-type> <name> [options]
```

#### Arguments

| Argument         | Description                                                |
| ---------------- | ---------------------------------------------------------- |
| `component-type` | Type of component to generate (module, component, service) |
| `name`           | Name of the component                                      |

#### Options

| Option         | Description                                          |
| -------------- | ---------------------------------------------------- |
| `--dry-run`    | Show what would be generated without writing to disk |
| `--skip-tests` | Skip generating test files                           |

#### Examples

```bash
# Generate a new module
cli generate module auth

# Generate a component with no tests
cli generate component button --skip-tests
```
````

:::
::::

### Interface Documentation

For interface documentation, follow this structure:

1. Interface overview
2. Version information
3. Methods and properties
4. Usage examples
5. Implementation notes (if applicable)

::note
Use code-preview components to show both the interface definition and example usage.
::

## File and Directory Naming

- Use lowercase for all file and directory names
- Use dots for numeric prefixes (e.g., `1.introduction.md`, `2.guide/`)
- Include section numbers for ordering (e.g., `1.get-started/`, `2.guide/`)
- Create a `.navigation.yml` file in each directory to control navigation display

### Navigation YAML Structure

```yaml
title: Get Started
icon: i-ph-rocket-launch
```

## Images and Diagrams

- Store images in the `public/images` directory
- Use descriptive filenames for images
- Include alt text for all images
- Prefer SVG format for diagrams
- Use appropriate width (typically 100% or less)

::tip
When adding screenshots, consider using a consistent window size and theme to maintain visual consistency.
::

For embedding images:

```markdown
![Alt text](/images/diagram.svg)
```

For more control over image display, use the HTML img tag:

```html
<img src="/images/diagram.svg" alt="System architecture diagram" width="100%" />
```

## Keyboard Shortcuts

For keyboard shortcuts, use the `Kbd` component:

Press <Kbd value="Ctrl"/> + <Kbd value="C"/> to copy.

```markdown
Press <Kbd value="Ctrl"/> + <Kbd value="C"/> to copy.
```

## Terminology

Always use the official terminology from the Antelopejs project:

- Antelopejs (not Antelope.js or antelope)
- Interface (when referring to the framework concept)
- Module (when referring to Antelopejs modules)

## Maintaining Documentation

- Review documentation for each new release
- Update examples to reflect current best practices
- Remove references to deprecated features
- Add notes about breaking changes

## Index Pages

Each directory should have an index.md file that serves as an entry point and overview page for that section.

### Index Page Card Groups

For index pages, use card groups to provide navigation to all chapters within that section:

```markdown
::card-group
::card{icon="i-ph-info" title="Introduction" to="/docs/section/introduction"}
Brief description of what the introduction covers.
::
::card{icon="i-ph-code" title="Setup" to="/docs/section/setup"}
Brief description of what the setup guide covers.
::
::card{icon="i-ph-rocket" title="Advanced Usage" to="/docs/section/advanced-usage"}
Brief description of what the advanced usage guide covers.
::
::
```

Make sure to:

- Include all chapters from the section
- Use appropriate icons that match the chapter's content
- Write concise descriptions (1-2 sentences)
- Use correct relative paths in the `to` attribute
- Match the card title with the actual chapter title

**Note**: All index pages should have `navigation: false` in their frontmatter to hide them from the sidebar navigation.
