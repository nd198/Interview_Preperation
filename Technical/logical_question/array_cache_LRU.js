class LRUCache {
    constructor(cap) {
        //  code here
        this.cap = cap;
        this.cache = [];
    }
    
    isFull(){
        return this.cache.length===this.cap;
    }

    /**
     * @param {number} key
     * @returns {number}
     */
    get(key) {
        return this.cache.indexOf(key)
        
        //  code here
    }

    /**
     * @param {number} key
     * @param {number} value
     * @return {void}
     */

        
    put(key, value) {
        let itemIndex= this.get(key);
        if(itemIndex==-1){
          if(this.isFull()){
            this.cache.pop();
            this.cache.unshift(key)
          }else{
            this.cache.unshift(key)
          }
          
        }else{
          this.cache.splice(itemIndex, 1);
          this.cache.unshift(key)
        }
        // code here
        
        console.log("this.cachethis.cachethis.cachethis.cache", this.cache)
    }
}


let temp = new LRUCache(4);

temp.put(10)
temp.put(20)
temp.put(10)
temp.put(30)
temp.put(40)
temp.put(50)
temp.put(30)
temp.put(40)
temp.put(60)
temp.put(30)


// this.cachethis.cachethis.cachethis.cache [ 10 ]
// this.cachethis.cachethis.cachethis.cache [ 20, 10 ]
// this.cachethis.cachethis.cachethis.cache [ 10, 20 ]
// this.cachethis.cachethis.cachethis.cache [ 30, 10, 20 ]
// this.cachethis.cachethis.cachethis.cache [ 40, 30, 10, 20 ]
// this.cachethis.cachethis.cachethis.cache [ 50, 40, 30, 10 ]
// this.cachethis.cachethis.cachethis.cache [ 30, 50, 40, 10 ]
// this.cachethis.cachethis.cachethis.cache [ 40, 30, 50, 10 ]
// this.cachethis.cachethis.cachethis.cache [ 60, 40, 30, 50 ]
// this.cachethis.cachethis.cachethis.cache [ 30, 60, 40, 50 ]





