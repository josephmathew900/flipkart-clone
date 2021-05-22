const shortid = require('shortid');
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
      parentId: cat.parentId,
      type: cat.type,
      children: createCategories(categories, cat._id),
    });
  }

  return categoryList;
}

exports.addCategory = (req, res) => {
  const categoryObj = {
    name: req.body.name,
    slug: `${slugify(req.body.name)}-${shortid.generate()}`,
  };

  if (req.file) {
    categoryObj.categoryImage =
      process.env.API + '/public/' + req.file.filename;
  }

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

exports.updateCategories = async (req, res) => {
  const { _id, name, parentId, type } = req.body;
  const updatedCategories = [];
  if (name instanceof Array) {
    for (let i = 0; i < name.length; i++) {
      const category = {
        name: name[i],
        type: type[i],
      };
      if (parentId[i]) {
        category.parentId = parentId[i];
      }

      const updatedCategory = await Category.findOneAndUpdate(
        { _id: _id[i] },
        category,
        { new: true }
      );
      updatedCategories.push(updatedCategory);
    }
    return res.status(201).json({ updatedCategories });
  } else {
    const category = {
      name: name,
      type: type,
    };
    if (parentId) {
      category.parentId = parentId;
    }
    const updatedCategory = await Category.findOneAndUpdate({ _id }, category, {
      new: true,
    });
    return res.status(201).json({ updatedCategory });
  }
};

exports.deleteCategories = async (req, res) => {
  const { ids } = req.body.payload;
  const deletedCategories = [];
  for (let i = 0; i < ids.length; i++) {
    const deleteCategory = await Category.findOneAndDelete({ _id: ids[i] });
    deletedCategories.push(deleteCategory);
  }

  if (deletedCategories.length === ids.length) {
    res.status(200).json({ message: 'Categories removed' });
  } else {
    res.status(400).json({ message: 'Something went wrong' });
  }
};
