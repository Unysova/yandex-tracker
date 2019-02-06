<template>
  <ul class="track-list" v-model="track">
    <draggable v-model="track" :options="{group:'people'}" @start="drag=true" @end="drag=false">
      <li v-for="element in track" :key="element.id">{{element}}</li>
    </draggable>

    <p>{{track}}</p>
  </ul>
</template>

<script src="./TrackList.js"></script>
<style src="./TrackList.scss" lang="scss" scoped></style>
