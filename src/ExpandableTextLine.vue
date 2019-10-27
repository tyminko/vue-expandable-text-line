<template>
  <div ref="text-line"
       class="expandable-text-line"
       v-on="shouldHover ? { mouseenter: enter, mouseleave: leave } : { click }">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'ExpandableTextLine',

  props: {
    useClick: Boolean,
    duration: { type: Number, default: 0.2 },
    collapseTextOnLeaveRatio: { type: Number, default: 1 }
  },

  data () {
    return {
      expandedClass: '__extl-expanded',
      timeoutLeave: null,
      touch: false
    }
  },

  computed: {
    shouldHover () {
      return !this.useClick && !this.touch
    }
  },

  watch: {
    duration () {
      const el = this.$refs['text-line']
      if (!el) return
      el.style.transitionDuration = `${this.duration}s`
    }
  },

  mounted () {
    this.$refs['text-line'].style.transitionDuration = `${this.duration}s`
    this.addClickOrTouchListener()
  },

  methods: {
    click (e) {
      const el = this.$refs['text-line']
      if (!el.classList.contains(this.expandedClass)) {
        this.enter()
      } else {
        this.leave()
      }
    },

    enter () {
      clearTimeout(this.timeoutLeave)
      /** @type HTMLElement */
      const el = this.$refs['text-line']
      let { height } = getComputedStyle(el)
      const minHeight = height

      el.style.height = 'auto'
      el.style.whiteSpace = 'initial'
      el.classList.add(this.expandedClass)

      height = getComputedStyle(el).height

      el.style.whiteSpace = null
      el.style.height = minHeight
      el.classList.remove(this.expandedClass)

      // Force repaint to make sure the animation is triggered correctly.
      // eslint-disable-next-line no-unused-expressions
      getComputedStyle(el).height
      setTimeout(() => {
        el.style.height = height
        el.style.whiteSpace = 'unset'
        el.classList.add(this.expandedClass)
      })
    },

    leave () {
      const el = this.$refs['text-line']
      let { height, whiteSpace } = getComputedStyle(el)
      const maxHeight = height

      el.style.height = 'auto'
      el.style.whiteSpace = 'nowrap'
      el.classList.remove(this.expandedClass)

      height = getComputedStyle(el).height

      el.style.whiteSpace = whiteSpace
      el.style.height = maxHeight
      el.classList.add(this.expandedClass)

      // eslint-disable-next-line no-unused-expressions
      getComputedStyle(el).height
      setTimeout(() => {
        el.style.height = height
        el.scroll({ top: 0, behavior: 'smooth' })
        this.timeoutLeave = setTimeout(() => {
          el.style.whiteSpace = null
          el.classList.remove(this.expandedClass)
          el.scrollTop = 0
          el.style.height = null
        }, this.duration * 1000 * this.collapseTextOnLeaveRatio)
      })
    },

    addClickOrTouchListener () {
      document.addEventListener('touchstart', this.onFirstTouch)
      document.addEventListener('click', this.onFirstClick)
    },

    onFirstTouch (e) {
      this.touch = true
      document.removeEventListener('click', this.leavOnClickOutside)
      document.removeEventListener('touchstart', this.onFirstTouch)
      document.addEventListener('touchstart', e => {
        this.leavOnClickOutside(e)
      })
      this.leavOnClickOutside(e)
    },

    onFirstClick (e) {
      document.removeEventListener('click', this.onFirstClick)
      if (!this.touch) {
        document.removeEventListener('touchstart', this.onFirstTouch)
        document.addEventListener('click', e => {
          this.leavOnClickOutside(e)
        })
        this.leavOnClickOutside(e)
      }
    },

    leavOnClickOutside (event) {
      const el = this.$refs['text-line']
      if (!el) return
      if (!el.contains(event.target) &&
           el.classList.contains(this.expandedClass)) {
        this.leave()
      }
    }
  }
}
</script>

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
    transition: height 0.1s;
    cursor: pointer;

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
