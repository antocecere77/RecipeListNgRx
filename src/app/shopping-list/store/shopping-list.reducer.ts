import { Action } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';
import { ShoppingListAction } from './shopping-list.actions';

const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ]
};

export function shoppingListReducer(state = initialState, action: ShoppingListAction) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
      case ShoppingListActions.ADD_INGREDIENTS:
        return {
          ...state, // Copy old state
          ingredients: [...state.ingredients, ...action.payload]
        };
      case ShoppingListActions.UPDATE_INGREDIENT:
        const ingredient = state.ingredients[action.payload.index];
        const updatedIngredient = {
          ...ingredient, // Copy all ingredient properties
          ...action.payload.ingredient // Overwrite properties
        };

        const updateIngredients = [...state.ingredients];
        updateIngredients[action.payload.index] = updatedIngredient;

        return {
            ...state,
            ingredients: updateIngredients
          };
      case ShoppingListActions.DELETE_INGREDIENT:
        return {
          ...state,
          ingredients: state.ingredients.filter((ig, igIndex) => {
            return igIndex !== action.payload;
          })
        };
      default:
        return state;
  }
}
