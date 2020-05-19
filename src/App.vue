<template>
  <div class="app">
    <div class="letter-row">
      <div
        v-for="letter in letters"
        v-bind:key="letter"
        class="letter-container"
      >
        <span class="letter-text">{{ letter }}</span>
      </div>
    </div>
    <div v-if="hasBingo" class="modal-container">
      <div class="modal-inner">
        <p>Congratulations! You got bingo!</p>
      </div>
    </div>
    <div class="card">
      <div
        v-for="(item, index) in values"
        v-bind:key="index + 'a'"
        class="cell"
        v-on:click="handleCellClick(index)"
      >
        <p>{{ item.value }}</p>
        <div v-if="item.marked" class="cross-out">
          <span class="cross-x">X</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createBingoCard } from "./utils/card-builder-utils";
import { getUpdatedCard } from "./utils/update-card-utils";
import { BingoValidator } from "./utils/check-bingo-utils";
const validator = new BingoValidator(5);
export default {
  name: "App",
  data: function() {
    return {
      values: createBingoCard(5),
      hasBingo: false,
      letters: "bingo".toUpperCase().split("")
    };
  },
  methods: {
    handleCellClick(index) {
      const updatedCard = getUpdatedCard(index, this.values);
      console.log(JSON.stringify(updatedCard));
      const hasBingo = validator.hasBingo(updatedCard);
      console.log(hasBingo);
      this.values = updatedCard;
      if (hasBingo) {
        this.hasBingo = true;
      }
    }
  }
};
</script>

<style>
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.app {
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 80%;
}
.letter-row {
  display: flex;
  flex-direction: row;
  width: 100%;
}
.letter-container {
  display: flex;
  width: 20%;
  justify-content: center;
}
.letter-text {
  color: #446275;
  font-size: 30px;
}
.modal-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-inner {
  width: 50%;
  height: auto;
  background-color: white;
  border-radius: 5px;
  padding: 10px;
}
.card {
  height: 100%;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  padding-bottom: 20px;
  display: flex;
}
.cell {
  display: flex;
  background-color: #a0bcb7;
  justify-content: center;
  align-content: center;
  width: 17%;
  height: 20%;
  border: 1px solid #446275;
  padding: 5px;
}
.cross-out {
  position: absolute;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
}
.cross-x {
  font-size: 50px;
  margin: 0;
  color: #446275;
}
</style>
