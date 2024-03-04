import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import Loader from '../common/Loader';
import ExpenseModal from '../ExpenseModal';

const defaultCategories = ['food', 'transportation', 'accomodation'];

const ExpenseList = () => {
  const [userId, setUserId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [searchedText, setSearchedText] = useState('');
  const [allCategories, setAllCategories] = useState(defaultCategories);
  const [category, setCategory] = useState('');

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    setUserId(userInfo._id);
  }, []);

  // fetch categories
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

  // fetch all expenses
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['expense'],
    queryFn: async () => {
      const userInfo = await JSON.parse(localStorage.getItem('userInfo'));
      const user = userInfo?._id;
      const res = await axios.get(
        `https://expense-backend-mu.vercel.app/expense/all/${user}`
      );
      return res.data;
    },
  });

  // view expense details
  const viewExpense = (item) => {
    setModalData(item);
    setIsModalOpen(true);
  };

  // delete expense
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `https://expense-backend-mu.vercel.app/expense/${id}`
      );

      toast.success('Expense Deleted Successfully!');
      console.log(response);
    } catch (error) {
      console.error('Axios error', error);
      toast.success('Failed to delete Expense!');
    } finally {
      refetch();
    }
  };

  // filters
  const searchFilter = (item) => {
    if (
      item.description.toLowerCase().includes(searchedText.toLowerCase()) ||
      item.category.toLowerCase().includes(searchedText.toLowerCase())
    ) {
      return item;
    }
    return;
  };

  const categoryFilter = (item) => {
    if (category === '') {
      return item;
    }
    if (item.category.toLowerCase() === category.toLowerCase()) {
      return item;
    }
    return;
  };

  return (
    <div className="relative">
      {isModalOpen && (
        <ExpenseModal setIsModalOpen={setIsModalOpen} data={modalData} />
      )}

      <section className="relative py-12 md:py-20 z-10 flex justify-center">
        <div className="container mx-auto px-4">
          {/* expense list */}
          <div>
            <h2 className="text-4xl font-bold mb-4">Expense List</h2>
            {/* filters */}
            <div className="my-4 flex flex-col sm:flex-row gap-3 justify-end items-center">
              <div>
                <input
                  type="text"
                  className="bg-white shadow-light rounded-md border py-2.5 px-3"
                  placeholder="Search..."
                  value={searchedText}
                  onChange={(e) => setSearchedText(e.target.value)}
                />
              </div>
              <div>
                <select
                  name="category"
                  id="category"
                  className="bg-white shadow-light py-3 px-4 rounded-lg capitalize"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option defaultValue hidden>
                    Filter By Category
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
            </div>
            {isLoading ? (
              <div className="flex justify-center items-center text-center w-full my-20">
                <Loader size={50} />
              </div>
            ) : data.length === 0 ? (
              <div className="text-2xl font-medium my-3 text-center">
                No Expense Found!
              </div>
            ) : (
              <div className="shadow-light rounded-lg max-h-[400px] overflow-y-auto bg-white py-3 px-4">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium text-center">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Amount
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Category
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Description
                      </th>
                      <th scope="col" className="px-6 py-4">
                        View Details
                      </th>
                      <th scope="col" className="px-6 py-4 text-primary">
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data
                      .filter(searchFilter)
                      .filter(categoryFilter)
                      ?.map((item, i) => {
                        return (
                          <tr
                            className={data?.length - 1 !== i ? 'border-b' : ''}
                            key={i}
                          >
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-center">
                              {item.date}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-center">
                              ${item.amount}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-center capitalize">
                              {item.category}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-center max-w-[150px] overflow-x-hidden text-ellipsis">
                              {item.description}
                            </td>
                            <td className="flex justify-center items-center px-6 py-4">
                              <h5
                                className="font-medium bg-primary py-1.5 px-3 text-center rounded-md w-[60px] text-white hover:opacity-90 cursor-pointer"
                                onClick={() => viewExpense(item)}
                              >
                                View
                              </h5>
                            </td>
                            <td className="px-6 py-4 font-medium text-primary justify-center items-center">
                              <h5
                                className="flex justify-center items-center text-lg cursor-pointer hover:text-red-600"
                                onClick={() => handleDelete(item._id)}
                              >
                                <FaTrash />
                              </h5>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExpenseList;
