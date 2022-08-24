import icons from '../../img/icons.svg';
import { view } from './view';
import { RES_PER_PAGE } from "../config";
class paginationView extends view {
    parentEl = document.querySelector('.pagination');
    _pageToGo;
    _renderPagination(obj){
        this._data=obj;
        this._clear();
        const mark = this._generatePaginationMark();
        this.parentEl.insertAdjacentHTML("afterbegin",mark);
      }
    _generatePaginationMark(){
        const pageNum = Math.ceil(this._data.result.length/RES_PER_PAGE) ;
        const curPage = this._data.page;
        console.log(pageNum);
        console.log(this._data.result.length);
        console.log(curPage);
        if(pageNum>1 && curPage===1)
        //  'next only';
         return `<button  class="btn--inline pagination__btn--next" data-goTo="${curPage+1}">
        <span>Page ${curPage+1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>`;
        if(pageNum>1 && curPage<pageNum )
        //  'next page and previous page';
         return `<button data-goTo="${curPage-1}" class="btn--inline pagination__btn--prev">
         <svg class="search__icon">
           <use href="${icons}#icon-arrow-left"></use>
         </svg>
         <span>Page ${curPage-1}</span>
       </button>
       <button data-goTo="${curPage+1}" class="btn--inline pagination__btn--next">
         <span>Page ${curPage+1}</span>
         <svg class="search__icon">
           <use href="${icons}#icon-arrow-right"></use>
         </svg>
       </button> `
        if(pageNum>1 && curPage===pageNum)
        //  'previous page only';
         return `<button data-goTo="${curPage-1}" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${curPage-1}</span>
        </button>`
        return '';

    }
    _addHandlerRender(handler){
        this.parentEl.addEventListener('click',(e) => {
            const btn = e.target.closest('.btn--inline');
            if(!btn) return;
            this._pageToGo = +btn.getAttribute('data-goTo');
            console.log(btn);
            console.log(this._pageToGo);
            handler();
        })
    }
}

export default new paginationView();