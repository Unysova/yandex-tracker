<template>
  <div class="search-block" >
    <el-input placeholder="Введите адрес"
              @keyup.enter.native="addAddress"
              v-model="newAddress">
    </el-input>
    <p>{{this.track}}</p>
    <el-button type="primary"
               @click="addAddress">
        Добавить точку
    </el-button>
    <el-dialog
            :visible.sync="dialogVisible"
            width="30%">
      <span>{{message}}</span>
    </el-dialog>
  </div>
</template>
<script src="./SearchBlock.js"></script>
<style src="./SearchBlock.scss" lang="scss" scoped></style>
