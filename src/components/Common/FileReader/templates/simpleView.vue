<template>
   <div class="simpleView">
      <img class="file" ref="imageFile" v-if="currentFile.format === 'image'" src="">
      <video class="file" ref="videoFile" v-if="currentFile.format === 'video'" src="">
         <source src=""/>
      </video>
   </div>
</template>

<script>

export default {
   // eslint-disable-next-line
   name: "simpleView",
   props: {
      files: {
         type: Array
      },
      indexFile: {
         type: Number
      }
   },
   data() {
      return {
         imageFormats: {
            'image': [
               'jpg',
               'png'
            ],
            'video': [
               'mp4',
               'webm'
            ]
         },
         currentFile: {
            format: '',
            src: ''
         }
      }
   },
   methods: {
      checkType(file) {
         for(let [formatKey, formats] of Object.entries(this.imageFormats)) {
            formats.forEach((format) => {
               if(format === file.match(/[^.]+(?=[?#])/)[0]) {
                  this.currentFile.format = formatKey;
               }
            })
         }
      }
   },
   beforeMount() {
      this.currentFile = {
         format: this.checkType(this.files[this.indexFile].src),
         src: this.files[this.indexFile].src
      }
   }
}
</script>

<style lang="less">
.simpleView {
   &-file {
      width: 100%;
      height: auto;
   }
}
</style>