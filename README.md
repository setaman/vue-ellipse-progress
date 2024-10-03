# vue-ellipse-progress
[![npm (tag)](https://img.shields.io/npm/v/vue-ellipse-progress/next?color=success&label=NPM&style=for-the-badge)](https://www.npmjs.com/package/vue-ellipse-progress)
![GitHub](https://img.shields.io/github/license/setaman/vue-ellipse-progress?style=for-the-badge)
![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/setaman/vue-ellipse-progress/build.yml?style=for-the-badge)

A dependency-free, simple, flexible and smooth Vue.js plugin to create beautiful circle progress bars, 
implemented with SVG.
Follow these three steps to get started:
```js
// install
npm i vue-ellipse-progress@next
// initialize
import veProgress from "vue-ellipse-progress";
createApp(App).use(veProgress);
// use
<ve-progress :progress="50"/>
```
> [!TIP]
> Dive into the [documentation ](https://setaman.github.io/vue-ellipse-progress-docs/) to 
> get more information about the installation, usage, and configuration of the plugin.
> Explore a wide range of interactive examples showcasing various styles, animations, and use cases.

- [Installation](https://setaman.github.io/vue-ellipse-progress-docs/guide/installation.html)
- [Usage](https://setaman.github.io/vue-ellipse-progress-docs/guide/usage.html)
- [Configuration](https://setaman.github.io/vue-ellipse-progress-docs/guide/options/)
- [Compatibility](https://setaman.github.io/vue-ellipse-progress-docs/guide/compatibility.html)
- [Development](https://setaman.github.io/vue-ellipse-progress-docs/guide/development.html)
- [Contributing](https://setaman.github.io/vue-ellipse-progress-docs/guide/contribution.html)

<div align="center" style="text-align: center;">
  <img src="https://github.com/setaman/Bilder/blob/master/vue-ellipse-demo.gif" alt="Component demo">  
</div>

## Quick start

Install via npm:
```
npm i vue-ellipse-progress@next
```

Import and initialize the component in your `main.js`. After initialization, the component is available as `<ve-progress/>`.
```js
import { createApp } from "vue";
import veProgress from "vue-ellipse-progress";
createApp(App).use(veProgress);
```
You also have the option to import the component directly:
```js
import { VeProgress } from "vue-ellipse-progress";
```

### CDN
To use the component without a build tool you can customize and get the `veprogress.umd.min.js` file from [JSDelivr](https://www.jsdelivr.com/package/npm/vue-ellipse-progress).
Just add the following line to your HTML and initialize the component as plugin:
```html
<script src="https://cdn.jsdelivr.net/npm/vue-ellipse-progress/dist/veprogress.umd.min.js"></script>
...
createApp(App).use(veprogress);
```

## Development

The development always happens in `dev` branch. You'll find all the latest updates there. 
`dev` will only be merged into the master when all unit tests have been passed, builds are successful, 
documentation is updated, and functionality is verified on the [documentation ](https://setaman.github.io/vue-ellipse-progress-docs/). 
Before all that, changes remain in beta.

#### Run for local development
The project was initialized with Vue CLI. Execute the following commands to start development locally:
```
npm i
npm run serve
```
