/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import AddCategory from '../components/AddCategory';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Loader from '../components/common/Loader';

const defaultCategories = ['food', 'transportation', 'accomodation'];

const AddExpense = () => {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [addCategory, setAddCategory] = useState(false);
  const [allCategories, setAllCategories] = useState(defaultCategories);
  const [userId, setUserId] = useState(null);

  const fetchCategories = async () => {
    const res = await axios.get(
      `https://expense-backend-mu.vercel.app/category/${userId}`
    );

    if (res) {
      const newCategories = res.data.map((item) => item.category);
      const uniqueNewCategories = newCategories.filter(
        (category) => !allCategories.includes(category)
      );
      setAllCategories((prevCategories) => [
        ...prevCategories,
        ...uniqueNewCategories,
      ]);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchCategories();
    }
  }, [userId]);

  // add expense
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    setUserId(userInfo._id);
  }, []);

  const addData = async () => {
    try {
      const result = await axios.post(
        `https://expense-backend-mu.vercel.app/expense`,
        {
          amount,
          category,
          date,
          description,
          userId,
        }
      );
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const { data, mutateAsync } = useMutation({
    mutationFn: addData,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!amount || !category || !date || !description) {
      toast.warning('Please fill all the fields!');
      setLoading(false);
      return;
    } else {
      try {
        await mutateAsync();
        setLoading(false);
        toast.success('Expense added successfully!');
      } catch (error) {
        console.error('Error adding new Expense:', error);
        setLoading(false);
        toast.warning('Failed To add new Expense!');
      }
    }
  };

  return (
    <div className="relative">
      {/* add category modal */}
      {addCategory && (
        <AddCategory
          setAddCategory={setAddCategory}
          fetchCategories={fetchCategories}
        />
      )}
      <section className="py-12 md:py-20 min-h-screen flex justify-center items-center relative">
        {/* expense input form */}
        <div className="container mx-auto px-4">
          <div className="bg-white shadow-light p-4 md:p-12 max-w-[650px] mx-auto rounded-xl">
            <h5 className="text-center text-3xl font-bold mb-6">
              Expense Tracker
            </h5>
            <form onSubmit={handleSubmit}>
              {/* amount */}
              <div className="flex flex-col gap-y-2 mb-4">
                <label htmlFor="amount" className="font-medium pl-1">
                  Enter Amount
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  placeholder="E.G: 1000"
                  className="bg-white shadow-light py-3 px-4 rounded-lg"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              {/* category */}
              <div className="flex flex-col gap-y-2 mb-4">
                <label htmlFor="category" className="font-medium pl-1">
                  Select Category
                </label>
                <select
                  name="category"
                  id="category"
                  className="bg-white shadow-light py-3 px-4 rounded-lg"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option defaultValue hidden>
                    Select Your Category
                  </option>
                  {allCategories?.map((item, i) => {
                    return (
                      <option className="capitalize" value={item} key={i}>
                        {item}
                      </option>
                    );
                  })}
                </select>
              </div>
              {/* add new category */}
              <h6
                className="text-end text-sm -mt-3 mb-3 mr-2 font-medium hover:underline hover:text-primary duration-300 cursor-pointer"
                onClick={() => setAddCategory(true)}
              >
                Add New Category
              </h6>
              {/* date */}
              <div className="flex flex-col gap-y-2 mb-4">
                <label htmlFor="date" className="font-medium pl-1">
                  Enter Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  className="bg-white shadow-light py-3 px-4 rounded-lg"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              {/* description */}
              <div className="flex flex-col gap-y-2 mb-4">
                <label htmlFor="description" className="font-medium pl-1">
                  Enter Description
                </label>
                <textarea
                  type="text"
                  id="description"
                  name="description"
                  rows="4"
                  className="bg-white shadow-light py-3 px-4 rounded-lg"
                  placeholder="EG: Expense in house rent"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* submit button */}

              <button
                type="submit"
                className="bg-primary rounded-md py-2 px-6 text-white font-medium mt-6 hover:opacity-90"
              >
                {!loading ? 'Add Expense' : <Loader type="sync" size={20} />}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddExpense;
