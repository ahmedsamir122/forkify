import { view } from "./view";
import icons from '../../img/icons.svg';

class searchResultView extends view {
    parentEl = document.querySelector('.results');
    _massage = 'No recipes found for your query! Please try again ;)';
    _renderResult(obj){
        this._data = obj;
        if(!obj || (Array.isArray(obj) && obj.length===0)) return this._renderError();
        const mark = this._data.map(rec => {
        return `<li class="preview">
        <a class="preview__link " href="#${rec.id}">
          <figure class="preview__fig">
            <img src="${rec.image}" alt="Test" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${rec.title}</h4>
            <p class="preview__publisher">${rec.publisher}</p>
            <div class="recipe__user-generated ${rec.key?'':'hidden'}">
      <svg>
        <use href="${icons}#icon-user"></use>
      </svg>
    </div>
          </div>
        </a>
      </li>`}).join('');
            
      this.parentEl.innerHTML='';
      this.parentEl.insertAdjacentHTML("afterbegin",mark);
    }
    _addHandlerRender(handler){
        document.querySelector('.search').addEventListener('submit',handler)
    }
}

export default new searchResultView();