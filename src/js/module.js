import { async } from "regenerator-runtime";
import { getJson, sendJson } from './helper';
import { API_URL , RES_PER_PAGE , START_PAGE , SERV_NUM, KEY} from "./config";

export let state ={
    recipe:{},
    search: '',
    result:[],
    page:START_PAGE,
    resultPerPage:RES_PER_PAGE,
    updateRecipe:{},
    newServing:SERV_NUM,
    bookMarks:[],
};

const creatRecipeObject = function(data){
    let {recipe} = data.data;
        return {
          id:recipe.id,
          title:recipe.title,
          publisher:recipe.publisher,
          sourceUrl:recipe.source_url,
          image:recipe.image_url,
          servings:recipe.servings,
          cookTime:recipe.cooking_time,
          ingredients:recipe.ingredients,
          ...(recipe.key && {key: recipe.key}),
        }
}
export const loadRecipe = async function(id){
    try{
        const data = await getJson(`${API_URL}/${id}?key=${KEY}`);
        console.log(data);
        state.recipe = creatRecipeObject(data);
        if(state.bookMarks.some(book => book.id===id))
            state.recipe.bookMark=true ;
            else 
                state.recipe.bookMark=false ;
        console.log(state.recipe);
    }catch(err){
        throw err;
    }
}

const persistBookmarks = function(){
    localStorage.setItem('bookmarks', JSON.stringify(state.bookMarks));
}
export const loadSearchResult = async function(value){
    const data = await getJson(`${API_URL}?search=${value}&key=${KEY}`);
    state.result = data.data.recipes.map(rec => {
        return {
          id:rec.id,
          title:rec.title,
          publisher:rec.publisher,
          image:rec.image_url,
          ...(rec.key && {key: rec.key}),
        }
    })
    console.log(state.result);
}
export const getSearchPage = function (page = state.page){
    state.page = page;
    const start = (page - 1)*state.resultPerPage;
    const end = page * state.resultPerPage;
    return state.result.slice(start, end);
}
export const updateRecipe = function (newServing=state.recipe.servings){
   
    console.log(state.recipe);
    console.log(`new serv= ${newServing}`);
    state.recipe.ingredients.forEach(ing => {
        ing.quantity = (ing.quantity * newServing)/state.recipe.servings ;
    })
    state.recipe.servings= newServing;
    console.log(state.recipe);
}
export const updateBookMarks =function (id){

    if(!state.bookMarks.some(book => book.id===id)){
        state.recipe.bookMark=true ;
        state.bookMarks.push(state.recipe);
        persistBookmarks();
    }
        else {
            state.recipe.bookMark=false ;
            const index = state.bookMarks.findIndex(book => book.id === id);
            state.bookMarks.splice(index, 1);
            persistBookmarks();
        }
    console.log(state.recipe);
}

const init = function(){
    const storage = localStorage.getItem('bookmarks');
    if(storage)
    state.bookMarks= JSON.parse(storage);
    console.log(state.bookMarks);
}
init();

const clearBookmarks =function(){
    localStorage.clear('bookmarks');
}
// clearBookmarks();

export const uploadrecipe= async function(newRecipe){
    try{

        const ingredients= Object.entries(newRecipe)
        .filter(entry => 
            entry[0].startsWith('ingredient') && entry[1] !== ''
        )
                .map(ing => {
                    const arrIng = ing[1].replaceAll(' ','').split(',');
                    if(arrIng.length !== 3) throw new Error ('wrong ingredients format , please use the correct format');
                const [quantity, unit, description]= arrIng;
                return {quantity: quantity?+quantity:null,unit, description};
            })
            
            const recipe = {
                    title:newRecipe.title,
                    publisher:newRecipe.publisher,
                    source_url:newRecipe.sourceUrl,
                    image_url:newRecipe.image,
                    servings:newRecipe.servings,
                    cooking_time:newRecipe.cookingTime,
                    ingredients,
            }
            console.log(recipe);
            const data = await sendJson(`${API_URL}?key=${KEY}`,recipe);
            state.recipe = creatRecipeObject(data);
            updateBookMarks(state.recipe.id)
            console.log(state.recipe);
            console.log(state.bookMarks);
    }catch(err){
        throw err;
    }
}