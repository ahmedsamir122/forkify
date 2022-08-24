import icons from '../../img/icons.svg';
import { view } from './view';
import { RES_PER_PAGE } from "../config";
class addView extends view {
    parentEl = document.querySelector('.upload');
    btnClose = document.querySelector('.btn--close-modal');
    btnOpen = document.querySelector('.nav__btn--add-recipe');
    window = document.querySelector('.add-recipe-window');
    overLay = document.querySelector('.overlay');
    _massage ='Recipe was sucessfully uploaded';
    constructor(){
        super();
        this._renderOpenWindow();
        this._renderCloseWindow();
    }

  _renderOpenWindow(){
    this.btnOpen.addEventListener('click', (e) => {
        this.window.classList.remove('hidden');
        this.overLay.classList.remove('hidden');
    }) 
  }
  hideWindow(){
        this.window.classList.add('hidden');
        this.overLay.classList.add('hidden');
  }

  _renderCloseWindow(){  
    this.btnClose.addEventListener('click', (e) => {
        this.window.classList.add('hidden');
        this.overLay.classList.add('hidden');
    })
  }
  _addHandlerloadValues(handler){
    this.parentEl.addEventListener('submit', (e) => {
        e.preventDefault();
        const dataArr = [...new FormData(this.parentEl)];
        const data = Object.fromEntries(dataArr);
        console.log(data);
        handler(data);
    })
  }
}

export default new addView();