import icons from '../../img/icons.svg';
import { view } from './view';
class bookMarkView extends view {
    parentEl = document.querySelector('.bookmarks__list');
    _massage="the recipe you choosed can't be found";
    _renderBookMark(marks){
        this._clear();
        this._data=marks;
        const markUp = this._generateMarkUp();
      this.parentEl.innerHTML='';
      this.parentEl.insertAdjacentHTML("afterbegin",markUp);
    }
    _addHandlerRender(handler){
        window.addEventListener('load',handler);
    }
    _generateMarkUp(){
        if(this._data.length === 0) {
            return `<div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>
              No bookmarks yet. Find a nice recipe and bookmark it :)
            </p>
          </div>`
        }
        return this._data.map(book => `<li class="preview">
        <a class="preview__link preview__link--active" href="#${book.id}">
          <figure class="preview__fig">
            <img src="${book.image}" alt="Test" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${book.title}</h4>
            <p class="preview__publisher">${book.publisher}</p>
            <div class="preview__user-generated">
              <svg>
                <use href="${icons}#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>` ).join('');
        
    }
    
}

export default new bookMarkView();