<template>
  <div class="demo">
    <div class="card">
      <expandable-text-line class="text">
        <p>Lorem ipsum dolor elit.</p>
        <p><i>Doloremque minima<br>facere cum assumenda<br>reprehenderit</i></p>
        <div><b>Iste</b> accusantium inventore amet ullam ea eum expedita vitae, soluta voluptatibus quis maiores ratione corporis architecto?</div>
        <p class="box">
          <a href="#">Beatae mollitia temporibus</a> aspernatur atque voluptates consectetur quo autem itaque esse rem, nulla inventore odit!
        </p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id eos a atque tempora inventore magnam, laboriosam reiciendis adipisci quisquam ut ipsum, quidem minus facilis quae? Perferendis odit nihil quaerat molestiae.</p>
        </expandable-text-line>
    </div>
    <div class="card text-bottom">
      <expandable-text-line class="text" use-click>
        <b>Lorem</b> ipsum dolor sit, amet consectetur adipisicing elit.
        Quibusdam odio cupiditate sed, eveniet repudiandae molestias veritatis temporibus necessitatibus sequi, dolorum veniam beatae mollitia iste ratione eaque corporis deleniti, libero totam?
      </expandable-text-line>
    </div>
  </div>
</template>

<script>
import ExpandableTextLine from './ExpandableTextLine'
export default {
  name: 'demo',
  components: { ExpandableTextLine }
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
      align-items: flex-start;
      width: 300px;
      height: 300px;
      max-width: calc(50vw - 15px);
      max-height: calc(100% - 20px);
      border: 1px solid #ccc;
      &:not(:last-child) {
        margin-right: 10px
      }

      &.text-bottom {
        align-items: flex-end;
        .text {
          border-width: 1px 0 0 0;
        }
      }
    }
    .text {
      padding: 10px;
      background: rgba(255,255,255,0.3);
      border: solid #ccc;
      border-width: 0 0 1px 0;
    }
    .box {
      border: 1px solid rgb(238, 210, 119);
      padding: 15px;
    }
  }
</style>
