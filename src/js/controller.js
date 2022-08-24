
const api = '6f468a94-3878-444b-9a34-c55166a48196';
import icons from 'url:../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeView from './views/recipeView';
import Fractional from "fractional";
import * as model from './module';
import { async } from 'regenerator-runtime';
import searchView from './views/searchView';
import searchResultView from './views/searchResultView';
import paginationView from './views/paginationView';
import bookMarkView from './views/bookMarkView';
import addView from './views/addView';
console.log(model);

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////


const renderRecipe = async function(){
  try{
    const id = window.location.hash.slice(1);
    if(!id) return;
    recipeView._spinner();

    await model.loadRecipe(id);
    console.log(model.state.recipe);
    recipeView._renderRecipe(model.state.recipe);
    console.log(model.state.bookMarks)

  }catch(err){
    console.log(err.message);
    recipeView._renderError();
  }
}
const renderSearchResult = async function(){
  try{
    let querySearch = searchView._renderSearch();
    console.log(querySearch);
    if(!querySearch ) return ;
    searchResultView._spinner();
    await model.loadSearchResult(querySearch);
    searchView._clearInput();
    searchResultView._renderResult(model.getSearchPage(1));
    paginationView._renderPagination(model.state)
  }catch(err){
    console.log(err);
    recipeView._renderError();
  }
  
}
const paginationControl = function(){
  searchResultView._renderResult(model.getSearchPage(paginationView._pageToGo));
    paginationView._renderPagination(model.state)
    console.log('hello');
}

const updatRecipe = function(){
  model.updateRecipe(recipeView._serving);
  console.log(model.state.recipe.servings);
  recipeView._renderRecipe(model.state.recipe);
  console.log('serving');
}

const controlBookMark = async function(){
  try{
    const id = window.location.hash.slice(1);
    if(!id) return;

    await model.loadRecipe(id);
    model.updateBookMarks(id);
    console.log(model.state.recipe)
    bookMarkView._renderBookMark(model.state.bookMarks)
    model.updateRecipe(recipeView._serving);
    recipeView._renderRecipe(model.state.recipe);
  }catch(err){
    console.log(err.message);
    recipeView._renderError();
  }
  
}
const loadBookmarks =function(){
  bookMarkView._renderBookMark(model.state.bookMarks);
}

const controlAddRecipe =async function(newRecipe){
  try{
    console.log(newRecipe);
    await model.uploadrecipe(newRecipe);
    // addView._spinner();
    console.log(model.state.recipe);
    recipeView._renderRecipe(model.state.recipe);
    // addView._renderMessage();
    bookMarkView._renderBookMark(model.state.bookMarks);
    window.history.pushState(null,'',`#${model.state.recipe.id}`)
    setTimeout(function(){
      addView.hideWindow();
    },1500);
  }catch(err){
    addView._renderError(err.message);
    console.log(err.message);
  }

}
// window.addEventListener('hashchange',renderRecipe);
// window.addEventListener('load',renderRecipe);
// // renderRecipe();
const init = function(){
  bookMarkView._addHandlerRender(loadBookmarks);
  recipeView._addHandlerRender(renderRecipe);
  searchView._addHandlerRender(searchView._renderSearch);
  searchResultView._addHandlerRender(renderSearchResult);
  paginationView._addHandlerRender(paginationControl);
  recipeView._addHandlerUpdate(updatRecipe);
  recipeView._addHandlerBookMark(controlBookMark);
  addView._addHandlerloadValues(controlAddRecipe);
}
init();






