<template>
  <div ref="text-line"
       class="expandable-text-line"
       v-on="useHover ? { mouseover: enter, mouseleave: leave } : {}"
       @click="click">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'ExpandableTextLine',

  props: {
    useHover: { type: Boolean, default: true },
    duration: { type: Number, default: 0.1 },
    collapseTextOnLeaveRatio: { type: Number, default: 0.6 }
  },

  mounted () {
    this.$refs.textLine.style.transitionDuration = `${this.duration}s`
  },

  methods: {
    click (e) {
      const el = e.target
      if (!el.style.height) {
        this.enter(e)
        e.stopPropagation()
      } else {
        this.leave(e)
      }
    },

    enter (e) {
      const el = e.target
      let { width, height } = getComputedStyle(el)
      const minHeight = height

      el.style.width = width
      el.style.position = `absolute`
      el.style.visibility = `hidden`
      el.style.height = `auto`
      el.style.whiteSpace = 'initial'

      height = getComputedStyle(el).height

      el.style.width = null
      el.style.position = null
      el.style.visibility = null
      el.style.whiteSpace = null
      el.style.height = minHeight

      // Force repaint to make sure the animation is triggered correctly.
      // eslint-disable-next-line no-unused-expressions
      getComputedStyle(el).height
      setTimeout(() => {
        el.style.height = height
        el.style.whiteSpace = 'unset'
      })
    },

    leave (e) {
      const el = e.target
      let { width, height, whiteSpace } = getComputedStyle(el)
      const maxHeight = height

      el.style.height = 'auto'
      el.style.width = width
      el.style.position = `absolute`
      el.style.visibility = `hidden`
      el.style.whiteSpace = 'nowrap'

      height = getComputedStyle(el).height

      el.style.width = null
      el.style.position = null
      el.style.visibility = null
      el.style.whiteSpace = whiteSpace
      el.style.height = maxHeight

      // eslint-disable-next-line no-unused-expressions
      getComputedStyle(el).height
      setTimeout(() => {
        el.style.height = height
        setTimeout(() => {
          el.style.whiteSpace = null
          el.style.height = null
        }, this.duration * 1000 * this.collapseTextOnLeaveRatio)
      })
    }
  }
}
</script>

<style lang='scss'>
  .expandable-text-line {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    transition: height 0.1s;
  }
</style>
