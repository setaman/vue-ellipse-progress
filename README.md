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
  <img src="https://drive.google.com/uc?export=view&id=1-shUZ3AbE4CBwFeGEZry2gsRI5viHD0j">  
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

This table provide a quick overview over all available options. For more information and how to create exclusive circles 
using this properties please read below the table.

> :grey_exclamation: Also make sure to check **[slot options](#slot-options)** 

| Prop     | Type   | Values  | Default |
|----------|--------|---------|---------|
| **[`progress`](#progress)** | Number | 0 - 100 | 
| **[`size`](#size)** | Number | >=0 |  200       |     |     
| **[`line`](#line)** | String | "round \| square \| butt" |  "round"|   
| **[`thickness`](#thickness)** | Number \| String | \>=0 as Number or percent value as String|  "5%" |      
| **[`lineMode`](#linemode)** | String | "normal \| out \| out-over \| in \| in-over \| top \| [ offset ]" | "normal 0" |   
| **[`emptyThickness`](#emptythickness)** | Number \| String | \>=0 as Number or percent value as String |  5% |     
| **[`color`](#color)** | String \| Object | any color as string or object to specify gradient (see details) |  #3f79ff |   
| **[`colorFill`](#colorfill)** | String \| Object | same as `color` |  transparent |
| **[`emptyColor`](#emptycolor)** | String \| Object | same as `color` |  #e6e9f0 |
| **[`emptyColorFill`](#emptycolorfill)** | String \| Object | same as `color` |  transparent |
| **[`legend`](#legend)** | Boolean | your know it |  true |
| **[`legendValue`](#legendvalue)** | Number | any |   |
| **[`animation`](#animation)** | String | "default \| rs \| loop \| reverse \| bounce [duration delay]" | "default 1000 400"|
| **[`loading`](#loading)** | Boolean |  |false|
| **[`determinate`](#determinate)** | Boolean |  |false|
| **[`noData`](#nodata)** | Boolean |  |false|
| **[`angle`](#angle)** | Number | any number |-90|
| **[`fontSize`](#fontsize)** | String | any valid css value | 1rem |
| **[`fontColor`](#fontsize)** | String | any valid css value | gray |
| **[`legendClass`](#legendclass)** | String | any |  |
| **[`dash`](#dash)** | String | "count spacing" |  |
| **[`half`](#half)** | Boolean |  | false |
| **[`gap`](#gap)** | Number | Defines the gap between multiple circles | 0 |
| **[`data`](#data)** | Array | Defines multiple circles, takes as values objects with all props defined above | |


<br>


- ### `progress`

###### Animated: :heavy_check_mark: 

is any Number from 0 to 100 (including **decimals**). This property defines the filled area from progress circle line in 
percent. `progress` is animated and count up or down on any value changes with duration defined in 
**[`animation:duration`](#animation)** property. How the progress is calculated is up to you. The progress is shown by default as the **legend** in the middle of the circle.

###### Example: :scroll:

```js
this.progress = 55.5;
this.progress = this.tasksDone * 100 / maxTasks; // the percentage of done tasks
```

>:heavy_exclamation_mark: the `progress` is always used to fill the progress circle line. So you can not customize this value and all values under 0 and above 100 are ignored. For customization purpose please use **[`legendValue`](#legendvalue)**. 
>if **[`legendValue`](#legendvalue)** is defined the progress is **NOT** displayed as circle legend.

<br>

- ### `size` 

###### Animated: :heavy_check_mark: 

is any Number from >=0. Defines the width and height of the circle. The circumference of the circle is calculated depending on the properties **[`lineMode`](#linemode)**, **[`thickness`](#thickness)** and **[`emptyThickness`](#emptythickness)** so the progress circle never exceeds the `size` value! 

>:heavy_exclamation_mark: check **[`lineMode`](#linemode)** property to understand how the progress circle behaves depending on the line mode and offset.

<br>

- ### `line` 

is a string value from `round | square | butt`. Defines the progress circle line cap. Internaly is used the css property `stroke-linecap`.

<br>

- ### `thickness` 

###### Animated: :heavy_check_mark:

is any Number or percent value >=0. Defines the progress circle line thickness. If you define the value in percent the thickness will be calculated in relation to **[`size`](#size)**. Internaly is used the css property `stroke-width`.

<br>

- ### `lineMode` 

###### Animated: :heavy_check_mark: 

Descriptive string in form `"mode [offset]"` that defines how the progress line is aligned in relation to empty line. The first value ist the `mode` and the optional second is the `offset`. You can undestand the modes as the preset that helps you to easy align lines as you need. 

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

| `'in 10'`  | `'in 10'`   | `'out 10'`  | `'out 15'` |
|----------|--------|---------|---------|
| <img width="100" height="100" src="https://github.com/setaman/Bilder/blob/master/ellipse-exmp1.png">|<img width="100" height="100" src="https://github.com/setaman/Bilder/blob/master/ellipse-exmp2.png">|<img width="100" height="100" src="https://github.com/setaman/Bilder/blob/master/ellipse-exmp3.png">|<img width="100" height="100" src="https://github.com/setaman/Bilder/blob/master/ellipse-exmp4.png"> |

As you can see the second and fourth examples are similar to the modes `bottom` and `top`. Only with the modes `in` and `out` and the `offset` you can achive the same result. But the povided modes like a presets take care about annoying calculations and do the job for you.

<br>

- ### `emptyThickness` 

###### Animated: :heavy_check_mark:

is any Number or percent value >=0. Defines the empty circle line thickness. If you define the value in percent thickness will be calculated in relation to **[`size`](#size)**. Internaly is used the css property `stroke-width`.

<br>

- ### `color`

Defines the color of progress circle **line**. Is any css color like `#123` or `lime` or an object that defines the gradient.

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
        opacity: '1',
      },
    ]
  }
}
```
<img width="100" height="100" src="https://github.com/setaman/Bilder/blob/master/ellipse-gradient.png">

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

descriptive string in form `"type [ duration delay ]"` that defines the initial animation of progress circle line filling. `type` is one from predefined animations and the optional `duration` and `delay` are number values. Note that the order is important and you can only define the `delay` with `duration`. 

- `type`- is one of `default | rs | reverse | bounce| loop`
- `duration` - number in milliseconds, default `1000`
- `delay` - number in milliseconds, default `400`

###### Example: :scroll:

```js
animation="rs 700 200"
```

<br>

- ### `loading`

forces loading state. The component provide an indeterminate state for the case that you data is not available immediately. With this property set to `true` you can use the component as the indeterminate progress. 

<br>

- ### `determinate`

provides a determinate loading state that indicates that you data loading is still in progress but allows to show the progress. 

<br>

- ### `noData`

forces no data state. The component provides an no data state for the case that you data is not available. The circle progress still empty.

>:heavy_exclamation_mark: the component takes the no data state also if you provide an invalid **[`progress`](#progress)** value 

<br>

- ### `angle`

is any Number. Defines the starting point of the progress circle line 

<br>

- ### `fontSize`

is any valid css size property. Defines the font size of the circle legend. Use **[`legendClass`](#legendClass)** if you want apply more specific styles

<br>

- ### `fontColor`

is any valid css color. Defines the color of the circle legend. Use **[`legendClass`](#legendClass)** if you want apply more specific styles

<br>

- ### `legendClass`

adds class to the circles legend to give you the possibility to style it

<br>

- ### `dash` 

###### Animated: :heavy_check_mark: 

descriptive string in form `"count spacing"` that add dashed empty progress line. `count` is the explicit number of dashes with given as number in range >= 0 and < 1 `spacing`. 

###### Example: :scroll:
`dash="60 0.99"` - 60 dashes with 0.99 spacing

<br>

- ### `half` 

boolean value that specifies the type of the circle. If set to true only the half of the circle is drawn like a gague chart  

###### Example: :scroll:
<img width="350px" src="https://github.com/setaman/Bilder/blob/master/ep_half_example.png"/>

<br>

### Slot options

- #### `legend-value`

in this slot you can put an additionall element that you want to display biside the progress

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

- ### `data`

You can specify 2 or more circles as objects in an array as `data`. For each circle you can use almost all other available properties. It is not required to specify all properties, thay will be merged with global props and the specified props will overwrite the global. The circles are renderd inside each other.

>:heavy_exclamation_mark: the **[`lineMode`](#lineMode)** property is ignored if `data` is specified. Also the legend of this circle is not shown 

###### Example: :scroll:

```js
data: [
  { 
    progress: 50, // required for each circle
    color: "red"  // will overwrite global progress color
    ...           // other options will be merged with global
  },
  { 
    progress: 50, // required for each circle
    animation: "loop 1500 500"  // you can set almost any option that will be specific to this circle
  }
}
```

<img width="100" height="100" src="https://github.com/setaman/Bilder/blob/master/vue-ellipse-data.PNG">

<br>

- ### `gap`

defines the gap in pixel between circles. Applied only if [`data`](#data) prop is used.

###### Example: :scroll:

```js
:gap="10"
```

<br>

## Compatibility
The plugin was tested in all major modern browsers. Should also work properly in older browsers. In old browsers issues can be caused by animations since they are implemented using css custom properties. Basic svg renders even in IE 11. 

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br> Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Opera | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/vivaldi/vivaldi_48x48.png" alt="Vivaldi" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Vivaldi | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Electron | <img src="https://camo.githubusercontent.com/06b2f979b4fbab8f1822cab69783700f0afa1f90/68747470733a2f2f6e7578746a732e6f72672f6d6574615f3430302e706e67" alt="Nuxt.js" width="24px" height="24px" /><br>Nuxt.js
| --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- |
| :white_check_mark:| :white_check_mark:| :white_check_mark: | :white_check_mark:| :white_check_mark:| :white_check_mark:| :white_check_mark: | :white_check_mark:

## Development
```
npm install
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
