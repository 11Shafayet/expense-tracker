const { ObjectId } = require('mongodb');

//add expense
const addExpense = (expenseCollection) => async (req, res) => {
  const data = req.body;
  const { amount, category, date, description, userId } = data;

  if (!amount || !userId || !category || !date || !description) {
    res.status(400).send('Please fill up all the fields!');
    return;
  }

  await expenseCollection.insertOne(data);
  res.send(data);
};

// get all expense
const getAllExpense = (expenseCollection) => async (req, res) => {
  const { id } = req.params;
  if (id) {
    const allExpense = await expenseCollection.find({ userId: id }).toArray();

    res.status(200).json(allExpense);
  } else {
    res.status(400).json({ message: 'Id not found' });
  }
};

const getSingleExpense = (expenseCollection) => async (req, res) => {
  const { id } = req.params;
  if (id) {
    const expense = await expenseCollection
      .find({ _id: new ObjectId(id) })
      .toArray();

    res.status(200).json(expense);
  } else {
    res.status(400).json({ message: 'Something went wrong!' });
  }
};

//update expense
const updateExpense = (expenseCollection) => async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  if (id && data) {
    const updatedExpense = await expenseCollection.findOneAndUpdate(
      {
        _id: new ObjectId(id),
      },
      { $set: data },
      { returnDocument: 'after' } // This ensures that the returned result is the updated document
    );

    res.status(200).json(updatedExpense);
  } else {
    res.status(400).json({ message: 'Unauthorized user!' });
  }
};

// delete expense
const deleteExpense = (expenseCollection) => async (req, res) => {
  const { id } = req.params;

  if (id) {
    const result = await expenseCollection.findOneAndDelete({
      _id: new ObjectId(id),
    });

    res.status(200).json(result);
  } else {
    res.status(400).json({ message: 'Unauthorized user!' });
  }
};

module.exports = {
  addExpense,
  getAllExpense,
  getSingleExpense,
  updateExpense,
  deleteExpense,
};
