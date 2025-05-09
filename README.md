![AntelopeJS](.github/social-card.png)

# Antelopejs Documentation

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![Documentation Status](https://img.shields.io/badge/docs-latest-brightgreen)](https://antelopejs.com)

## Overview

Antelopejs is a modern Node.js framework designed to help you build fast, stable applications. Written in TypeScript, it enables the creation of high-quality modules that work together seamlessly.

## Documentation

Visit our [documentation website](https://antelopejs.com) for detailed guides and API references.

## Contributing Modules

To add your module to the AntelopeJS module store:

1. Create a YAML file in the `content/modules` directory with your module's information
2. The YAML file should include the following properties:
   - `name`: Your module name
   - `description`: Short description of your module
   - `repo`: GitHub repository (username/repo)
   - `npm`: NPM package name
   - `icon`: Path to module icon (or use default)
   - `github`: GitHub repository URL
   - `documentation`: URL to module documentation
   - `category`: Array of categories the module belongs to
   - `interface`: Array of interfaces implemented
   - `official`: Boolean flag (true for official modules)
3. Submit a Pull Request to this repository

## Contributing Interfaces

To add your interface to the AntelopeJS interface collection:

1. Update the `content/interfaces.yml` file with your interface information
2. Each interface entry should include:
   - `title`: Interface name
   - `slug`: URL-friendly identifier
   - `description`: Detailed description of the interface functionality
   - `thumbnail`: URL to the interface thumbnail/social card image
   - `docs`: URL to interface documentation
   - `links`: Array of navigation links for the interface
   - `features`: Array of key features with titles and icons
3. Submit a Pull Request to this repository

## Support

- [GitHub Issues](https://github.com/AntelopeJS/docs/issues)
- [Discord Community](https://discord.gg/antelopejs)
- [Twitter](https://twitter.com/antelopejs)

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.
