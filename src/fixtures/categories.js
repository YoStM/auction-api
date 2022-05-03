const Categories = require("../db/category_fixtures");
const { Category } = require("../db/sequelize");

function loadCategories() {
  return Categories.map((category) => {
    Category.create({
      id: category.id,
      libelle: category.libelle,
    }).then((category) => console.log(category.toJSON()));
  });
}

loadCategories();
