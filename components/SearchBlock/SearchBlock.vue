<template>
  <div class="search-block">
    <el-input placeholder="Введите адрес" @keyup.enter.native="addAddress" v-model="newAddress"></el-input>
    <p>{{track}}</p>
    <el-button type="primary" @click="addAddress">Primary</el-button>
  </div>
</template>
<script src="./SearchBlock.js"></script>
<style src="./SearchBlock.scss" lang="scss" scoped></style>
