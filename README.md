# vue-expandable-text-line

A simple **Vue** component that clips a long text into a single line with … (ellipsis), and expands it with transition to it's full length on `mouseover` or `click`.

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

If you would like to expand it on `click` instead of `hover`, then you can add `use-click` argument:
```html
<expandable-text-line use-click>
  <!--Your text or html goes here-->
</expandable-text-line>
```
