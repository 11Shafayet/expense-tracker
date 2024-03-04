const { ObjectId } = require('mongodb');

//add category
const addCategory = (categoryCollection) => async (req, res) => {
  const data = req.body;
  const { category, userId } = data;
  const newCat = category.toLowerCase();
  const newData = {
    category: newCat,
    userId,
  };

  const categories = await categoryCollection
    .find({ userId: new ObjectId(userId) })
    .toArray();

  const categoryExist = categories.some(
    (item) => item.category.toLowerCase() === category.toLowerCase()
  );

  if (!category || !userId) {
    res.status(400).send('Please fill up all the fields!');
    return;
  } else if (
    categoryExist ||
    category.toLowerCase() === 'food' ||
    category.toLowerCase() === 'transportation' ||
    category.toLowerCase() === 'accommodation'
  ) {
    res.status(400).send('Category Already exists!');
    return;
  }

  await categoryCollection.insertOne(newData);
  res.send(newData);
};

// get categories
const getAllCategory = (categoryCollection) => async (req, res) => {
  const { id } = req.params;
  console.log(id);
  if (id) {
    const allCategory = await categoryCollection.find({ userId: id }).toArray();

    res.status(200).json(allCategory);
  } else {
    res.status(400).json({ message: 'Id not found' });
  }
};

module.exports = { addCategory, getAllCategory };
