const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model'); 
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(async () => {
    // Run your code here, after you have insured that the connection was made
    try {
      // CRIAR UM DOCUMENTO 
      const createRecipe = await Recipe.create({
        "title": "Fricassê de Frango",
        "level": "Easy Peasy",
        "ingredients": [
          "1 peito de frango",
          "1 pacote de milho",
          "2cx de creme de leite ",
          "1 requeijão cremoso",
          "Batata palha",
          "Queijo"
        ],
        "cuisine": "Brasileiro",
        "dishType": "main_course",
        "image": "https://i2.wp.com/www.receitamaneira.com.br/wp-content/uploads/2020/11/fricasse-frango-facil.jpg?w=770&ssl=1",
        "duration": 40,
        "creator": "Karen Araujo"
      });
      console.log(createRecipe.title)
  
      // Inserindo várias receitas 
      const insertManyRecipes = await Recipe.insertMany(data)
  
      // Atualizando 
      const updatedRecipe = await Recipe.findOneAndUpdate(
        {title: "Asian Glazed Chicken Thighs"},
        {$set: {duration: 50}},
        {new: true}
      );
      console.log("Produto atualizado =>", updatedRecipe )
  
      // Deletando 
      const deleteRecipes = await Recipe.deleteOne(
        {title: "Carrot Cake"},
      );
  
      console.log('PRODUTO DELETADO =>', deleteRecipes )
      
    } catch(err){
      console.log(err)
    }
    

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
