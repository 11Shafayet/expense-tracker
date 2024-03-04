import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const BarChartCom = () => {
  const [allData, setAllData] = useState([]);

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

  useEffect(() => {
    if (data) {
      setAllData((prevData) => {
        let updatedData = [...prevData];

        data.forEach((element) => {
          const existingIndex = updatedData.findIndex(
            (item) => item.category === element.category
          );

          if (existingIndex !== -1) {
            // If category already exists, merge objects and add amounts
            updatedData[existingIndex] = {
              ...updatedData[existingIndex],
              amount:
                updatedData[existingIndex].amount + parseFloat(element.amount),
            };
          } else {
            // If category doesn't exist, add a new object
            updatedData.push({
              amount: parseFloat(element.amount),
              category: element.category.toLowerCase(),
              id: element._id,
            });
          }
        });

        return updatedData;
      });
    }
  }, [data]);

  useEffect(() => {
    console.log(allData);
  }, [allData]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={allData}>
        <Bar type="monotone" dataKey="amount" stroke="#8884d8" />
        <CartesianGrid stroke="#ddd" strokeDasharray="5 5" />
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartCom;
