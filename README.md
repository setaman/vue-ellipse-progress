# vue-ellipse-progress
[![npm](https://img.shields.io/npm/v/vue-ellipse-progress)](https://www.npmjs.com/package/vue-ellipse-progress)
[![Known Vulnerabilities](https://snyk.io/test/github/setaman/vue-ellipse-progress/badge.svg?targetFile=package.json)](https://snyk.io/test/github/setaman/vue-ellipse-progress?targetFile=package.json)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](#vue-ellipse-progress)
[![Build Status](https://travis-ci.org/setaman/vue-ellipse-progress.svg?branch=master)](https://travis-ci.org/setaman/vue-ellipse-progress)

[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/made-with-vue.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/check-it-out.svg)](https://forthebadge.com)

A dependency-free Vue.js plugin to create beautiful and animated circular progress bars, implemented with SVG. The purpose of this plugin is to combine the best properties of other available libraries and to add unique features, delivered in a simple to use component with friendly interface. 

With the available options you can create simple circles very quickly. But playing with the combinations of props and with a bit  of imagination you can create really exciting things.

- [Installation](#installation)
- [Usage](#usage)
- [Options](#options)
- [Compatibility](#compatibility)
- [Development](#development)
- [Contributing](https://github.com/setaman/vue-ellipse-progress/blob/master/CONTRIBUTING.md)

:grey_exclamation: Take a look at some interesting examples on the [Demo page](https://vue-ellipse-progress-demo.netlify.com) :grey_exclamation:

<div align="center" style="text-align: center;">
  <img src="https://github.com/setaman/Bilder/blob/master/vue-ellipse-demo.gif" alt="Component demo">  
</div>

## Installation 
Use your package manager or CDN to install and initialize the component.

### NPM
Install the library via npm:
```
npm i vue-ellipse-progress
```
The component is provided as a Vue.js plugin. So just initialize it in your ``main.js``:
```js
import VueEllipseProgress from 'vue-ellipse-progress';

Vue.use(VueEllipseProgress);

// Vue.use(VueEllipseProgress, "vep"); you can define a name and use the plugin like <vep/>
```

### CDN
Use this option where you have a global Vue.js instance available. You can customize and get the bundled and minified 
component from [JSDelivr](https://www.jsdelivr.com/package/npm/vue-ellipse-progress).
Just add the following line to your HTML and start using the component, nothing more is required:

```html
<script src="https://cdn.jsdelivr.net/npm/vue-ellipse-progress/dist/vue-ellipse-progress.umd.min.js"></script>
```

## Usage
After you have initialized the component, use it everywhere you want in your application:
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
  :legendFormatter="({currentValue}) => new Intl.NumberFormat('de-DE').format(currentValue)"
  legendClass="legend-custom-style"
  dash="60 0.9"
  animation="reverse 700 400"
  :noData="false"
  :loading="false"                      
  fontColor="white"
  :half="false"
  :gap="10"
  dot="10 blue"
  reverse
  fontSize="5rem">
  
  <span slot="legend-value">/200</span>
  <p slot="legend-caption">GOOD JOB</p>
  
</vue-ellipse-progress>
``` 
## Options
You are ready to go with just following line:
```html
<vue-ellipse-progress :progress="progress"/>
```
The **[`progress`](#progress)** is the only required property. However, in order to create unique circles that match your design needs, you can use all the properties explained below.

This table below provides a quick overview over all available options. To gain more information in general and concerning the creation of exclusive circles please read below the table.

> :grey_exclamation: Also make sure to check **[slot options](#slot-options)** 

| Prop     | Type   | Values  | Default |
|----------|--------|---------|---------|
| **[`progress`](#progress)** | Number | \[-100, 100] | 
| **[`size`](#size)** | Number | >=0 |  200       |     |     
| **[`line`](#line)** | String | "round \| square \| butt" |  "round"|   
| **[`thickness`](#thickness)** | Number \| String | \>=0 as Number or percent value as String|  "5%" |      
| **[`lineMode`](#linemode)** | String | "normal \| out \| out-over \| in \| in-over \| top \| bottom [offset]" | "normal 0" |   
| **[`emptyThickness`](#emptythickness)** | Number \| String | \>=0 as Number or percent value as String |  "5%" |     
| **[`color`](#color)** | String \| Object | any color as String or Object to specify gradient (see details) |  "#3f79ff" |   
| **[`colorFill`](#colorfill)** | String \| Object | same as `color` |  "transparent" |
| **[`emptyColor`](#emptycolor)** | String \| Object | same as `color` |  "#e6e9f0" |
| **[`emptyColorFill`](#emptycolorfill)** | String \| Object | same as `color` |  "transparent" |
| **[`legend`](#legend)** | Boolean | |  true |
| **[`legendValue`](#legendvalue)** | Number \| String | any number, accepts a `.` or `","` as decimals delimiter |   |
| **[`legendFormatter`](#legendformatter)** [![npm](https://img.shields.io/badge/v1.3.0-blue?style=flat-square)](#legendformatter) | Function | Function that returns formatted value  |   |
| **[`animation`](#animation)** | String | "default \| rs \| loop \| reverse \| bounce [duration delay]" | "default 1000 400"|
| **[`loading`](#loading)** | Boolean |  |false|
| **[`determinate`](#determinate)** | Boolean |  |false|
| **[`noData`](#nodata)** | Boolean |  |false|
| **[`angle`](#angle)** | Number | any Number |-90|
| **[`fontSize`](#fontsize)** | String | any valid CSS value | "1rem" |
| **[`fontColor`](#fontsize)** | String | any valid CSS value | "gray" |
| **[`legendClass`](#legendclass)** | String | any |  |
| **[`dash`](#dash)** | String | "[strict] count spacing" |  |
| **[`half`](#half)** | Boolean |  | false |
| **[`gap`](#gap)** | Number | any Number that defines the gap between multiple circles in pixel | 0 |
| **[`dot`](#dot)** | String \| Number \| Object | Accepts size, color and other styles as Number, descriptive string `"10% red"` or object `{size : 10, backgroundColor: "red", widht: "2px", borderRadius: "5px" ...}`  | 0 |
| **[`reverse`](#reverse)** [![npm](https://img.shields.io/badge/v1.2.0-blue?style=flat-square)](#reverse) | Boolean | | false |
| **[`data`](#data)** | Array | defines multiple circles, takes as values Objects with almost all props defined above | |


<br>


- ### `progress`

###### Animated: :heavy_check_mark: 

Is any Number in range \[-100, 100] (including **decimals**). This property defines the filled area from progress circle line in 
percent. `progress` is animated and counts up or down on any value changes with duration defined in 
**[`animation.duration`](#animation)** property. The progress is shown by default as the **legend** in the middle of the circle.

[![npm](https://img.shields.io/badge/v1.2.0-blue?style=flat-square)](#progress) Set a negative value to fill the progress
counterclockwise. Alternative you can use [`reverse`](#reverse).

###### Example: :scroll:

```js
<vue-ellipse-progress :progress="myProgress" />
...
this.myProgress = 55.5;
this.myProgress = this.tasksDone * 100 / maxTasks; // the percentage of done tasks
```

>:heavy_exclamation_mark: The `progress` is always used to fill the progress circle line. So you cannot customize this 
>value, it should be always in the range [-100, 100] and not valid Numbers lead to **[`noData`](#noData)** state. 
>For customization purpose please use **[`legendValue`](#legendvalue)** and take a look at **[`legendFormatter`](#legendformatter)**. 

>If **[`legendValue`](#legendvalue)** is defined the progress will **NOT** be displayed as circle legend.

<br>

- ### `size` 

###### Animated: :heavy_check_mark: 

Is any number from >=0. It defines the width and height of the circle. The calculation of the circumference of the circle depends on the properties **[`lineMode`](#linemode)**, **[`thickness`](#thickness)**, **[`emptyThickness`](#emptythickness)** and **[`dot`](#dot)**, so the circle never exceeds the `size` value! 

>:heavy_exclamation_mark: Check **[`lineMode`](#linemode)** property to understand how the progress circle behaves depending on the line mode and offset.

<br>

- ### `line` 

###### Animated: :heavy_check_mark:

Is a string value from `round | square | butt`. Defines the progress circle line cap. Internally is used the CSS property `stroke-linecap`.

###### Example: :scroll:

`line="round"`

<br>

- ### `thickness` 

###### Animated: :heavy_check_mark:

Is any number or percent value >=0. It defines the progress circle line thickness. If you define the value in percent, the thickness will be calculated in relation to **[`size`](#size)**. Internally is used the CSS property `stroke-width`.

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

- `offset`: is any negative or positive number and defines the distance between the progress and empty lines. It can be **only** combined with the `in` and `out` modes

###### Example: :scroll:

Let's take a look at few examples

| `line-mode="in 10"`  | `line-mode="in 10"`   | `line-mode="out 10"`  | `line-mode="out 15"` |
|----------|--------|---------|---------|
| <img width="100" height="100" src="https://github.com/setaman/Bilder/blob/master/ellipse-exmp1.png">|<img width="100" height="100" src="https://github.com/setaman/Bilder/blob/master/ellipse-exmp2.png">|<img width="100" height="100" src="https://github.com/setaman/Bilder/blob/master/ellipse-exmp3.png">|<img width="100" height="100" src="https://github.com/setaman/Bilder/blob/master/ellipse-exmp4.png"> |

As you can see the second and fourth examples are similar to the modes `bottom` and `top`. Only with the modes `in` and `out` and the `offset` you can achieve the same result. But the provided modes like a presets take care about annoying calculations and do the job for you.

<br>

- ### `emptyThickness` 

###### Animated: :heavy_check_mark:

Is any number or percent value >=0. It defines the empty circle line thickness. If you define the value in percent, thickness will be calculated in relation to **[`size`](#size)**. Internally is used the CSS property `stroke-width`.

<br>

- ### `color`

###### Animated: :heavy_check_mark:

Defines the color of progress circle **line**. Is any CSS color like `#123` or `lime` or an object that defines the gradient.

- `color="#3f79ff"` - as String

- `:color="{ colors [, radial ]}"` - as Object
  - `radial` - default `false`. Defines whether the gradient is radial or linear
  - `colors` - Array that contains the gradient colors as objects `{ color: "#6546f7", offset: "10%" [, opacity: 1] }`
    
###### Example: :scroll:

Now you are ready for an example:

```
:color="gradient"
gradient: {
    radial: false,
    colors: [
      {
        color: '#6546f7',
        offset: "0",
        opacity: '1',
      },
      {
        color: 'lime',
        offset: "100",
        opacity: '0.6',
      },
    ]
  }
```
<img width="100" height="100" src="https://github.com/setaman/Bilder/blob/master/ellipse-gradient.png" alt="gradient demo">

<br>

- ### `colorFill`

###### Animated: :heavy_check_mark:

Defines the fill color of the progress circle. Takes the same value as **[`color`](#color)**

<br>

- ### `emptyColor`

###### Animated: :heavy_check_mark:

Defines the color of the empty circle **line**. Takes the same value as **[`color`](#color)**

<br>

- ### `emptyColorFill`

###### Animated: :heavy_check_mark:

Defines the fill color of the empty circle. Takes the same value as **[`color`](#color)**

<br>

- ### `legend`

Is a Boolean. It defines whether the **[`progress`](#progress)** or from you defined  **[`legendValue`](#legendvalue)** is displayed as the legend of the circle.

<br>

- ### `legendValue`

###### Animated: :heavy_check_mark:

Is any Number or String. Use this property if you want to show progress value as the legend of the circle that is not in
the range [-100, 100]. If defined, `legendValue` will replace [`progress`](#progress) as the circle legend!
You can set any precision of the decimal numbers. If the prop is defined as a string, you can specify the `","` 
as decimals delimiter (e.g "123,123" for german numbers), apart from this the value must generally be a valid JavaScript Number.
For more customization possibilities please use [`legendFormatter`](#legendformatter) or [`scoped slot`](#default). 

###### Example: :scroll:

Let's say you need to display a rating from 0 to 5 of a product with 3.5 stars. Setting the [`progress`](#progress) to 3.5 will 
fill the circle to 3.5 percent, and this is not what we need, since we want to display the percentage of 5 as progress. 
At this point we need an additional property `legendValue`. We can show the product rating like in the following example:

```js
<vue-ellipse-progress :progress="progress" :legend-value="rating" />
...
this.rating = 3.5;
this.progress = this.rating * 100 / 5; // the rating percentage
```
Now you can display custom progress value that still animated and circle progress fills properly!

```vue
<vue-ellipse-progress legend-value="345,12345" /> // set "," as delimiter defining the value as string
```

>:heavy_exclamation_mark: note that `legendValue` replaces **[`progress`](#progress)** as circle legend but not vice versa.


<br>

- ### `legendFormatter` 

[![npm](https://img.shields.io/badge/v1.3.0-blue?style=flat-square)](#legendformatter)

Is a Function that must return your custom formatted value. The function takes counter properties object as argument and 
is called on every tick of the counter. Here the formatting of [legendValue](#legendvalue) or [progress](#progress) 
is completely up to you and you have full freedom to adjust the presentation to your needs. The function can return any 
value, even HTML.   

>:grey_exclamation: alternatively you can use **[`scoped slot`](#default)** for custom formatting.

###### Example: :scroll:

Let's see how it works. The function takes counter properties object as argument that you can use to define custom formatting.
`currentValue` is the most relevant value, as it is the actual value at specific counter tick. The return value will be 
displayed as the legend of the circle.

```js
const myFormatter = ({ currentValue, currentRawValue, duration, previousCountStepValue, start, end, difference, oneStepDifference, startTime, elapsed }) => {
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(currentValue); 
}
```
You can also return HTML:
```js
const myFormatter = ({ currentValue }) => {
     return `
        <span style="font-weight: bold; font-size: 1.6rem">${new Intl.NumberFormat("de-DE").format(currentValue)}</span>
        <span>€</span>
      `;
    }
```

Finally, set your formatter as prop:

```vue
<vue-ellipse-progress :legend-formatter="myFormatter"/>
<!-- shorter version if you wish-->
<vue-ellipse-progress :legend-formatter="({ currentValue }) => `My Format ${currentValue}`"/>
````

<br>

- ### `animation`

Descriptive string in form `"type [duration delay]"` that defines the initial animation of progress circle line filling. `type` is one from predefined animations and the optional `duration` and `delay` are number values. Note that the order is important and that you can only define the `delay` after `duration`. 

- `type` - is one of the predefined animations: `default | rs | reverse | bounce| loop`
- `duration` - number in milliseconds, default `1000`
- `delay` - number in milliseconds, default `400`

###### Example: :scroll:

```js
animation="rs 700 200"
animation="bounce 1000"
```

<br>

- ### `loading`

Forces loading state. The component provides an indeterminate loading state for the case that your data is not available immediately. With this property set to `true` you can use the component as the indeterminate progress. 

<br>

- ### `determinate`

Provides a determinate loading state that indicates that your data loading is still in progress but allows to show the **[`progress`](#progress)**. 

<br>

- ### `noData`

###### Animated: :heavy_check_mark:

Forces no data state. The component provides a no data state for the case that your data is not available. The circle progress is still empty.

>:heavy_exclamation_mark: The component will take the no data state even if you provide an invalid **[`progress`](#progress)** value 

<br>

- ### `angle`

###### Animated: :heavy_check_mark:

Is any number. It defines the starting point of the progress circle line. 

<br>

- ### `fontSize`

###### Animated: :heavy_check_mark:

Is any valid CSS size value. It defines the font size of the circle legend. You will have to use **[`legendClass`](#legendClass)** if you want to apply more specific styles.

<br>

- ### `fontColor`

###### Animated: :heavy_check_mark:

Is any valid CSS color value. It defines the color of the circle legend. You will have to use **[`legendClass`](#legendClass)** if you want to apply more specific styles.

<br>

- ### `legendClass`

Adds class to the circles legend to give you the possibility to style it.

<br>

- ### `dash` 

###### Animated: :heavy_check_mark: 

Descriptive string in form `"[strict] count spacing"` that adds dashed empty progress line. This property provides the optional `strict` mode. In this mode you can define the explicit number of dashes as `count` with the given relative `spacing` as number in range >= 0 and < 1. Without `strict` the default behavior of the SVG `stroke-dasharray` property is used, where the size and spacings of the dashes are defined.

###### Example: :scroll:
`dash="strict 60 0.5"` - 60 dashes with 0.5 relative spacing

`dash="10 10"` - 10 pixels big dashes with 10 pixels spacing, the number of dashes depends on the empty circle circumference

<br>

- ### `half` 

Boolean value that specifies the type of the circle. If it is set to true, only the half of the circle will be drawn like a gauge chart. 

###### Example: :scroll:
<img width="350px" src="https://github.com/setaman/Bilder/blob/master/ep_half_example.png" alt="half circle example"/>

<br>

- ### `gap`

###### Animated: :heavy_check_mark:

Defines the gap in pixels from one circle to the previous circle. It will be applied only if [`data`](#data) prop is used.

###### Example: :scroll:

```vue
<vue-ellipse-progress :gap="10"/>
```

<br>

- ### `dot`

###### Animated: :heavy_check_mark:

The dot property lets you define a point indicator at the end of the progress line. You have a lot of freedom to customize the dot using a Number, descriptive String, or an Object to inject any CSS styles.   

**Number**: `:dot="10"` - specifies a round dot with 10px width and height and default `#713dfd` color

**Descriptive string**: `dot="size [color]"` - `size` can be just a Number or a percent value like `5%`, the calculation for percent values is similar to **[`thickness`](#thickness)** and depends on the **[`size`](#size)**. `color` is optional and lets you quickly define the color of the dot. The order of properties is important for parsing the String and you can set the `color` only if the `size` is defined.

**Object**: `:dot="{ size: Number | String [, any CSS inline style with Vue syntax] }"` - to customize the point, you can define the prop as an Object. `size` is required and can be just a Number or a String to define a percent value. Only defining the prop as an Object you have the possibility to add any styles to the dot you want to, using Vue syntax for defining inline styles, you can even completely break the positioning of the dot, if you need. You cannot override the `height` of the dot since it is important for internal calculation and must be controllable. 

###### Example: :scroll:
The examples will provide more clarity
```javascript
:dot="10" // just a Number defining size in pixel
dot="10" // the same as above
dot="10%" // 10% from the circle size will be converted to pixel
dot="5% red" // adds red dot
// defines same dot as above
:dot={
  size: "5%", // required
  backgroundColor: "red", // add any inline CSS using Vue syntax
  left: "10px", // you can even move the dot, but it is not recommended
}
```

<img width="100px" src="https://github.com/setaman/Bilder/blob/master/Anmerkung%202020-05-19%20220917.png" alt="dot example"/>

<br>

- ### `reverse`

[![npm](https://img.shields.io/badge/v1.2.0-blue?style=flat-square)](#reverse) 

Is a Boolean. `reverse` prop flips the circle, and the progress circle fills counterclockwise. Alternative you can just set 
a negative value for [`progress`](#progress).

###### Example: :scroll:

```vue
<vue-ellipse-progress reverse />
```

<br>

- ### `data`

You can specify 2 or more circles as objects in an array as `data`. For each circle you can use almost every available property. It is not necessary to specify all properties, they will be merged with global props and the specified props will overwrite the global. The circles are rendered inside each other.

>:heavy_exclamation_mark: Excluded props: **[`lineMode`](#lineMode)**, **[`emptyThickness`](#emptyThickness)**, **[`legend`](#legend)**. These properties will be ignored, if `data` is specified. The legend of this circle is also not shown. 

###### Example: :scroll:

```js
<!-- this props are applied to all circles, if not overwritten in "data"-->
<vue-ellipse-progress color="blue" animation="loop 500" ...  :data="data"/>

data: [
  { 
    progress: 50, // required for each circle
    color: "red",  // will overwrite global progress color
    ...           // other options will be merged with global
  },
  { 
    progress: 50, // required for each circle
    animation: "rs 1500 500"  // you can set almost any option that will be specific to this circle
  }
}
```

<img width="100" height="100" src="https://github.com/setaman/Bilder/blob/master/vue-ellipse-data.PNG" alt="multiple circles demo">

<br>

### Slot options

- #### `default`

Use this slot, if you want to customize the presentation of the circle legend and make a use of the animated counter, 
so your formatting still animated. This works similar to the [`legendFormatter`](#legendformatter) and is just 
an alternative way to provide a custom format. You can access animated counter properties through the scoped slot 
props and adjust the presentation of the legend to your needs. 

```vue
<vue-ellipse-progress :progress="50">
  <template v-slot:default="{ counterTick }">
    <span style="font-weight: bold; font-size: 1.6rem; color: green;">
      {{ myFormatter(counterTick.currentValue) }}
    </span>
  </template>
</vue-ellipse-progress>
```

- #### `legend-value`

In this slot you can put an additional element that you want to display beside the progress

- #### `legend-caption`
In this slot you can put any HTML and style it on your own. This slot is aligned below the progress. 

###### Example: :scroll:

This code ...
```html
<vue-ellipse-progress ....>
  
<template v-slot:legend-value>
  <span slot="legend-value">/200</span>
</template>
<template v-slot:legend-caption>
  <p slot="legend-caption">TASKS DONE</p>
</template>
  
</vue-ellipse-progress>
```
... produces following result. The slots are marked corresponding:

<img width="100" height="100" src="https://github.com/setaman/Bilder/blob/master/ellipse-slots.png" alt="slot example">

<br>

## Compatibility
The plugin was tested in all major modern mobile and desktop browsers. It should also work properly in older browsers. In old browsers issues can arise by animations since they are implemented using CSS custom properties. Basic SVG renders even in IE 11. 

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br> Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Opera | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/vivaldi/vivaldi_48x48.png" alt="Vivaldi" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Vivaldi | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Electron | <img src="https://camo.githubusercontent.com/06b2f979b4fbab8f1822cab69783700f0afa1f90/68747470733a2f2f6e7578746a732e6f72672f6d6574615f3430302e706e67" alt="Nuxt.js" width="24px" height="24px" /><br>Nuxt.js
| --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- |
| :white_check_mark:| :white_check_mark:| :white_check_mark: | :white_check_mark:| :white_check_mark:| :white_check_mark:| :white_check_mark: | :white_check_mark:

## Development

The development always happens in `dev` branch. You'll find all the latest updates there. 
`dev` will only be merged into the master when all unit tests have been passed, builds are successful, 
documentation is updated and functionality is verified on the [demo](https://vue-ellipse-progress-demo.netlify.app/#/test) page. 
Before that all changes remain in beta.

#### Run for local development
The project was initialized with Vue CLI. Execute the following commands to start development locally:
```
npm i
npm run serve
```
