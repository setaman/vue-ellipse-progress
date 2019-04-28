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
The library is provided as a Vuejs plugin. So just initialize it in your ``main.js``
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
Actually you are ready to go with only following line:
```html
<vue-ellipse-progress :progress="progress"/>
```
The `progress` is the only one required property. However in order to created unique circles that match your design needs you can use all the properties explained below.

This table provide a quick overview over all available options. For more information and how to create exclusive circles 
using this properties please read below the table.

| Prop     | Type   | Values  | Default | Required |
|----------|--------|---------|---------|----------|
| **[`progress`](#progress)** | Number | 0 - 100 |         | :heavy_check_mark:      |
| **[`size`](#size)** | Number | >=0 |  200       |     |      |
| **[`line`](#line)** | String | round \| square \| butt |  round|    |
| **[`thickness`](#thickness)** | Number | \>=0 |  5 |    |  &check;      |    
| **[`lineMode`](#linemode)** | Object | `{` <br> `mode: normal \| out \| out_overlap \| in \| in_overlap \| top \| bottom` <br> `offset: any `<br> `}` | `{` <br> `mode: normal` <br> `offset: 0` <br> `}` |    | 
| **[`emptyThickness`](#emptythickness)** | Number | \>=0 |  5 |    |  
| **[`color`](#color)** | String \| Object | any color as string or object (see details) |  #3f79ff |    |  

- ### `progress`

###### Animated: :heavy_check_mark: 

is any Number from 0 to 100 (including **decimals**). This property defines the filled area from progress circle line in 
percent. `progress` is animated and count up or down on any value changes with duration defined in 
**[`animation:duration`](#animation)** property. How the progress is calculated is up to you. The progress is shown by default as the **legend** of the circle.

###### Example: :scroll:

```js
this.progress = 55.5;
this.progress = this.tasksDone * 100 / maxTasks; // the percentage of done tasks
```

>:heavy_exclamation_mark: the progress is always used to fill the circle line progress. So you can not customize this value and all values under 0 and above 100 are ignored. For customization purpose please use **[`legendValue`](#legendvalue)**. 
>if **[`legendValue`](#legendvalue)** is defined the progress is **NOT** displayed.


- ### `size` 

###### Animated: :heavy_check_mark: 

is any Number from 0 to infinity. Defines the width and height of the circle. The circumference of the circle is calculated depending on the properties **[`lineMode`](#linemode)**, **[`thickness`](#thickness)** and **[`emptyThickness`](#emptythickness)** so the progress circle never exceeds the `size` value! 

>:heavy_exclamation_mark: check **[`lineMode`](#linemode)** property to understand how the progress circle behaves depending on line the mode and offset.

- ### `line` 

is any string value from `round | square | butt`. Defines the progress circle line cap. Internaly is used the css property `stroke-linecap`.

- ### `thickness` 

###### Animated: :heavy_check_mark:

is any Number >=0. Defines the progress circle line thickness. Internaly is used the css property `stroke-width`.

- ### `lineMode` 

###### Animated: :heavy_check_mark: 

This property defines how the progress line is aligned in relation to empty line. You can undestand the modes as the preset values, that defines in wich direction the progress line grows. 

- `mode`:
  - `normal`: this is the default value and both lines are aligned at the base line (centered).
  <img width="100" height="50" src="https://github.com/setaman/Bilder/blob/master/ellipse-normal.png">
  
  - `in`: the progress line is inside the empty circle and grows inside
  <img width="100" height="40" src="https://github.com/setaman/Bilder/blob/master/ellipse-in.png">
  
   - `in-over`: the progress line is also inside the empty circle but overlap the empty circle and grows inside 
  <img width="100" height="35" src="https://github.com/setaman/Bilder/blob/master/ellipse-in.over.png">
  
  - `out`: the progress line is outside the empty circle
  <img width="100" height="35" src="https://github.com/setaman/Bilder/blob/master/ellipse-out.png">
  
  - `out-over`: the progress line is also outside the empty circle but overlap the empty circle and grows outside
  <img width="100" height="35" src="https://github.com/setaman/Bilder/blob/master/ellipse-out-over.png">
  
  - `bottom`: the progress line is aligned at the bottom of the empty circle
  <img width="100" height="35" src="https://github.com/setaman/Bilder/blob/master/ellipse-bottom.png">
  
  - `top`: the progress line is aligned at the top of the empty circle
  <img width="100" height="35" src="https://github.com/setaman/Bilder/blob/master/ellipse-top.png">

- `offset`: is any negative o positive number and defines the distance between the progress and empty lines. Can be **only** combied with the `in` and `out` modes

###### Example: :scroll:

Lets take a look at few examples

| `{mode: 'in', offset: 10}`  | `{mode: 'in', offset: -10}`   | `{mode: 'out', offset: 10}`  | `{mode: 'out', offset: -15}` |
|----------|--------|---------|---------|
| <img width="100" height="100" src="https://github.com/setaman/Bilder/blob/master/ellipse-exmp1.png">|<img width="100" height="100" src="https://github.com/setaman/Bilder/blob/master/ellipse-exmp2.png">|<img width="100" height="100" src="https://github.com/setaman/Bilder/blob/master/ellipse-exmp3.png">|<img width="100" height="100" src="https://github.com/setaman/Bilder/blob/master/ellipse-exmp4.png"> |

As you can see in the second and fourth examples these are similar to the modes `bottom` and `top`. Only with the modes `in` and `out` and the `offset` you can achive the same result. But these modes like a presets take care about annoying calculations and do the job for you. Make sure to play with this values in the demo!

- ### `emptyThickness` 

###### Animated: :heavy_check_mark:

is any Number >=0. Defines the empty circle line thickness. Internaly is used the css property `stroke-width`.

- ### `color`

Defines the color of progress circle **line**. Is any css color like `#123` or `lime` or an objects that defines gradient.

- `color:` (String) '#3f79ff'

- `color:` (Object)
  - `gradient:` (Object) defines the gradient
    - `radial` default `false`. Defines whether the gradient is radial or linear
    - `direction` not implemented yet
    - `colors:` (Array) contains the gradient colors as an object `{color: "#6546f7", offset: 0, opacity: 1}`
    
I also recommend you to play with this values in the demo to finde perfect colors for you!

###### Example: :scroll:

Now you are ready for an bad example

```js
color: {
      gradient: {
        radial: false,
        colors: [
          {
            color: '#6546f7',
            offset: '0',
            opacity: '1',
          },
          {
            color: 'lime',
            offset: '100',
            opacity: '1',
          },
        ],
      },
    },
```
<img width="100" height="100" src="https://github.com/setaman/Bilder/blob/master/ellipse-gradient.png">


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
