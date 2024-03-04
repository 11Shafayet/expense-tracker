import BarChartCom from '../BarChart';

const Report = () => {
  return (
    <section className="relative z-10 flex justify-center">
      <div className="container mx-auto px-4">
        <div className="w-full">
          <h2 className="text-4xl font-bold mb-4">Expense Summary</h2>
          <div className="w-full h-[400px] my-8">
            <BarChartCom />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Report;
