class BestScore {

   constructor() {
      this.name = 'bestscore'
   }
   static _isExists() {
      return localStorage.getItem(this.name) ? true : false
   }
   static get() {
      if( BestScore._isExists() ) {
         return localStorage.getItem(this.name)
      }
      return 0
   }
   static set(score) {
      localStorage.setItem(this.name, score)
   }

}

export default BestScore