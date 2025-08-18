import React from "react";

const PaymentCard = () => {
  const [paymentType, setPaymentType] = React.useState("");
  console.log(paymentType);

  return (
    <div className="w-[35%] mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="space-y-8">
        {/* Payment Type Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">Add a Plan</h3>
          <div className="flex gap-3">
            <button 
              onClick={() => setPaymentType("one-time")}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                paymentType === "one-time" 
                  ? "bg-blue-600 text-white" 
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              One Time
            </button>
            <button 
              onClick={() => setPaymentType("Recurring")}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                paymentType === "Recurring" 
                  ? "bg-blue-600 text-white" 
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Recurring
            </button>
          </div>

          {/* Plan Details */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Plan name
              </label>
              <input 
                type="text" 
                placeholder="Enter Plan Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                LKR
              </label>
              <input 
                type="text" 
                placeholder="Enter a amount"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Strikeout Price Section */}
            <div className="space-y-3 p-4 bg-gray-50 rounded-md">
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <p className="text-sm text-gray-700">Show strikeout price</p>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Add a Price
                </label>
                <input 
                  type="text" 
                  placeholder="Add strikeout price"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Expires in days
                </label>
                <input 
                  type="text" 
                  placeholder="Eg. 365"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Production Details Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">Add Production Details</h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input 
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea 
                placeholder="Enter a description"
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
              ></textarea>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Additional Information
              </label>
              <textarea 
                placeholder="Enter a description"
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;