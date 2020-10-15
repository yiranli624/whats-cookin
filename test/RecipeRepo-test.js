const chai = require("chai");
const expect = chai.expect;
const RecipeRepo = require('../src/RecipeRepo');
const Recipe = require('../src/Recipe');

describe('Recipe class', () => {
  let recipes, applePie, beefNoodle;
  beforeEach( () => {
    recipes = new RecipeRepo();
    applePie = new Recipe(
      1, 
      'https://spoonacular.com/recipeImages/595736-556x370.jpg', 
      [
        {
          id: 320, 
          quantity: {
            amount: 6, 
            unit: 'unit'
            }
        },
        {
          id: 410,
          quantity:{
            amount: 7,
            unit: 'tbs'
          }
        }
      ],
      [
        {instruction: 'step 1'}, 
        {instruction: 'step 2'},
        {instruction: 'step 3'}
      ],
      'apple pie',
      ['sweet', 'desert']
    );
    beefNoodle = new Recipe(
      2, 
      'https://spoonacular.com/recipeImages/595736-556x370.jpg', 
      [
        {
          id: 302, 
          quantity: {
            amount: 10, 
            unit: 'cup'
            }
        },
        {
          id: 410,
          quantity: {
            amount: 3,
            unit: 'tbs'
          }
        }
      ],
      [
        {instruction: 'step 1'}, 
        {instruction: 'step 2'},
        {instruction: 'step 3'}
      ],
      'beef noodle',
      ['flour made', 'main dish', 'hot dish']
    )
  })

  describe('Initialize', () => {

    it('should be a function', () => {
      expect(RecipeRepo).to.be.a('function');
    })

    it('should be an instance of RecipeRepo class', () => {
      expect(recipes).to.be. an.instanceof(RecipeRepo);
    })

    it('should have no recipes by default', () => {
      expect(recipes.recipesArray).to.deep.equal([]);
    })

    it('should hold a recipe that\'s passed in', () => {
      recipes = new RecipeRepo([applePie]);

      expect(recipes.recipesArray).to.deep.equal([applePie]);
    })

    it('should hold more recipes if passed in', () => {
      recipes = new RecipeRepo([applePie, beefNoodle]);

      expect(recipes.recipesArray).to.deep.equal([applePie, beefNoodle]);
    })
  })
  describe('methods', () => {

    it('should return a recipe if that recipe is chosen', () => {
      recipes.returnCurrentRecipe(applePie);

      expect(recipes.currentRecipe).to.deep.equal(applePie);
    })

    it('should be able to search by tag', () => {
      recipes = new RecipeRepo([applePie, beefNoodle]);
      let result = recipes.searchByTag('sweet');
      
      expect(result).to.deep.equal(applePie);
    })

    it('should return undefined if tag is not found', () => {
      recipes = new RecipeRepo([applePie, beefNoodle]);
      let result = recipes.searchByTag('beverage');
      
      expect(result).to.deep.equal(undefined);
    })

    it('should be able to search by an ingredient', () => {
      recipes = new RecipeRepo([applePie, beefNoodle]);
      let result = recipes.searchByIngredient(410);

      expect(result).to.deep.equal([applePie, beefNoodle]);
    })
  })

})