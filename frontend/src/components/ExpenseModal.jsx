/* eslint-disable react/prop-types */
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ExpenseModal = ({ setIsModalOpen, data }) => {
  const { _id, date, amount, category, description } = data;

  return (
    <div className="fixed h-screen w-full flex justify-center items-center z-[100]">
      <div className="absolute w-full h-full inset-0 bg-black bg-opacity-20 -z-10" />
      <div className="container mx-auto px-4">
        <div className="bg-white p-4 md:p-12 shadow-light max-w-[600px] mx-auto rounded-lg relative">
          {/* close button */}
          <FaTimes
            className="absolute top-5 right-5 text-xl hover:scale-110 hover:text-primary duration-300 cursor-pointer"
            onClick={() => setIsModalOpen(false)}
          />

          <h5 className="text-center text-3xl font-bold mb-6">
            Expense Details
          </h5>
          <div className="flex flex-col gap-y-2">
            <h5 className="font-medium">
              <span className="text-primary">Date: </span>
              {date}
            </h5>
            <h5 className="font-medium capitalize">
              <span className="text-primary">Category: </span>
              {category}
            </h5>
            <h5 className="font-medium">
              <span className="text-primary">Amount: </span>
              {amount}
            </h5>
            <h5 className="font-medium">
              <span className="text-primary">Description: </span>
              {description}
            </h5>
            <div className="mt-6">
              <Link
                to={`/edit-expense/${_id}`}
                className="bg-primary text-white py-3 px-6 rounded-md"
              >
                Edit Expense
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseModal;
