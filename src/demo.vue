<template>
  <div class="demo">
    <div class="button" @click="useClick = !useClick">{{buttonTitle}}</div>
    <div class="container">
      <div class="card">
        <expandable-text-line class="text" :use-click="useClick">
          <b>{{message}}</b>
          <p>Lorem ipsum dolor elit.</p>
          <p><i>Doloremque minima<br>facere cum assumenda<br>reprehenderit</i></p>
          <div><b>Iste</b> accusantium inventore amet ullam ea eum expedita vitae, soluta voluptatibus quis maiores
            ratione corporis architecto?
          </div>
          <p class="box">
            <a href="#">Beatae mollitia temporibus</a> aspernatur atque voluptates consectetur quo autem itaque esse
            rem, nulla inventore odit!
          </p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id eos a atque tempora inventore magnam,
            laboriosam reiciendis adipisci quisquam ut ipsum, quidem minus facilis quae? Perferendis odit nihil quaerat
            molestiae.</p>
        </expandable-text-line>
      </div>
      <div class="card text-bottom">
        <expandable-text-line class="text" :use-click="useClick">
          <b>{{message}}</b> Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Quibusdam odio cupiditate sed, eveniet repudiandae molestias veritatis temporibus necessitatibus sequi,
          dolorum veniam beatae mollitia iste ratione eaque corporis deleniti, libero totam?
        </expandable-text-line>
      </div>
    </div>
  </div>
</template>

<script>
import ExpandableTextLine from './ExpandableTextLine'
export default {
  name: 'demo',
  components: { ExpandableTextLine },
  data: () => ({
    useClick: false
  }),
  computed: {
    buttonTitle () {
      return `Expand on ${this.useClick ? 'Hover' : 'Click'}`
    },
    message () {
      return `${this.useClick ? 'Click' : 'Mouse hover'} to expand!`
    }
  }
}
</script>

<style lang='scss'>
body {
  margin: 0;
  padding: 0;
}
.demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  font-family: sans-serif;

  .button {
    margin: 10px 0 10px;
    height: 20px;
    line-height: 20px;
    background: rgb(241, 241, 241);
    color: rgb(117, 117, 117);
    font-size: 90%;
    border-radius: 5px;
    padding: 5px 8px;
    cursor: pointer;
  }

  .container {
    display: flex;
  }
  .card {
    display: flex;
    align-items: flex-start;
    width: 300px;
    height: 300px;
    max-width: calc(50vw - 15px);
    max-height: calc(100% - 20px);
    border: 1px solid #ccc;
    &:not(:last-child) {
      margin-right: 10px;
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
    background: rgba(255, 255, 255, 0.3);
    border: solid #ccc;
    border-width: 0 0 1px 0;
  }
  .box {
    border: 1px solid rgb(238, 210, 119);
    padding: 15px;
  }
}
</style>
