export default {
  isAnimPlaying(anim){
   return this.anims && this.anims.isPlaying && this.anims.getCurrentKey() === anim
  }
}