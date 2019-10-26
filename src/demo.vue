<template>
  <div class="demo">
    <div class="card">
      <expandable-text-line class="text">
        <b>Lorem</b> ipsum dolor sit, amet consectetur adipisicing elit.
        Quibusdam odio cupiditate sed, eveniet repudiandae molestias veritatis temporibus necessitatibus sequi, dolorum veniam beatae mollitia iste ratione eaque corporis deleniti, libero totam?
      </expandable-text-line>
      <expandable-text-line class="text">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <p>
          Beatae mollitia temporibus aspernatur atque voluptates consectetur quo autem itaque esse rem, nulla inventore odit! Voluptatum atque hic aspernatur rerum sit ex?
        </p>
      </expandable-text-line>
    </div>
  </div>
</template>

<script>
import ExpandableTextLine from './ExpandableTextLine'
export default {
  name: 'demo',
  components: {
    ExpandableTextLine
  },

  props: {
  },

  data: () => ({
  }),

  computed: {
  },

  methods: {
  }
}
</script>

<style lang='scss'>
  body {
    margin: 0;
    padding: 0;
  }
  .demo{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    font-family: sans-serif;

    .card {
      display: flex;
      align-items: flex-end;
      width: 400px;
      height: 400px;
      max-width: 100%;
      max-height: 100%;
      border: 1px solid #ccc;
    }
    .text {
      padding: 10px;
      background: rgba(255,255,255,0.3);
      border-top: 1px solid #ccc;
    }
  }
</style>
