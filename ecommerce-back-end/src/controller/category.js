const slugify = require('slugify');
const Category = require('../models/category');

function createCategories(categories, parentId = null) {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }

  for (let cat of category) {
    categoryList.push({
      _id: cat._id,
      name: cat.name,
      slug: cat.slug,
      children: createCategories(categories, cat._id),
    });
  }

  return categoryList;
}

exports.addCategory = (req, res) => {
  const categoryObj = {
    name: req.body.name,
    slug: slugify(req.body.name),
  };

  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
  }

  const category = new Category(categoryObj);
  category.save((error, category) => {
    if (error) return res.status(400).json({ message: error });
    if (category) res.status(201).json({ category });
  });
};

exports.getCategories = (req, res) => {
  Category.find().exec((error, categories) => {
    if (error) return res.status(400).json({ message: error });
    if (categories) {
      const categoryList = createCategories(categories);
      res.status(200).json({ categoryList });
    }
  });
};