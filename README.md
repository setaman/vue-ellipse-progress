# vue-ellipse-progress
A Vue.js component to create beautiful animated circular progress bars

[![Known Vulnerabilities](https://snyk.io/test/github/setaman/vue-ellipse-progress/badge.svg?targetFile=package.json)](https://snyk.io/test/github/setaman/vue-ellipse-progress?targetFile=package.json)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)

[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/made-with-vue.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/check-it-out.svg)](https://forthebadge.com)
## How to use
install the library via npm
```
npm i -S vue-ellipse-progress
```
The library is provided as Vuejs plugin. So just initialize it in your ``main.js``
```js
import VueEllipseProgress from 'vue-ellipse-progress';

Vue.use(VueEllipseProgress);
```
Now use the component
```html
<vue-ellipse-progress 
  :progress="progress"
  :color="color"
  :loading="loading"
  :emptyColor="empty_color"
  :size="size"
  :thickness="10"
  :emptyThickness="5"
  :lineMode="{mode: 'in', offset: 10}"
  :legend="true"
  :legendValue="tasks_done"
  :noData="noData"
  :animation="{type: 'reverse', duration: 700, delay: 400}"
  :fontColor="white"
  fontSize="5rem">
  
  <span slot="legend_value">/200</span>
  <p slot="legend_capture">GOOD JOB</p>
  
</vue-ellipse-progress>
``` 
## Options
This table provide a quick overview over all available options. For more information and how to create exclusive circles 
using this properties please read below the table.

| Prop     | Type   | Values  | Default | Required | Animated|
|----------|--------|---------|---------|----------|---------|
| **[`progress`](#progress)** | Number | 0 - 100 |         | :heavy_check_mark:      | &check;      |
| **[`size`](#size)** | Number | any |  200       |     |      |
| **[`line`](#line)** | String | "round", "square", "butt" |  round|    | &check;      |
| **[`thickness`](#thickness)** | Number | \>=0 |  5 |    |  &check;      |    
| **[`lineMode`](#linemode)** | Object | `{` <br> `mode: normal \| out \| out_overlap \| in \| in_overlap \| top \| bottom` <br> `offset: any `<br> `}` | `{` <br> `mode: normal` <br> `offset: 0` <br> `}` |    | &check;      | 
| **[`emptyThickness`](#emptythickness)** | Number | \>=0 |  5 |    | &check;      |   
| **[`color`](#color)** | String \| Object | any color as string or object (see details) |  #3f79ff |    |    |   

- ### `progress` 
is any Number from 0 to 100 (including **decimals**). This property defines the filled area from progress circle in 
percent. 'progress' is animated and count up or down on any value changes whit duration defined in 
**[`animation:duration`](#animation)** property. 
- ### `size` 
coming soon
- ### `line` 
coming soon
- ### `thickness` 
coming soon
- ### `lineMode` 
coming soon
- ### `emptyThickness` 
coming soon
- ### `color`
coming soon 
- ### `animation`
coming soon  
## Run project local
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```
