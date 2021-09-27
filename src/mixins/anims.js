export default {
  isAnimPlaying(anim){
   return this.anims.isPlaying && this.anims.getCurrentKey() === anim
  }
}