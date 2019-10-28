# vue-expandable-text-line

A simple **Vue** component that clips a long text into a single line with `…` (ellipsis), and expands it with a transition to it's full length on `mouseover` or `click`.

#### Demo
[Live demo on Codesandbox](https://codesandbox.io/s/vue-template-xrmpg?fontsize=14)

## Installation

```
$ npm i vue-expandable-text-line
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
If you would like to do this on `click` instead, you can add `use-click` argument:
```html
<expandable-text-line use-click>
  <!--Your text or html goes here-->
</expandable-text-line>
```
*Note:* If a `touch` event is detected, then regardless of whether or not the `use-click` is present, the `touch` event will be used to trigger the transition.

##### Props
| | | |
| --- | --- | --- 
| **use-click** | *Boolean* | Whether to use `click` or `hover` to trigger the transition. Default **false** i.e. expands on `hover`  
| **duration** | *Number* | Duration of the transition in seconds. Default **0.2**
 

#### CSS
The component has only functional css. In order to style it you can add your own class or a `style` tag:
```html
<expandable-text-line class="whatever-class-name">
  <!--Your text or html goes here-->
</expandable-text-line>
```
