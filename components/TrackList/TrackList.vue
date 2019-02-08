<template>
  <div class="track-list">
  <ul v-model="track" v-if="track.length > 0">
    <draggable
            v-model="track"
            @start="drag=true"
            @end="drag=false">
      <li v-for="(element, index) in track"
          :key="element.id">

        {{element.address}} {{element.id}}

        <el-button
                type="danger"
                icon="el-icon-delete"
                @click="removeAddress(index)">
        </el-button>
      </li>
    </draggable>
  </ul>

    <el-button
            v-if="track.length != 0"
            icon="el-icon-delete"
            type="danger"
            @click="removeAll()">
      Удалить все точки
    </el-button>

    <div class="empty-state" v-if="track.length === 0">
      <p class="note">Чтобы построить путь, введите название города в поле выше и нажмите ENTER или кнопку "Добавить
        точку". За раз добавляется только одна точка</p>
    </div>
  </div>
</template>

<script src="./TrackList.js"></script>
<style src="./TrackList.scss" lang="scss" scoped></style>
