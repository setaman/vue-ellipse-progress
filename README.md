# vue-ellipse-progress
A Vue.js component to create beautiful animated circular progress bars

<div align="center" style="text-align: center;">
  <img width="300" height="300" src="https://github.com/setaman/Bilder/blob/master/vue_ellipse_logo_v2.svg">  
</div>

<br/>

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
The library is provided as a Vue.js plugin. So just initialize it in your ``main.js``
```js
import VueEllipseProgress from 'vue-ellipse-progress';

Vue.use(VueEllipseProgress);
```
Now use the component
```html
<vue-ellipse-progress 
  :progress="progress"
  :angle="-90"
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
  fontColor="white"
  fontSize="5rem">
  
  <span slot="legend-value">/200</span>
  <p slot="legend-capture">GOOD JOB</p>
  
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

> :grey_exclamation: Also make sure to check **[slot options](#slot-options)** 

| Prop     | Type   | Values  | Default |
|----------|--------|---------|---------|
| **[`progress`](#progress)** | Number | 0 - 100 |   
| **[`size`](#size)** | Number | >=0 |  200       |     |     
| **[`line`](#line)** | String | round \| square \| butt |  round|   
| **[`thickness`](#thickness)** | Number | \>=0 |  5 |    |        
| **[`lineMode`](#linemode)** | Object | `{` <br> `mode: normal \| out \| out_overlap \| in \| in_overlap \| top \| bottom` <br> `offset: any `<br> `}` | `{` <br> `mode: normal` <br> `offset: 0` <br> `}` |   
| **[`emptyThickness`](#emptythickness)** | Number | \>=0 |  5 |    |  
| **[`color`](#color)** | String \| Object | any color as string or object (see details) |  #3f79ff |   
| **[`colorFill`](#colorfill)** | String \| Object | any color as string or object (see details) |  transparent |
| **[`emptyColor`](#emptycolor)** | String \| Object | any color as string or object (see details) |  #e6e9f0 |
| **[`emptyColorFill`](#emptycolorfill)** | String \| Object | any color as string or object (see details) |  transparent |
| **[`legend`](#legend)** | Boolean | your know this |  true |
| **[`legendValue`](#legendvalue)** | Number |  |   |
| **[`animation`](#animation)** | Object | see details | `{` <br> `type:default` <br> `duration: 1000` <br> `delay: 400` <br> `}`|
| **[`loading`](#loading)** | Boolean |  |false|
| **[`noData`](#nodata)** | Boolean |  |false|
| **[`angle`](#angle)** | Number | any number |-90|
| **[`fontSize`](#fontsize)** | String | any valid css value | relative |
| **[`fontColor`](#fontsize)** | String | any valid css value | gray |
| **[`legendClass`](#legendclass)** | String | any |  |

<br>

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

<br>

- ### `size` 

###### Animated: :heavy_check_mark: 

is any Number from 0 to infinity. Defines the width and height of the circle. The circumference of the circle is calculated depending on the properties **[`lineMode`](#linemode)**, **[`thickness`](#thickness)** and **[`emptyThickness`](#emptythickness)** so the progress circle never exceeds the `size` value! 

>:heavy_exclamation_mark: check **[`lineMode`](#linemode)** property to understand how the progress circle behaves depending on the line mode and offset.

<br>

- ### `line` 

is any string value from `round | square | butt`. Defines the progress circle line cap. Internaly is used the css property `stroke-linecap`.

<br>

- ### `thickness` 

###### Animated: :heavy_check_mark:

is any Number >=0. Defines the progress circle line thickness. Internaly is used the css property `stroke-width`.

<br>

- ### `lineMode` 

###### Animated: :heavy_check_mark: 

This property defines how the progress line is aligned in relation to empty line. You can undestand the modes as the preset that helps you to easy align lines as you need. 

- `mode`:
  - `normal`: this is the default value and both lines are aligned at the base line (centered).
  <img width="100" height="50" src="https://github.com/setaman/Bilder/blob/master/ellipse-normal.png">
  
  - `in`: the progress line is inside the empty circle
  <img width="100" height="40" src="https://github.com/setaman/Bilder/blob/master/ellipse-in.png">
  
   - `in-over`: the progress line is also inside the empty circle but overlap the empty circle 
  <img width="100" height="35" src="https://github.com/setaman/Bilder/blob/master/ellipse-in.over.png">
  
  - `out`: the progress line is outside the empty circle
  <img width="100" height="35" src="https://github.com/setaman/Bilder/blob/master/ellipse-out.png">
  
  - `out-over`: the progress line is also outside the empty circle but overlap the empty circle
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

As you can see the second and fourth examples are similar to the modes `bottom` and `top`. Only with the modes `in` and `out` and the `offset` you can achive the same result. But the povided modes like a presets take care about annoying calculations and do the job for you. Make sure to play with this values in the demo!

<br>

- ### `emptyThickness` 

###### Animated: :heavy_check_mark:

is any Number >=0. Defines the empty circle line thickness. Internaly is used the css property `stroke-width`.

<br>

- ### `color`

Defines the color of progress circle **line**. Is any css color like `#123` or `lime` or an objects that defines gradient.

- `color:` (String) '#3f79ff'

- `color:` (Object)
  - `gradient:` (Object) defines the gradient
    - `radial` default `false`. Defines whether the gradient is radial or linear
    - `direction` not implemented yet
    - `colors:` (Array) contains the gradient colors as an object `{color: "#6546f7", offset: 0, opacity: 1}`
    
###### Example: :scroll:

Now you are ready for an bad example.

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
    
I also recommend you to play with this values in the demo to finde perfect colors for you!

<br>

- ### `colorFill`

defines the fill color of the progress circle. Takes the same value as **[`color`](#color)**

<br>

- ### `emptyColor`

defines the color of the empty circle **line**. Takes the same value as **[`color`](#color)**

<br>

- ### `emptyColorFill`

defines the fill color of the empty circle. Takes the same value as **[`color`](#color)**

<br>

- ### `legend`

is a Boolean. Defines whether the **[`progress`](#progress)** or from you defined  **[`legendValue`](#legendvalue)** is displayd as the legend of the circle.

<br>

- ### `legendValue`

###### Animated: :heavy_check_mark:

is any Number. Use this property if you want to customize the shown progress as the legend of the circle. If defined `legendValue` replaces **[`progress`](#progress)** as the circle legend!

###### Example: :scroll:

Lets say you have to display a rating from 0 to 5 of a product with 3.5 stars. Since **[`progress`](#progress)** can take values only from 0 to 100 your need an additionall property `legendValue`. Now you can set `legendValue = 3.5` and calculate the progress something like that:

```js
this.progress = 3.5 * 100 / 5; // the rating percentage
```
Now you can display custom progress value that still animated and circle progress fills properly!

>:heavy_exclamation_mark: note that `legendValue` excludes **[`progress`](#progress)** but not vice versa.

<br>

- ### `animation`

defines the initial animation of progress circle line filling. You can choose one from predefined animations and set a specific duration and delay. 

- `type:`
  - `none | default | rs | reverse | bounce| loop` try this animations in the demo!
- `durations` Number in milliseconds, default `1000`
- `delay` Number in milliseconds, default `400`

###### Example: :scroll:

```js
:animation="{type: 'rs', duration: 700, duration: 200}"
```

<br>

- ### `loading`

forces loading state. The component provide an indeterminate state for the case that you data is not available immediately. With this property set `true` you can use the component as the indeterminate progress. 

<br>

- ### `noData`

forces no data state. The component provide an no data state for the case that you data is not available. The circle progress still empty.

>:heavy_exclamation_mark: the component takes the no data state also if you provide an invalid **[`progress`](#progress)** value 

<br>

- ### `angle`

is any Number. Defines the starting point of the progress circle line 

<br>

- ### `fontSize`

is any valid css size property or `relative`(coming soon). Defines the font size of the circles legend

<br>

- ### `fontColor`

is any valid css color. Defines the color of the circles legend

<br>

- ### `legendClass`

adds class to the circles legend to give you the possibility to style it

<br>

### Slot options

- #### `legend-value`

in this slot you can put an additionall elemnt that you want to display biside the progress

- #### `legend-caption`
in this slot you can put any HTML and slye it on your own. This slot is aligned below the progress 

###### Example: :scroll:

This code ...
```html
<vue-ellipse-progress ....>
  
    <span slot="legend-value">/200</span>
    <p slot="legend-caption">TASKS DONE</p>
  
</vue-ellipse-progress>
```
... produces following result. The slots are marked corresponding:

<img width="100" height="100" src="https://github.com/setaman/Bilder/blob/master/ellipse-slots.png">

<br>

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
