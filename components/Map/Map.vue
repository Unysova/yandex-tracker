<template>
  <div>
    <p class="note"
       v-if="track.length > 1">Расстояние по прямой между выбранными точками: {{distance}} километров</p>
    <el-button type="primary"
               v-if="track.length > 1"
               @click="addMultiRoute">
      Построить автомобильный маршрут
    </el-button>
    <div id="map" style="width: 100%; height: 500px;"></div>
  </div>
</template>

<script src="./Map.js"></script>
<style src="./Map.scss" lang="scss" scoped></style>
