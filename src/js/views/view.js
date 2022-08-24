import icons from '../../img/icons.svg';
export class view {   
    _data;
    _errorMassage = 'we could not find that recipe. Please try another one';
    _massage ='';
    _clear(){
      this.parentEl.innerHTML='';
    }
  _spinner(){
      const mark = `<div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>`;
    this._clear();
    this.parentEl.insertAdjacentHTML('afterbegin',mark);
    }
    _

    _renderError(msg=this._massage){
      const mark = `<div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${msg}</p>
    </div>`;
    this._clear();
    this.parentEl.insertAdjacentHTML('afterbegin',mark);
    }
    _renderMessage(msg=this._massage){
      const mark = `<div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${msg}</p>
    </div>`;
    this._clear();
    this.parentEl.insertAdjacentHTML('afterbegin',mark);
    }
  }