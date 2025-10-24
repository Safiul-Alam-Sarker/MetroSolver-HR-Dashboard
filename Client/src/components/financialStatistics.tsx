const FinancialStatistics = () => {
  return (
    <div className="px-4 sm:px-5 w-full md:w-[45%] min-h-[400px]">
      <div className="py-6 lg:py-10 gap-4">
        <div className="flex items-center justify-between py-4 lg:py-5">
          <h1 className="font-medium text-xl sm:text-[25px] leading-[26px] pb-0 lg:pb-5">
            Financial & Sales Statistic
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-6">
          <div className="border border-black/60 rounded-xl p-4 sm:p-6 h-[120px] sm:h-[150px] flex flex-col justify-between">
            <div className="text-gray-600 mb-2">Total Earnings</div>
            <div className="text-xl xl:text-3xl font-bold">€8,593.65</div>
          </div>

          <div className="border border-black/60 rounded-xl p-4 sm:p-6 h-[120px] sm:h-[150px] flex flex-col justify-between">
            <div className="text-gray-600 text-sm mb-2">Total Expenses</div>
            <div className="text-xl xl:text-3xl font-bold">€3,570.50</div>
          </div>
        </div>

        <div className="border border-black/60 rounded-xl p-4 sm:p-6 min-h-[350px] sm:h-[400px] flex flex-col justify-between">
          <h2 className="lg:text-3xl font-bold mb-4">Total Sales</h2>
          <div className="text-black/60 text-sm mb-6">
            Improved from last month
          </div>

          <div className="mb-6">
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-blue-500 text-white absolute left-1/2 transform -translate-x-1/2 -translate-y-2 z-10">
                  50%
                </div>
              </div>
              <div className="overflow-hidden h-3 mb-4 text-xs flex rounded bg-gray-200">
                <div
                  style={{ width: "50%" }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-purple-800 to-purple-600"
                ></div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <span className="font-bold text-2xl xl:text-3xl">€456,780</span>
            <span className="text-green-600 xl:text-lg font-medium">
              +15.3% this quarter
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialStatistics;
