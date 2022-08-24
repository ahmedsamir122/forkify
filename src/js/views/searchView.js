class searchView {
     parentEl = document.querySelector('.search');

     _renderSearch(){

       return  document.querySelector('.search__field').value;
    
     }
    _clearInput(){
        document.querySelector('.search__field').value ='';
    }
     _addHandlerRender(handler){
        this.parentEl.addEventListener('submit',(e) => {
            e.preventDefault();
            handler();
        });
      }
}

export default new searchView();
