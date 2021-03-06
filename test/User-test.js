const chai = require("chai");
const expect = chai.expect;
const User = require('../src/User');


describe('User class', () => {
  let userElle, applePie, beefNoodle;

  beforeEach(() => {
    userElle = new User({
      name: 'Elle', 
      id: 1, 
      pantry: [
        {ingredient: 320, amount: 6}, 
        {ingredient: 624, amount: 10}, 
        {ingredient: 620, amount: 8}
      ]
    });
    
    applePie = {
      id: 1, 
      img: 'https://spoonacular.com/recipeImages/595736-556x370.jpg', 
      ingredients: [
        {
          id: 320, 
          quantity: {
            amount: 6, 
            unit: 'unit'
          }
        },
        {
          id: 410,
          quantity: {
            amount: 7,
            unit: 'tbs'
          }
        }
      ],
      instruction: [
        {instruction: 'step 1'}, 
        {instruction: 'step 2'},
        {instruction: 'step 3'}
      ],
      name: 'apple pie',
      tags: ['sweet', 'desert']
    };
    beefNoodle = {
      id: 2, 
      img: 'https://spoonacular.com/recipeImages/595736-556x370.jpg', 
      ingredients: [
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
      instruction: [
        {instruction: 'step 1'}, 
        {instruction: 'step 2'},
        {instruction: 'step 3'}
      ],
      name: 'beef noodle',
      tags: ['flour made', 'main dish', 'hot dish']
    }
  })

  describe('initialize', () => {
    it('should be a function', () => {
      expect(User).to.be.a('function');
    })

    it('should be an instance of the User class', () => {
      expect(userElle).to.be.an.instanceof(User);
    })

    it('should have a name', () => {
      expect(userElle.name).to.equal('Elle');
    })

    it('should have an id', () => {
      expect(userElle.id).to.equal(1);
    })

    it('should have a pantry', () => {
      expect(userElle.pantry).to.deep.equal({pantry: [
        {ingredient: 320, amount: 6}, 
        {ingredient: 624, amount: 10}, 
        {ingredient: 620, amount: 8}
      ]});
    })

    it('should have no favorite recipe by default', () => {
      expect(userElle.favoriteRecipes).to.deep.equal([]);
    })

    it('should have no recipe chosen to cook by default', () => {
      expect(userElle.recipesToCook).to.deep.equal([]);
    })
  })

  describe('methods', () => {

    it('should have favorite recipe if passed in', () => {
      userElle.addRecipe('favoriteRecipes', applePie);

      expect(userElle.favoriteRecipes).to.deep.equal([applePie]);
    })

    it('should have recipes to cook if passed in', () => {
      userElle.addRecipe('recipesToCook', applePie);

      expect(userElle.recipesToCook).to.deep.equal([applePie]);
    })

    it('should be able to filter favorite recipes by tag', () => {
      userElle.addRecipe('favoriteRecipes', applePie);
      userElle.addRecipe('recipesToCook', beefNoodle);

      let recipes = userElle.filterRecipesByTag('favoriteRecipes', 'sweet');

      expect(recipes).to.deep.equal([applePie]);
    })

    it('should be able to filter recipes to cook by tag', () => {
      userElle.addRecipe('favoriteRecipes', applePie);
      userElle.addRecipe('recipesToCook', beefNoodle);

      let recipes = userElle.filterRecipesByTag('recipesToCook', 'main dish');

      expect(recipes).to.deep.equal([beefNoodle]);
    })

    it('should be able to search within favorite recipes by recipe name', () => {
      userElle.addRecipe('favoriteRecipes', applePie);
      userElle.addRecipe('recipesToCook', beefNoodle);

      let result = userElle.searchFavoriteByName('apple pie');

      expect(result).to.deep.equal([applePie]);
    })

    it('should be able to search within favorite recipes by ingredient id', () => {
      userElle.addRecipe('favoriteRecipes', applePie);
      userElle.addRecipe('favoriteRecipes', beefNoodle);

      let result = userElle.searchFavoriteByIngredients([410]);

      expect(result).to.deep.equal([applePie, beefNoodle]);
    })

    it('should search within favorite recipes by multiple ingredients id', () => {
      userElle.addRecipe('favoriteRecipes', applePie);
      userElle.addRecipe('favoriteRecipes', beefNoodle);

      let result = userElle.searchFavoriteByIngredients([302, 320]);

      expect(result).to.deep.equal([applePie, beefNoodle]);
    })

  })
})