/* eslint-disable react/prop-types */
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Loader from './common/Loader';

const AddCategory = ({ setAddCategory, fetchCategories }) => {
  const [loading, setLoading] = useState(false);
  const [newCat, setNewCat] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    setUserId(userInfo._id);
  }, []);

  const addData = async () => {
    try {
      const result = await axios.post(
        `https://expense-backend-mu.vercel.app/category`,
        {
          category: newCat,
          userId,
        }
      );
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  // eslint-disable-next-line no-unused-vars
  const { data, mutateAsync } = useMutation({
    mutationFn: addData,
  });

  const handleNewCat = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!newCat || !userId) {
      toast.warning('Please fill all the fields!');
      setLoading(false);
      return;
    } else {
      try {
        await mutateAsync();
        setLoading(false);
        toast.success('New Category added successfully!');
        fetchCategories();
      } catch (error) {
        console.error('Error adding new Category:', error);
        setLoading(false);
        toast.warning(error.response.data);
      }
    }
  };
  return (
    <div className="fixed h-screen w-full flex justify-center items-center z-[100]">
      <div className="absolute w-full h-full inset-0 bg-black bg-opacity-20 -z-10" />
      <div className="container mx-auto px-4">
        <div className="bg-white p-4 md:p-12 shadow-light max-w-[600px] mx-auto rounded-lg relative">
          {/* close button */}
          <FaTimes
            className="absolute top-5 right-5 text-xl hover:scale-110 hover:text-primary duration-300 cursor-pointer"
            onClick={() => setAddCategory(false)}
          />

          <h5 className="text-center text-3xl font-bold mb-6">
            Add New Category
          </h5>
          <form onSubmit={handleNewCat}>
            <label htmlFor="newCat" className="font-medium pl-1">
              Enter Category Name
            </label>
            <input
              type="text"
              id="newCat"
              name="newCat"
              placeholder="E.G: Food"
              className="bg-white shadow-light py-3 px-4 rounded-lg w-full mt-2"
              value={newCat}
              onChange={(e) => setNewCat(e.target.value)}
            />
            <button
              type="submit"
              className="bg-primary rounded-md py-2 px-6 text-white font-medium mt-6 hover:opacity-90"
            >
              {!loading ? 'Add New Category' : <Loader type="sync" size={20} />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
