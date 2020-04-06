# Fix Files Navigation Plug-in

[![](https://img.shields.io/npm/v/@artevelde-uas/canvas-lms-fix-files-navigation-plugin.svg)](https://www.npmjs.com/package/@artevelde-uas/canvas-lms-fix-files-navigation-plugin)
[![](https://img.shields.io/github/license/artevelde-uas/canvas-lms-fix-files-navigation-plugin.svg)](https://spdx.org/licenses/MIT)
[![](https://img.shields.io/npm/dt/@artevelde-uas/canvas-lms-fix-files-navigation-plugin.svg)](https://www.npmjs.com/package/@artevelde-uas/canvas-lms-fix-files-navigation-plugin)

Plug-in for the [Canvas LMS theme app](https://github.com/artevelde-uas/canvas-lms-app) that fixes some navigation issues on file explorer pages.

#### Before:
![Example image](docs/example-before.png)

#### After:
![Example image](docs/example-after.png)

## Installation

Using NPM:

    npm install @artevelde-uas/canvas-lms-fix-files-navigation-plugin

Using Yarn:

    yarn add @artevelde-uas/canvas-lms-fix-files-navigation-plugin

## Usage

Just import the plug-in and add it to the Canvas app:

```javascript
import canvas from '@ahsdile/canvas-lms-app';
import fixFilesNavigationPlugin from '@artevelde-uas/canvas-lms-fix-files-navigation-plugin';

canvas.addPlugin(fixFilesNavigationPlugin);

canvas.run();
```
