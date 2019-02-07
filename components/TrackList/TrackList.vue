<template>
  <ul class="track-list" v-model="track">
    <draggable
            v-model="track"
            @start="drag=true"
            @end="drag=false">
      <li v-for="(element, index) in track"
              :key="element.id">

        {{element.address}} {{element.id}}

        <el-button
                type="primary"
                @click="removeAddress(index)">
          x
        </el-button>
      </li>
    </draggable>

    <el-button
            v-if="track.length != 0"
            type="primary"
            @click="removeAll()">
      remove all
    </el-button>

    <div class="empty-state" v-if="track.length === 0">
      <p>Добавьте точки в поле выше</p>
    </div>

    <p>{{this.track}}</p>
  </ul>
</template>

<script src="./TrackList.js"></script>
<style src="./TrackList.scss" lang="scss" scoped></style>
