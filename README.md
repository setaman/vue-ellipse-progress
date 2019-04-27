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
## Options


| Prop     | Type   | Values  | Default | Required | Desciption |
|----------|--------|---------|---------|----------|------------|
| `progress` | Number | 0 - 100 |         | &check;      |      |
| `size` | Number | any |  200       |     |      |
| `line` | String | "round", "square", "butt" |  round|    |      |
| `thickness` | Number | \>0 |  5 |    |      |
| `lineMode` | Object | `{` <br> `mode: [normal \ out \ out_overlap \ in \ in_overlap \ top \ bottom]` <br> `offset: >0 `<br> `}`|  5 |    |      |
| `empty_thickness` | Number | \>0 |  5 |    |      |

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
