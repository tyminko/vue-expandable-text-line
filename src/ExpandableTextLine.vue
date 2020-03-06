<template>
  <div ref="text-line"
       class="expandable-text-line"
       :style="style"
       v-on="shouldHover ? { mouseenter: expand, mouseleave: collapse } : { click }">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'ExpandableTextLine',

  props: {
    useClick: Boolean,
    forceExpand: Boolean,
    duration: { type: Number, default: 0.2 },
    collapseTextOnLeaveRatio: { type: Number, default: 1 }
  },

  data () {
    return {
      expandedClass: '__extl-expanded',
      timeoutOnCollapse: null,
      timeoutOnExpand: null,
      touch: false,
      initialH: null,
      initialW: null
    }
  },

  computed: {
    shouldHover () {
      return !this.useClick && !this.touch
    },
    style () {
      return {
        transitionDuration: `${this.duration}s`
      }
    }
  },

  mounted () {
    this.manageWidth()
    this.addClickOrTouchListener()
  },

  methods: {
    click () {
      const el = this.$refs['text-line']
      if (!el.classList.contains(this.expandedClass)) {
        this.expand()
      } else {
        this.collapse()
      }
    },

    expand () {
      /** @type HTMLElement */
      const el = this.$refs['text-line']
      if (this.forceExpand && el.classList.contains(this.expandedClass)) return
      const dimensions = this.dimensionsForExpand(el)
      clearTimeout(this.timeoutOnCollapse)
      el.style.height = dimensions.expandHeight
      el.style.whiteSpace = 'unset'
      el.classList.add(this.expandedClass)
      this.$emit('start-expand')
      this.timeoutOnExpand = setTimeout(() => {
        el.style.height = 'auto'
      }, this.duration * 1000)
    },

    collapse () {
      if (this.forceExpand) return
      const el = this.$refs['text-line']
      const dimensions = this.dimensionsForCollapse(el)
      clearTimeout(this.timeoutOnExpand)
      setTimeout(() => {
        el.style.height = dimensions.collapseHeight
        el.scroll({ top: 0, behavior: 'smooth' })
        this.$emit('start-collaps')
        this.timeoutOnCollapse = setTimeout(() => {
          el.style.whiteSpace = null
          el.classList.remove(this.expandedClass)
          el.scrollTop = 0
          el.style.height = null
        }, this.duration * 1000 * this.collapseTextOnLeaveRatio)
      })
    },

    /**
     * @param {HTMLElement} lineEl
     * @param {boolean} resetH
     * @return {{collapseWidth:string, expandWidth:string, collapseHeight:string, expandHeight:string}}
     */
    dimensionsForExpand (lineEl, resetH) {
      let { height, width } = getComputedStyle(lineEl)
      const collapseHeight = height
      const collapseWidth = width
      const preH = lineEl.style.height

      lineEl.style.height = 'auto'
      lineEl.style.whiteSpace = 'initial'
      lineEl.classList.add(this.expandedClass)

      const expandRect = getComputedStyle(lineEl)
      const expandHeight = expandRect.height
      const expandWidth = expandRect.width

      lineEl.style.whiteSpace = null
      lineEl.style.height = resetH ? preH : collapseHeight
      lineEl.classList.remove(this.expandedClass)
      // Force repaint to make sure the animation is triggered correctly.
      // eslint-disable-next-line no-unused-expressions
      getComputedStyle(lineEl).height

      return { collapseWidth, expandWidth, collapseHeight, expandHeight }
    },

    /**
     * @param {HTMLElement} lineEl
     * @return {{collapseWidth:string, expandWidth:string, collapseHeight:string, expandHeight:string}}
     */
    dimensionsForCollapse (lineEl) {
      let { height, width, whiteSpace } = getComputedStyle(lineEl)
      const expandHeight = height
      const expandWidth = width

      lineEl.style.height = null
      lineEl.style.whiteSpace = 'nowrap'
      lineEl.classList.remove(this.expandedClass)

      const collapseRect = getComputedStyle(lineEl)
      const collapseHeight = collapseRect.height
      const collapseWidth = collapseRect.width

      lineEl.style.whiteSpace = whiteSpace
      lineEl.style.height = expandHeight
      lineEl.classList.add(this.expandedClass)

      // eslint-disable-next-line no-unused-expressions
      getComputedStyle(lineEl).height

      return { collapseWidth, expandWidth, collapseHeight, expandHeight }
    },

    manageWidth () {
      const el = this.$refs['text-line']
      if (!el) return
      const dimensions = this.dimensionsForExpand(el, true)
      if (dimensions.collapseWidth !== dimensions.expandWidth) {
      // this could be a case when the line's paren doesn't have an explicit width
      // make sure that the line will be the same width in both states (expanded & collapsed)
        console.warn(`ExpandableTextLine: The parent width does not seem to be set explicitly. Therefore, the maximum width of the collapsed line must be set on the fly to match the natural dimensions in the expanded state. This can potentially affect performance. Please consider explicitly setting the width of the parent element or the width of the line itself.`)
        el.style.width = dimensions.expandWidth
        window.addEventListener('resize', () => {
          setTimeout(() => {
            requestAnimationFrame(() => { this.setMaxWidth(el) })
          }, 10)
        })
      }
    },

    setMaxWidth (el) {
      const preW = el.style.width
      el.style.width = null
      if (el.classList.contains(this.expandedClass)) {
        el.style.width = getComputedStyle(el).width
      } else {
        const dim = this.dimensionsForExpand(el)
        if (dim.collapseWidth !== dim.expandWidth) {
          el.style.width = dim.expandWidth
        } else {
          el.style.width = preW
        }
      }
    },

    addClickOrTouchListener () {
      document.addEventListener('touchstart', this.onFirstTouch)
      document.addEventListener('click', this.onFirstClick)
    },

    onFirstTouch (e) {
      this.touch = true
      document.removeEventListener('click', this.leaveOnClickOutside)
      document.removeEventListener('touchstart', this.onFirstTouch)
      document.addEventListener('touchstart', e => {
        this.leaveOnClickOutside(e)
      })
      this.leaveOnClickOutside(e)
    },

    onFirstClick (e) {
      document.removeEventListener('click', this.onFirstClick)
      if (!this.touch) {
        document.removeEventListener('touchstart', this.onFirstTouch)
        document.addEventListener('click', e => {
          this.leaveOnClickOutside(e)
        })
        this.leaveOnClickOutside(e)
      }
    },

    leaveOnClickOutside (event) {
      if (this.forceExpand) return
      const el = this.$refs['text-line']
      if (!el) return
      if (!el.contains(event.target) &&
           el.classList.contains(this.expandedClass)) {
        this.collapse()
      }
    }
  }
}
</script>
<style scoped>
* {
  will-change: height;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}
</style>
<style lang="scss">
  $blocks: p, h1, h2, h3, h4, h5, h6, ol, ul, pre, address, blockquote, dl, div, fieldset, form, hr, noscript, table;
  @mixin all-blocks {
    @each $el in $blocks {
      #{$el} { @content }
    }
  }

  .expandable-text-line {
    box-sizing: border-box;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    cursor: pointer;
    width: 100%;
    max-width: 100vw;
    transition: height 0.1s;

    @include all-blocks {
      display: inline;

      &:not(:first-child)::before {
        content: "\00a0 "
      }
      &:not(:last-child)::after {
        content: "\00a0 "
      }
    }

    br {
      display: none;
    }

    &.__extl-expanded {
      max-height: 100%;
      overflow: auto;
      cursor: auto;

      @include all-blocks {
        display: block;

        &:before {
          content: none
        }

        &:first-child {
          margin-top: 0;
        }
      }

      br {
        display: inline;
      }
    }
  }
</style>
