# Fix Files Navigation Plug-in

Plug-in for the [Canvas LMS theme app](https://github.com/artevelde-uas/canvas-lms-app) that fixes some navigation issues on file explorer pages.

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
  