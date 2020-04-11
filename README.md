# vue-ellipse-progress

[![Known Vulnerabilities](https://snyk.io/test/github/setaman/vue-ellipse-progress/badge.svg?targetFile=package.json)](https://snyk.io/test/github/setaman/vue-ellipse-progress?targetFile=package.json)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)

[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/made-with-vue.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/check-it-out.svg)](https://forthebadge.com)

A Vue.js component to create beautiful animated circular progress bars, created with SVG. The purpose of this plugin is to combine the best properties of other available libraries and add uniqe features, delivered in a simple to use compnent with friendly interface.

- [Usage](#usage)
- [Options](#options)
- [Compatibility](#compatibility)
- [Development](#development)

:grey_exclamation: Live interactive [DEMO here](https://vue-ellipse-progress-demo.netlify.com) :grey_exclamation:

<div align="center" style="text-align: center;">
  <img src="https://ibb.co/qxxxwH4" alt="Component demo">  
</div>

## Usage
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
  :data="circles"                    
  :progress="progress"
  :angle="-90"
  color="blue"
  :colorFill="colorFillGradient"
  emptyColor="#8ec5fc"
  :emptyColorFill="emptyColorFillGradient"                      
  :size="300"
  :thickness="10"
  emptyThickness="10%"
  lineMode="in 10"
  :legend="true"
  :legendValue="180"
  legendClass="legend-custom-style"
  dash="60 0.9"
  animation="reverse 700 400"
  :noData="false"
  :loading="false"                      
  fontColor="white"
  :half="false"                      
  fontSize="5rem">
  
  <span slot="legend-value">/200</span>
  <p slot="legend-caption">GOOD JOB</p>
  
</vue-ellipse-progress>
``` 
## Options
Actually you are ready to go with only following line:
```html
<vue-ellipse-progress :progress="progress"/>
```
The **[`progress`](#progress)** is the only one required property. However in order to created unique circles that match your design needs you can use all the properties explained below.

This table below provides a quick overview over all available options. To gain more information in generell and conserning the creation of exclusive circles please read below the table.

> :grey_exclamation: Also make sure to check **[slot options](#slot-options)** 

| Prop     | Type   | Values  | Default |
|----------|--------|---------|---------|
| **[`progress`](#progress)** | Number | 0 - 100 | 
| **[`size`](#size)** | Number | >=0 |  200       |     |     
| **[`line`](#line)** | String | "round \| square \| butt" |  "round"|   
| **[`thickness`](#thickness)** | Number \| String | \>=0 as Number or percent value as String|  "5%" |      
| **[`lineMode`](#linemode)** | String | "normal \| out \| out-over \| in \| in-over \| top \| [ offset ]" | "normal 0" |   
| **[`emptyThickness`](#emptythickness)** | Number \| String | \>=0 as Number or percent value as String |  "5%" |     
| **[`color`](#color)** | String \| Object | any color as string or object to specify gradient (see details) |  "#3f79ff" |   
| **[`colorFill`](#colorfill)** | String \| Object | same as `color` |  transparent |
| **[`emptyColor`](#emptycolor)** | String \| Object | same as `color` |  "#e6e9f0" |
| **[`emptyColorFill`](#emptycolorfill)** | String \| Object | same as `color` |  "transparent" |
| **[`legend`](#legend)** | Boolean | your know it |  true |
| **[`legendValue`](#legendvalue)** | Number | any |   |
| **[`animation`](#animation)** | String | "default \| rs \| loop \| reverse \| bounce [duration delay]" | "default 1000 400"|
| **[`loading`](#loading)** | Boolean |  |false|
| **[`determinate`](#determinate)** | Boolean |  |false|
| **[`noData`](#nodata)** | Boolean |  |false|
| **[`angle`](#angle)** | Number | any number |-90|
| **[`fontSize`](#fontsize)** | String | any valid css value | "1rem" |
| **[`fontColor`](#fontsize)** | String | any valid css value | "gray" |
| **[`legendClass`](#legendclass)** | String | any |  |
| **[`dash`](#dash)** | String | "count spacing" |  |
| **[`half`](#half)** | Boolean |  | false |
| **[`gap`](#gap)** | Number | Defines the gap between multiple circles | 0 |
| **[`data`](#data)** | Array | Defines multiple circles, takes as values objects with all props defined above | |


<br>


- ### `progress`

###### Animated: :heavy_check_mark: 

is any Number from 0 to 100 (including **decimals**). This property defines the filled area from progress circle line in 
percent. `progress` is animated and counts up or down on any value changes with duration defined in 
**[`animation.duration`](#animation)** property. The calculation of the progress is up to you. The progress is shown by default as the **legend** in the middle of the circle.

###### Example: :scroll:

```js
this.progress = 55.5;
this.progress = this.tasksDone * 100 / maxTasks; // the percentage of done tasks
```

>:heavy_exclamation_mark: The `progress` is always used to fill the progress circle line. So you cannot customize this value. All values below 0 and above 100 are ignored. For customization purpose please use **[`legendValue`](#legendvalue)**. 
>If **[`legendValue`](#legendvalue)** is defined the progress will **NOT** be displayed as circle legend.

<br>

- ### `size` 

###### Animated: :heavy_check_mark: 

Is any number from >=0. It defines the width and height of the circle. The calculation of the circumference of the circle depends on the properties **[`lineMode`](#linemode)**, **[`thickness`](#thickness)** and **[`emptyThickness`](#emptythickness)** so the progress circle never exceeds the `size` value! 

>:heavy_exclamation_mark: Check **[`lineMode`](#linemode)** property to understand how the progress circle behaves depending on the line mode and offset.

<br>

- ### `line` 

is a string value from `round | square | butt`. Defines the progress circle line cap. Internaly is used the css property `stroke-linecap`.

<br>

- ### `thickness` 

###### Animated: :heavy_check_mark:

Is any number or percent value >=0. It defines the progress circle line thickness. If you define the value in percent, the thickness will be calculated in relation to **[`size`](#size)**. Internaly is used the css property `stroke-width`.

<br>

- ### `lineMode` 

###### Animated: :heavy_check_mark: 

Descriptive string in form `"mode [offset]"` that defines how the progress line is aligned in relation to empty line. The first value ist the `mode` and the optional second is the `offset`. You can understand the modes as the presets that help you to align lines as you want to. 

- `mode`:
  - `normal`: this is the default value and both lines are aligned at the base line (centered).
  <img width="100" height="50" src="https://github.com/setaman/Bilder/blob/master/ellipse-normal.png">
  
  - `in`: the progress line is inside the empty circle
  <img width="100" height="40" src="https://github.com/setaman/Bilder/blob/master/ellipse-in.png">
  
   - `in-over`: the progress line is both inside the empty circle and overlaps the empty circle 
  <img width="100" height="35" src="https://github.com/setaman/Bilder/blob/master/ellipse-in.over.png">
  
  - `out`: the progress line is outside the empty circle
  <img width="100" height="35" src="https://github.com/setaman/Bilder/blob/master/ellipse-out.png">
  
  - `out-over`: the progress line is both outside the empty circle and overlaps the empty circle
  <img width="100" height="35" src="https://github.com/setaman/Bilder/blob/master/ellipse-out-over.png">
  
  - `bottom`: the progress line is aligned at the bottom of the empty circle
  <img width="100" height="35" src="https://github.com/setaman/Bilder/blob/master/ellipse-bottom.png">
  
  - `top`: the progress line is aligned at the top of the empty circle
  <img width="100" height="35" src="https://github.com/setaman/Bilder/blob/master/ellipse-top.png">

- `offset`: is any negative or positive number and defines the distance between the progress and empty lines. It can be **only** combied with the `in` and `out` modes

###### Example: :scroll:

Let's take a look at few examples

| `'in 10'`  | `'in 10'`   | `'out 10'`  | `'out 15'` |
|----------|--------|---------|---------|
| <img width="100" height="100" src="https://github.com/setaman/Bilder/blob/master/ellipse-exmp1.png">|<img width="100" height="100" src="https://github.com/setaman/Bilder/blob/master/ellipse-exmp2.png">|<img width="100" height="100" src="https://github.com/setaman/Bilder/blob/master/ellipse-exmp3.png">|<img width="100" height="100" src="https://github.com/setaman/Bilder/blob/master/ellipse-exmp4.png"> |

As you can see the second and fourth examples are similar to the modes `bottom` and `top`. Only with the modes `in` and `out` and the `offset` you can achive the same result. But the povided modes like a presets take care about annoying calculations and do the job for you.

<br>

- ### `emptyThickness` 

###### Animated: :heavy_check_mark:

Is any number or percent value >=0. It defines the empty circle line thickness. If you define the value in percent, thickness will be calculated in relation to **[`size`](#size)**. Internaly is used the CSS property `stroke-width`.

<br>

- ### `color`

Defines the color of progress circle **line**. Is any CSS color like `#123` or `lime` or an object that defines the gradient.

- `color:` (String) '#3f79ff'

- `color:` (Object)
  - `radial:` default `false`. Defines whether the gradient is radial or linear
  - `colors:` (Array) contains the gradient colors as an object `{color: "#6546f7", offset: 0 [, opacity: 1] }`
    
###### Example: :scroll:

Now you are ready for a bad example.

```js
color: {
  {
    radial: false,
    colors;: [
      {
        color: '#6546f7',
        offset: '0',
        opacity: '1',
      },
      {
        color: 'lime',
        offset: '100',
        opacity: '0.6',
      },
    ]
  }
}
```
<img width="100" height="100" src="https://github.com/setaman/Bilder/blob/master/ellipse-gradient.png">

<br>

- ### `colorFill`

Defines the fill color of the progress circle. Takes the same value as **[`color`](#color)**

<br>

- ### `emptyColor`

Defines the color of the empty circle **line**. Takes the same value as **[`color`](#color)**

<br>

- ### `emptyColorFill`

Defines the fill color of the empty circle. Takes the same value as **[`color`](#color)**

<br>

- ### `legend`

Is a Boolean. It defines whether the **[`progress`](#progress)** or from you defined  **[`legendValue`](#legendvalue)** is displayd as the legend of the circle.

<br>

- ### `legendValue`

###### Animated: :heavy_check_mark:

Is any number. Use this property if you want to customize the shown progress as the legend of the circle. If defined, `legendValue` will replace **[`progress`](#progress)** as the circle legend!

###### Example: :scroll:

Let's say you need to display a rating from 0 to 5 of a product with 3.5 stars. Since **[`progress`](#progress)** can take values only from 0 to 100 your need an additionall property `legendValue`. Now you can set `legendValue = 3.5` and calculate the progress something like that:

```js
this.progress = 3.5 * 100 / 5; // the rating percentage
```
Now you can display custom progress value that still animated and circle progress fills properly!

>:heavy_exclamation_mark: note that `legendValue` excludes **[`progress`](#progress)** but not vice versa.

<br>

- ### `animation`

Descriptive string in form `"type [ duration delay ]"` that defines the initial animation of progress circle line filling. `type` is one from predefined animations and the optional `duration` and `delay` are number values. Note that the order is important and that you can only define the `delay` after `duration`. 

- `type`- is one of the predefined animations: `default | rs | reverse | bounce| loop`
- `duration` - number in milliseconds, default `1000`
- `delay` - number in milliseconds, default `400`

###### Example: :scroll:

```js
animation="rs 700 200"
```

<br>

- ### `loading`

Forces loading state. The component provides an indeterminate state for the case that your data is not available immediately. With this property set to `true` you can use the component as the indeterminate progress. 

<br>

- ### `determinate`

Provides a determinate loading state that indicates that your data loading is still in progress but allows to show the progress. 

<br>

- ### `noData`

Forces no data state. The component provides an no data state for the case that your data is not available. The circle progress is still empty.

>:heavy_exclamation_mark: The component will take the no data state even if you provide an invalid **[`progress`](#progress)** value 

<br>

- ### `angle`

Is any number. It defines the starting point of the progress circle line 

<br>

- ### `fontSize`

Is any valid CSS size value. It defines the font size of the circle legend. You will have to use **[`legendClass`](#legendClass)** if you want to apply more specific styles

<br>

- ### `fontColor`

Is any valid CSS color value. It defines the color of the circle legend. You will have to use **[`legendClass`](#legendClass)** if you want to apply more specific styles

<br>

- ### `legendClass`

Adds class to the circles legend to give you the possibility to style it

<br>

- ### `dash` 

###### Animated: :heavy_check_mark: 

Descriptive string in form `" [strict] count spacing"` that adds dashed empty progress line. This property provides the optional `strict` mode. In this mode you can define the explicit number of dashes as `count` wiht the given relative `spacing` as number in range >= 0 and < 1. Without `strict` the default behavior of the SVG `stroke-dasharray` property is used, where the size and spacings of the dashes are defined.

###### Example: :scroll:
`dash="strict 60 0.5"` - 60 dashes with 0.5 relative spacing
`dash="10 10"` - 10 pixel big dashes with 10 pixel spacing, the number of deshes depends on the empty circle circumference

<br>

- ### `half` 

Boolean value that specifies the type of the circle. If it is set to true, only the half of the circle will be drawn like a gague chart  

###### Example: :scroll:
<img width="350px" src="https://github.com/setaman/Bilder/blob/master/ep_half_example.png"/>

<br>

### Slot options

- #### `legend-value`

In this slot you can put an additional element that you want to display biside the progress

- #### `legend-caption`
in this slot you can put any HTML and style it on your own. This slot is aligned below the progress 

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

- ### `data`

You can specify 2 or more circles as objects in an array as `data`. For each circle you can use almost every available property. It is not necessary to specify all properties, thay will be merged with global props and the specified props will overwrite the global. The circles are rendered inside each other.

>:heavy_exclamation_mark: Тhe **[`lineMode`](#lineMode)** property will be ignored if `data` is specified. The legend of this circle is also not shown 

###### Example: :scroll:

```js
// this props are applied to all circles, if not overwritten
<vue-ellipse-progres color="blue" animation="loop 500" ... />

data: [
  { 
    progress: 50, // required for each circle
    color: "red"  // will overwrite global progress color
    ...           // other options will be merged with global
  },
  { 
    progress: 50, // required for each circle
    animation: "rs 1500 500"  // you can set almost any option that will be specific to this circle
  }
}
```

<img width="100" height="100" src="https://github.com/setaman/Bilder/blob/master/vue-ellipse-data.PNG">

<br>

- ### `gap`

Defines the gap in pixel between circles. It will be applied only if [`data`](#data) prop is used.

###### Example: :scroll:

```js
:gap="10"
```

<br>

## Compatibility
The plugin was tested in all major modern browsers. It should also work properly in older browsers. In old browsers issues can arise by animations since they are implemented using CSS custom properties. Basic SVG renders even in IE 11. 

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br> Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Opera | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/vivaldi/vivaldi_48x48.png" alt="Vivaldi" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Vivaldi | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Electron | <img src="https://camo.githubusercontent.com/06b2f979b4fbab8f1822cab69783700f0afa1f90/68747470733a2f2f6e7578746a732e6f72672f6d6574615f3430302e706e67" alt="Nuxt.js" width="24px" height="24px" /><br>Nuxt.js
| --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- |
| :white_check_mark:| :white_check_mark:| :white_check_mark: | :white_check_mark:| :white_check_mark:| :white_check_mark:| :white_check_mark: | :white_check_mark:

## Development
```
npm i
```

### Compiles and hot-reloads
```
npm run serve
```

## Build for publishing
```
npm run lint
npm run test:unit
npm run build
```
