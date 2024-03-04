const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');

//register user
const registerUser = (userCollection) => async (req, res) => {
  const data = req.body;
  const { name, email, password } = data;

  if (!name || !email || !password) {
    res.status(400).send('Please fill up all the fields!');
    return;
  }

  const isUserExists = await userCollection.findOne({ email });

  if (isUserExists) {
    res.status(400).send('User already exists with this email!');
    return;
  }

  const salt = await bcrypt.genSalt(10);
  encryptedPassword = await bcrypt.hash(password, salt);
  const newData = {
    name,
    email,
    password: encryptedPassword,
    role: 'user',
  };

  const result = await userCollection.insertOne(newData);
  res.send(newData);
};

// login user
const loginUser = (userCollection) => async (req, res) => {
  const { email, password } = req.body;
  const isUserExists = await userCollection.findOne({ email });

  if (isUserExists) {
    const matchPassword = await bcrypt.compare(password, isUserExists.password);

    if (matchPassword) {
      res.status(200);
      res.json({
        _id: isUserExists._id,
        name: isUserExists.name,
        email: isUserExists.email,
        role: isUserExists.role,
      });
    } else {
      res.status(400).send('Password does not match!');
      return;
    }
  } else {
    res.status(400).send('User does not exist');
    return;
  }
};

// get users
const getAllUsers = (userCollection) => async (req, res) => {
  const { id } = req.params;
  const admin = await userCollection.findOne({ _id: new ObjectId(id) });
  if (admin) {
    const allUsers = await userCollection.find().toArray();

    res.status(200).json(allUsers);
  } else {
    res.status(400).json({ message: 'Unauthorized user!' });
  }
};

//update user's role
const updateUserRole = (userCollection) => async (req, res) => {
  const { userId, updatedRole } = req.body;

  if (userId && updatedRole) {
    const updatedUser = await userCollection.findOneAndUpdate(
      {
        _id: new ObjectId(userId),
      },
      { $set: { role: updatedRole } },
      { returnDocument: 'after' } // This ensures that the returned result is the updated document
    );

    res.status(200).json(updatedUser);
  } else {
    res.status(400).json({ message: 'Unauthorized user!' });
  }
};

// DELETE A USER
const deleteUser = (userCollection) => async (req, res) => {
  const { id } = req.params;

  if (id) {
    const result = await userCollection.findOneAndDelete({
      _id: new ObjectId(id),
    });

    res.status(200).json(result);
  } else {
    res.status(400).json({ message: 'Unauthorized user!' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  updateUserRole,
  deleteUser,
};
