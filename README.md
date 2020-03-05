# vue-expandable-text-line  &nbsp;[![Build Status](https://travis-ci.com/tyminko/vue-expandable-text-line.svg?branch=master)](https://travis-ci.com/tyminko/vue-expandable-text-line)

A simple **Vue** component that clips a long text (or html) into a single line with `…` (ellipsis), and expands it with a transition to it's full length on `mouseover` or `click`.

<img src="https://user-images.githubusercontent.com/32540212/67645977-09cfc780-f92c-11e9-8d50-298444165b32.png" width="614" height="auto">

## Demo
[Live demo on Codesandbox](https://codesandbox.io/embed/vue-template-xrmpg?codemirror=1&fontsize=14&hidenavigation=1&module=%2Fsrc%2FApp.vue&view=preview)

## Installation

```
$ npm i vue-expandable-text-line
```
or
```
$ yarn add vue-expandable-text-line
```

## Usage

#### Script
```javascript
import ExpandableTextLine from 'vue-expandable-text-line'
export default {
  components: { ExpandableTextLine }
}
```
#### Template 
```html
<expandable-text-line>
  <!--Your text or html goes here-->
</expandable-text-line>
```
By default it will be expanded on `hover`.
If you would like to do this on `click` instead, you can pass a `use-click` prop without a value (implying setting it to `true`):
```html
<expandable-text-line use-click>
  <!--Your text or html goes here-->
</expandable-text-line>
```
*Note:* If a `touch` event is detected, then regardless of whether or not the `use-click` is set, the `touch` event will be used to trigger the transition.

##### Props
| | | |
| --- | --- | --- 
| **use-click** | *Boolean* | Whether to use `click` or `hover` to trigger the transition. Default **false** i.e. expands on `hover`  
| **force-expand** | *Boolean* | If true, keeps the text line expanded. Setting it to false returns the component to it's normal behaviour. Default **false** 
| **duration** | *Number* | Duration of the transition in seconds. Default **0.2**
 

#### CSS
The component has only functional css. In order to style it you can add your own class or a `style` attribute:
```html
<expandable-text-line class="whatever-class-name">
  <!--Your text or html goes here-->
</expandable-text-line>
```
![#f03c15](https://placehold.it/15/ffff00/ffffff?text=+) *Note:*

***Width**:* In order for the component to be able to properly clip it's contained text, 
the ExpandableTextLine element or it's parent should have an **explicit width** (i.e. set in `px`, `em` etc., but not in `%`). 
If you don't set it explicitly, then the maximum width of the collapsed line will be set on-the-fly to match the natural dimensions in the expanded state. 
This will work most of the time correctly, however can potentially have an effect on the performance during window resize.

***Height**:* If you would like that an expanded line with a very long text or html to become scrollable within the height of the parent container, then you have two options:
 1. You can specify an **explicit height** of the parent. Then the expanded line will be automatically clipped to the height of the parent and become scrollable.
 2. Or you can add `owerflow: auto` to the parent (or grandparent) container that determines the maximum height.

*For instance:*
```html
<div style="width: 400px; height: 400px">
  <expandable-text-line>
    <!--Your text or html goes here-->
    <!--It will be properly clipped within the 400px width & when expand, will become scrollable withing 400px height-->
  </expandable-text-line>
</div>
```
