![AntelopeJS](.github/social-card.png)

# Antelopejs Documentation

<div align="center">
<a href="./LICENSE"><img alt="License" src="https://img.shields.io/badge/License-Apache_2.0-blue.svg?style=for-the-badge&labelColor=000000"></a>
<a href="https://discord.gg/sjK28QHrA7"><img src="https://img.shields.io/badge/Discord-18181B?logo=discord&style=for-the-badge&color=000000" alt="Discord"></a>
<a href="https://antelopejs.com"><img src="https://img.shields.io/badge/Docs-18181B?logo=Antelope.JS&style=for-the-badge&color=000000" alt="Documentation"></a>
</div>

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
