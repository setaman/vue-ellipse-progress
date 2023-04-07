# vue-ellipse-progress
[![npm (tag)](https://img.shields.io/npm/v/vue-ellipse-progress/next?color=success&label=NPM&style=for-the-badge)](https://www.npmjs.com/package/vue-ellipse-progress)
[![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/setaman/vue-ellipse-progress?style=for-the-badge)](https://snyk.io/test/npm/vue-ellipse-progress/1.3.0)
![GitHub](https://img.shields.io/github/license/setaman/vue-ellipse-progress?style=for-the-badge)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/setaman/vue-ellipse-progress/build?style=for-the-badge)](https://github.com/setaman/vue-ellipse-progress/actions/workflows/build.yml)

A dependency-free simple, flexible and smooth Vue.js plugin to create beautiful circle progress bars, implemented with SVG.
Start creating circles in three steps:
```js
// install
npm i vue-ellipse-progress@next
// initialize
import veProgress from "vue-ellipse-progress";
createApp(App).use(veProgress);
// use
<ve-progress :progress="50"/>
```
- [Installation options](#installation-options)
- [Usage](#usage)
- [Options](#options)
- [Compatibility](#compatibility)
- [Development](#development)
- [Contributing](https://github.com/setaman/vue-ellipse-progress/blob/master/CONTRIBUTING.md)

❕ Take a look at some interesting examples on the [Demo page](https://vue-ellipse-progress-demo.netlify.com) ❕

<div align="center" style="text-align: center;">
  <img src="https://github.com/setaman/Bilder/blob/master/vue-ellipse-demo.gif" alt="Component demo">  
</div>

## Installation options
Use your package manager or CDN to install and initialize the component.

### NPM
Installation via npm:
```
npm i vue-ellipse-progress@next
```
After the installation you have the choice to initialize the component as a plugin or to import it directly.

#### Initialize as Plugin 

Import and initialize the component in your `main.js`. After initialization, the component is available as `<ve-progress/>`.
You can also define a custom name:

```js
import { createApp } from "vue";
import veProgress from "vue-ellipse-progress";
createApp(App).use(veProgress);
// createApp(App).use(veProgress, "vep"); define custom name
```

#### Import component
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

## Usage
After you have initialized the component, you are ready to create your circles:
```html
<ve-progress 
  :progress="progress"
  :data="circles"
  :angle="-90"
  color="blue"
  :color-fill="colorFillGradient"
  empty-color="#8ec5fc"
  :empty-color-fill="emptyColorFillGradient"                      
  :size="300"
  :thickness="10"
  empty-thickness="10%"
  line-mode="in 10"
  line-position="out 10"
  empty-line-position="in"
  :hide-legend="false"
  :legend="180"
  :legend-formatter="({currentValue}) => new Intl.NumberFormat('de-DE').format(currentValue)"
  legend-class="legend-custom-style"
  dash="60 0.9"
  animation="reverse 700 400"
  :noData="false"
  :loading="false"  
  :loader="{ color: 'green' }"                    
  font-color="white"
  :half="false"
  :gap="10"
  dot="10 blue"
  reverse
  font-size="5rem">
  
  <template #legend>
    <span>/200</span>
  </template>
  <template #legend-caption>
    <p>TASKS DONE</p>
  </template>
  
</ve-progress>
``` 
## Options
The **[`progress`](#progress)** is the only required property, and you are ready to go with just following line:
```html
<ve-progress :progress="progress"/>
```
> Also make sure to check **[slot options](#slot-options)** 

| Prop     | Type   | Values  | Default |
|----------|--------|---------|---------|
| **[`progress`](#progress)** | Number | \[-100, 100] | 
| **[`size`](#size)** | Number | >=0 |  200       |     |     
| **[`line`](#line)** | String | "round \| square \| butt" |  "round"|   
| **[`thickness`](#thickness)** | Number \| String | \>=0 as Number or percent value as String|  "5%" |      
| **[`lineMode`](#linemode)** | String | "center \| out \| out-over \| in \| in-over \| top \| bottom [offset]" | "center" |   
| **[`linePosition`](#lineposition)** | String | "center \| out \| in [offset]" | "center" |   
| **[`emptyLinePosition`](#emptylineposition)** | String | "center \| out \| in [offset]" | "center" |   
| **[`emptyThickness`](#emptythickness)** | Number \| String | \>=0 as Number or percent value as String |  "5%" |     
| **[`color`](#color)** | String \| Object | any color as String or Object to specify gradient (see details) |  "#3f79ff" |   
| **[`colorFill`](#colorfill)** | String \| Object | same as `color` |  "transparent" |
| **[`emptyColor`](#emptycolor)** | String \| Object | same as `color` |  "#e6e9f0" |
| **[`emptyColorFill`](#emptycolorfill)** | String \| Object | same as `color` |  "transparent" |
| **[`hideLegend`](#hideLegend)** | Boolean | |  true |
| **[`legend`](#legend)** | Number \| String | any number, accepts a `.` or `","` as decimals delimiter and simple formatting |   |
| **[`legendFormatter`](#legendformatter)** | Function | Function that returns formatted value  |   |
| **[`animation`](#animation)** | String | "default \| rs \| loop \| reverse \| bounce [duration delay]" | "default 1000 400"|
| **[`loading`](#loading)** | Boolean |  |false|
| **[`loader`](#loader)** | Object | { [thickness, color, lineMode, line, opacity ]} |  |
| **[`determinate`](#determinate)** | Boolean |  |false|
| **[`noData`](#nodata)** | Boolean |  |false|
| **[`angle`](#angle)** | Number | any Number |-90|
| **[`fontSize`](#fontsize)** | String | any valid CSS value | "1rem" |
| **[`fontColor`](#fontsize)** | String | any valid CSS value | "gray" |
| **[`legendClass`](#legendclass)** | String | any |  |
| **[`dash`](#dash)** | String | "[strict] count spacing" |  |
| **[`half`](#half)** | Boolean |  | false |
| **[`gap`](#gap)** | Number | any Number that defines the gap between multiple circles in pixel | 0 |
| **[`dot`](#dot)** | String \| Number \| Object | Accepts size, color and other styles as Number, descriptive string `"size [color]"` or object `{size [, backgroundColor, widht, borderRadius ...]}`  | 0 |
| **[`reverse`](#reverse)** | Boolean | | false |
| **[`data`](#data)** | Array | defines multiple circles, takes as values Objects with almost all props defined above | |


<br>


- ### `progress`

###### Animated: ✔️ 

Is any Number in range \[-100, 100] (including **decimals**). This property defines the filled area from progress circle line in 
percent and is shown by default as the **legend** in the middle of the circle. `progress` is animated and counts up or down on any value changes with duration defined in 
**[`animation.duration`](#animation)** property. Set a negative value to fill the progress line counterclockwise. Alternatively [`reverse`](#reverse) can be used.

###### Example: 📜

```js
<ve-progress :progress="myProgress" />
...
this.myProgress = 55.5;
this.myProgress = this.tasksDone * 100 / maxTasks; // the percentage of done tasks
```

>❗ The `progress` is always used to fill the progress circle line, it should be always in the range [-100, 100] and not valid Numbers lead to **[`noData`](#noData)** state. 
>For customization purpose please use **[`legend`](#legend)** and take a look at **[`legendFormatter`](#legendformatter)**. 

>❗ If **[`legend`](#legend)** is defined the `progress` will **not** be displayed as circle legend.

<br>

- ### `size` 

###### Animated: ✔️ 

Is any number >=0. It defines the width and height of the circle in pixel. The calculation of the circumference of the 
circle depends on the properties **[`lineMode`](#linemode)**, **[`thickness`](#thickness)**, 
**[`emptyThickness`](#emptythickness)** and **[`dot`](#dot)**, so the circle never exceeds the `size` value! 

>❗ Check **[`lineMode`](#linemode)** property to understand how the progress circle behaves depending on the line mode and offset.

<br>

- ### `line` 

###### Animated: ✔️

Is a String value from `round | square | butt`. Defines the progress circle line cap. Internally the CSS property `stroke-linecap` is used.

###### Example: 📜

```vue
<ve-progress line="round" />
```

<br>

- ### `thickness` 

###### Animated: ✔️

Is a Number >=0 or a String that defines the progress line thickness. If you set the value in percent as String, the thickness will be calculated in relation to **[`size`](#size)**.

###### Example: 📜

```vue
<ve-progress :thickness="10" />
<ve-progress thickness="5%" />
```

<br>

- ### `emptyThickness`

###### Animated: ✔️

Is a Number >=0 or a String. It defines the empty circle line thickness. If you set the value in percent, thickness will be calculated in relation to **[`size`](#size)**.

<br>

- ### `lineMode` 

###### Animated: ✔️ 

Descriptive string in form `"mode [offset]"` that defines, how the progress line is aligned in relation to empty line. 
The first value ist the `mode` and the optional second is the `offset`. You can understand the modes as the presets that
help you to align lines as you want to. 

- `mode`:
  - `center`: this is the default value and both lines are aligned at the baseline (centered).
  <img width="100" height="50" src="https://github.com/setaman/Bilder/blob/master/ellipse-normal.png">
  
  - `in`: the progress line is inside the empty line
  <img width="100" height="40" src="https://github.com/setaman/Bilder/blob/master/ellipse-in.png">
  
   - `in-over`: the progress line is both inside the empty circle and overlaps the empty line 
  <img width="100" height="35" src="https://github.com/setaman/Bilder/blob/master/ellipse-in.over.png">
  
  - `out`: the progress line is outside the empty line
  <img width="100" height="35" src="https://github.com/setaman/Bilder/blob/master/ellipse-out.png">
  
  - `out-over`: the progress line is both outside the empty circle and overlaps the empty line
  <img width="100" height="35" src="https://github.com/setaman/Bilder/blob/master/ellipse-out-over.png">
  
  - `bottom`: the progress line is aligned at the bottom of the empty line
  <img width="100" height="35" src="https://github.com/setaman/Bilder/blob/master/ellipse-bottom.png">
  
  - `top`: the progress line is aligned at the top of the empty line
  <img width="100" height="35" src="https://github.com/setaman/Bilder/blob/master/ellipse-top.png">

- `offset`: is any negative or positive Number and defines the distance between the progress and empty lines. It can be **only** combined with the `in` and `out` modes

###### Example: 📜

Let's take a look at few examples:

| `line-mode="in 10"`  | `line-mode="in 10"`   | `line-mode="out 10"`  | `line-mode="out 15"` |
|----------|--------|---------|---------|
| <img width="100" height="100" src="https://github.com/setaman/Bilder/blob/master/ellipse-exmp1.png">|<img width="100" height="100" src="https://github.com/setaman/Bilder/blob/master/ellipse-exmp2.png">|<img width="100" height="100" src="https://github.com/setaman/Bilder/blob/master/ellipse-exmp3.png">|<img width="100" height="100" src="https://github.com/setaman/Bilder/blob/master/ellipse-exmp4.png"> |

In general, any positioning can already be achieved with values `in` and `out` in a combination with certain `offset`. The modes, however, act like presets, which reduce the effort for the manual calculations. 

<br>


- ### `linePosition`

###### Animated: ✔️

Descriptive string in form `"mode [offset]"` that defines how the progress line is aligned in relation to the circle fill area. 
Available modes are  `center`, `in` and `out`. Additionally, with the `out` mode you can provide an `offset` value as any Number.
In general, this prop makes it possible to mimic the SVG2 `stroke-aligment`, which is currently not supported in any browser.

###### Example: 📜

The following examples visualize the modes differences:

| `line-position="center"`  | `line-position="out"`   | `line-position="out 20"`  | `line-position="in"` |
|----------|--------|---------|---------|
| <img width="100" height="100" src="https://github.com/setaman/Bilder/blob/master/e-lineMode-1.png">|<img width="100" height="100" src="https://github.com/setaman/Bilder/blob/master/e-lineMode-2.png">|<img width="100" height="100" src="https://github.com/setaman/Bilder/blob/master/e-lineMode-3.png">|<img width="100" height="100" src="https://github.com/setaman/Bilder/blob/master/e-lineMode-4.png"> |

<br>

- ### `emptyLinePosition`

###### Animated: ✔️

Descriptive string in form `"mode [offset]"` that defines how the empty line is aligned in relation to the empty circle fill area.
The usage is similar to [linePosition](#lineposition).

<br>

- ### `color`

###### Animated: ✔️

Defines the color of progress circle line. Is any CSS color like `#123` or `lime` or an object that defines the gradient.

- `color="#3f79ff"` - as String

- `:color="{ colors [, radial ]}"` - as Object
  - `radial` - default `false`. Boolean that defines, whether the gradient is radial or linear
  - `colors` - array that contains the gradient colors as objects `{ color: "#6546f7", offset: "10" [, opacity: 1] }`
    
###### Example: 📜
```js
<ve-progress :color="gradient" />

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

###### Animated: ✔️

Defines the fill color of the progress circle. Takes the same value as **[`color`](#color)**

<br>

- ### `emptyColor`

###### Animated: ✔️

Defines the color of the empty circle **line**. Takes the same value as **[`color`](#color)**

<br>

- ### `emptyColorFill`

###### Animated: ✔️

Defines the fill color of the empty circle. Takes the same value as **[`color`](#color)**

<br>

- ### `hideLegend`

Boolean that defines whether the legend value (**[`progress`](#progress)** or  **[`legend`](#legend)**) is hidden.

<br>

- ### `legend`

###### Animated: ✔️

Is any Number or String. Use this property if you want to show the progress value as the legend of the circle that is not in
the range [-100, 100]. If defined, `legend` will replace [`progress`](#progress) as the circle legend! Defining the value as 
string you can apply very simple formatting with `"."` or `","` as delimiter to set initial counter placeholder (e.g "0045.00"). 
Apart from this the value must generally be a valid JavaScript Number. For more customization possibilities please 
use [`legendFormatter`](#legendformatter) or [`scoped slot`](#default). 

###### Example: 📜

Let's say you need to display a rating from 0 to 5 of a product with 3.5 stars. Setting the [`progress`](#progress) to 3.5 will 
fill the circle to 3.5 percent, and this is not what we need, since we want to display the percentage of 5 as progress. 
At this point we need an additional property `legend`. We can show the product rating like in the following example:

```js
<ve-progress :progress="progress" :legend="rating" />
...
this.rating = 3.5;
this.progress = this.rating * 100 / 5; // the rating percentage
```
Now you can display custom progress value that still animated and circle progress fills properly!

```vue
<ve-progress legend="0100,450" /> // counts up from "0000,000"
```

>❗ note that `legend` replaces **[`progress`](#progress)** as circle legend.


<br>

- ### `legendFormatter` 

Is a Function that must return your custom formatted value. The function takes counter properties object as argument and 
is called on every counter tick. Here the formatting of [legend](#legend) or [progress](#progress) 
is completely up to you and you have the full freedom to adjust the presentation to your needs. The function can return any 
value, even HTML.   

>❕ alternatively you can use **[`scoped slot`](#default)** for custom formatting.

###### Example: 📜

The function takes counter properties Object as argument that you can use to define custom formatting.
`currentValue` is the most relevant value, as it is the actual value at specific counter tick. The return value will be 
displayed as the legend of the circle.

```js
const myFormatter = ({ currentValue, ...otherProps }) => {
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(currentValue); 
}
```
The function can also return HTML:
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
<ve-progress :legend-formatter="myFormatter"/>
<!-- shorter version-->
<ve-progress :legend-formatter="({ currentValue }) => `My Format ${currentValue}`"/>
````

<br>

- ### `animation`

Descriptive string in form `"type [duration delay]"` that defines the initial animation of progress circle line filling. `type` is one from predefined animations and the optional `duration` and `delay` are Number values. Note that the order is important and that you can only define `delay` after `duration`. 

- `type` - is one of the predefined animations: `default | rs | reverse | bounce| loop`
- `duration` - number in milliseconds, default `1000`
- `delay` - number in milliseconds, default `400`

###### Example: 📜

```js
animation="rs 700 200"
animation="bounce 1000"
```

<br>

- ### `loading`

Boolean that forces loading state. The component provides an indeterminate loading state for the case that your data is not available immediately. With this property set to `true` you can use the component as the indeterminate progress. 

<br>

- ### `loader`

With this option defined as Object you can customize the loading circle that is shown in the states 
[loading](#loading) and [determinate](#determinate). Accepted properties are [`color`](#color), [`thickness`](#thickness), [`line`](#line),
[`lineMode`](#linemode), `duration` and `opactity`. `duration` and `opacity` are specific for loading circle.
Any valid CSS opacity value can be set as `opacity`. `duration` specifies the speed of the loader animation in milliseconds.
If the `loader` option is not specified, the loading circle replicates the progress circle with a 0.55 default value for `opacity`
and 1000 `duration`.

###### Example: 📜

```vue
<ve-progress :loader="{ color: 'green', lineMode: 'in 10', opacity: '0.6', duration: 1500 }" />
```

<br>

- ### `determinate`

Boolean that provides a determinate loading state that indicates that your data loading is still in progress but allows to show the **[`progress`](#progress)**. 

<br>

- ### `noData`

###### Animated: ✔️

Boolean that forces no data state. The component provides a no data state for the case that your data is not available. The circle progress is still empty.

>❗ The component will take the no data state even if you provide an invalid **[`progress`](#progress)** value 

<br>

- ### `angle`

###### Animated: ✔️

Is any number. It defines the starting point of the progress circle line. 

<br>

- ### `fontSize`

###### Animated: ✔️

Is any valid CSS size value. It defines the font size of the circle legend. You will have to use **[`legendClass`](#legendClass)** if you want to apply more specific styles.

<br>

- ### `fontColor`

###### Animated: ✔️

Is any valid CSS color value. It defines the color of the circle legend. You will have to use **[`legendClass`](#legendClass)** if you want to apply more specific styles.

<br>

- ### `legendClass`

Adds class to the circles legend to give you the possibility to style it.

<br>

- ### `dash` 

###### Animated: ✔️ 

Descriptive string in form `"[strict] count spacing"` that adds dashed empty progress line. This property provides the optional `strict` mode. In this mode you can define the explicit number of dashes as `count` with the given relative `spacing` as number in range >= 0 and < 1. Without `strict` the default behavior of the SVG `stroke-dasharray` property is used, where the size and spacings of the dashes are defined.

###### Example: 📜
`<ve-progress dash="strict 60 0.5" />` - 60 dashes with 0.5 relative spacing

`<ve-progress dash="10 10" />` - 10 pixels big dashes with 10 pixels spacing, the number of dashes depends on the empty circle circumference

<br>

- ### `half` 

Boolean that specifies the type of the circle. If it is set to true, only the half of the circle will be drawn.

###### Example: 📜
```vue
<ve-progress half />
```
<img width="350px" src="https://github.com/setaman/Bilder/blob/master/ep_half_example.png" alt="half circle example"/>

<br>

- ### `gap`

###### Animated: ✔️

Defines the gap in pixels from one circle to the previous circle. It will be applied only if [`data`](#data) prop is used.

###### Example: 📜

```vue
<ve-progress :gap="10"/>
```

<br>

- ### `dot`

###### Animated: ✔️

The dot property lets you define a point indicator at the end of the progress line. You have a lot of freedom to customize the dot using a Number, descriptive String, or an Object to inject any CSS styles.   

**Number**: `:dot="10"` - specifies a round dot with 10px width and height and default `#713dfd` color

**Descriptive string**: `dot="size [color]"` - `size` can be just a Number or a percent value like `5%`, the calculation for percent values is similar to **[`thickness`](#thickness)** and depends on the **[`size`](#size)**. `color` is optional and lets you quickly define the color of the dot. The order of properties is important for parsing the String, and you can set the `color` only if the `size` is defined.

**Object**: `:dot="{ size: Number | String [, any CSS inline style with Vue syntax] }"` - to customize the point, you can define the prop as an Object. `size` is required and can be just a Number or a String to define a percent value. Only defining the prop as an Object you have the possibility to add any styles to the dot you want to, using Vue syntax for defining inline styles, you can even completely break the positioning of the dot, if you need. You cannot override the `height` of the dot since it is important for internal calculation and must be controllable. 

###### Example: 📜
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

Is a Boolean. `reverse` prop flips the circle, and the progress circle fills counterclockwise. Alternatively you can just set 
a negative value for [`progress`](#progress).

###### Example: 📜

```vue
<ve-progress reverse />
```

<br>

- ### `data`

You can specify 2 or more circles as Objects in an array as `data`. For each circle you can use almost every available property. It is not necessary to specify all properties, they will be merged with global props, the specified props will overwrite the global. The circles are rendered inside each other.

>❗ Excluded props: **[`lineMode`](#lineMode)**, **[`emptyThickness`](#emptyThickness)**, **[`legend`](#legend)**. These properties will be ignored, if `data` is specified. The legend of this circle is also not shown. 

###### Example: 📜

```js
<!-- this props are applied to all circles, if not overwritten in "data"-->
<ve-progress color="blue" animation="loop 500" ...  :data="data"/>

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

Use this scoped slot, if you want to customize the presentation of the circle legend and make a use of the animated counter, 
so your formatting still animated. This works similar to the [`legendFormatter`](#legendformatter) and is just 
an alternative way to provide a custom format. You can access animated counter properties through the scoped slot 
props and adjust the presentation of the legend to your needs. 

```vue
<ve-progress :progress="50">
  <template #default="{ counterTick }">
    <span style="font-weight: bold; font-size: 1.6rem; color: green;">
      {{ myFormatter(counterTick.currentValue) }}
    </span>
  </template>
</ve-progress>
```

- #### `legend`

In this slot you can put an additional element that you want to display beside the progress

- #### `legend-caption`
In this slot you can put any HTML and style it on your own. This slot is aligned below the progress. 

###### Example: 📜

This code ...
```html
<ve-progress ....>
  
<template #legend>
  <span>/200</span>
</template>
<template #legend-caption>
  <p>TASKS DONE</p>
</template>
  
</ve-progress>
```
... produces following result. The slots are marked corresponding:

<img width="100" height="100" src="https://github.com/setaman/Bilder/blob/master/ellipse-slots.png" alt="slot example">

<br>

## Compatibility
This project targets modern browsers, platforms and Vue frameworks. The SVG circles should be displayed without problems
also in older browsers. The experience with some animations or transitions may vary slightly in different browsers.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br> Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Opera | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/vivaldi/vivaldi_48x48.png" alt="Vivaldi" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Vivaldi | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Electron | <img src="https://camo.githubusercontent.com/06b2f979b4fbab8f1822cab69783700f0afa1f90/68747470733a2f2f6e7578746a732e6f72672f6d6574615f3430302e706e67" alt="Nuxt.js" width="24px" height="24px" /><br>Nuxt.js
| --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- |
| :white_check_mark:| :white_check_mark:| :white_check_mark: | :white_check_mark:| :white_check_mark:| :white_check_mark:| :white_check_mark: | :white_check_mark:

## Development

The development always happens in `dev` branch. You'll find all the latest updates there. 
`dev` will only be merged into the master when all unit tests have been passed, builds are successful, 
documentation is updated and functionality is verified on the [demo](https://vue-ellipse-progress-demo.netlify.app/#/test) page. 
Before all that, changes remain in beta.

#### Run for local development
The project was initialized with Vue CLI. Execute the following commands to start development locally:
```
npm i
npm run serve
```
