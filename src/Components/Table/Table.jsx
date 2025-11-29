import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DeleteIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
  </svg>
);
const EditIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
  </svg>
);
const VisibilityIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
  </svg>
);

const Button = ({ children, onClick, color = 'primary', className = '' }) => {
  const baseStyle = "px-4 py-2 rounded-lg font-semibold transition duration-150";
  let colorStyle = "";

  if (color === 'primary') {
    colorStyle = "bg-indigo-600 text-white hover:bg-indigo-700";
  } else if (color === 'error') {
    colorStyle = "bg-red-600 text-white hover:bg-red-700";
  } else if (color === 'secondary') {
    colorStyle = "bg-gray-200 text-gray-800 hover:bg-gray-300";
  }

  return (
    <button onClick={onClick} className={`${baseStyle} ${colorStyle} ${className}`}>
      {children}
    </button>
  );
};

export default function UserOrders({ orders, rowsPerPage = 5, showPagination = true }) {
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [currentRowsPerPage, setCurrentRowsPerPage] = useState(rowsPerPage);

  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setCurrentRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setOpen(true);
  };

  const confirmDelete = () => {
    setOpen(false);
    console.log(`Deleting order with ID: ${deleteId}`); 
    setDeleteId(null);
  };

  const handleEdit = (id) => {
    navigate(`/profile/edit-order/${id}`);
  };

  const handleDetails = (id) => {
    navigate(`/profile/order-details/${id}`);
  };

  const totalOrders = Array.isArray(orders) ? orders.length : 0;
  const startIndex = page * currentRowsPerPage;
  const endIndex = page * currentRowsPerPage + currentRowsPerPage;

  const displayedOrders = showPagination
    ? orders.slice(startIndex, endIndex)
    : orders.slice(0, rowsPerPage);

  const pageCount = Math.ceil(totalOrders / currentRowsPerPage);

  return (
    <>
      <div className="max-w-7xl mx-auto mt-8 p-4 bg-white rounded-xl shadow-lg overflow-x-auto rtl">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                #
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                شماره سفارش
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                تاریخ ثبت سفارش
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                مبلغ قابل پرداخت
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                مبلغ کل
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                وضعیت
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                عملیات
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {displayedOrders.length > 0 ? (
              displayedOrders.map((order, index) => (
                <tr
                  key={order.id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {showPagination ? startIndex + index + 1 : index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.orderNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                    {order.orderDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600 text-right">
                    {order.payableAmount.toLocaleString("fa-IR")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right">
                    {order.totalAmount.toLocaleString("fa-IR")} تومان
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === 'تکمیل شده' ? 'bg-green-100 text-green-800' :
                        order.status === 'در انتظار' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2 space-x-reverse">
                      <button
                        className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-indigo-50 transition"
                        onClick={() => handleDetails(order.id)}
                        title="جزئیات"
                      >
                        <VisibilityIcon />
                      </button>
                      <button
                        className="text-yellow-600 hover:text-yellow-900 p-1 rounded-full hover:bg-yellow-50 transition"
                        onClick={() => handleEdit(order.id)}
                        title="ویرایش"
                      >
                        <EditIcon />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50 transition"
                        onClick={() => handleDelete(order.id)}
                        title="حذف"
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                  هیچ سفارشی یافت نشد
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {showPagination && totalOrders > 0 && (
          <div className="flex justify-between items-center p-4 border-t border-gray-200 mt-4 text-sm text-gray-600" dir="ltr">
            
            <div className="flex items-center space-x-2">
              <span className="ml-2 rtl:mr-2 rtl:ml-0">تعداد ردیف‌ها در هر صفحه:</span>
              <select
                value={currentRowsPerPage}
                onChange={handleChangeRowsPerPage}
                className="form-select border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                {[5, 10, 25].map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            
            <div>
              {`${Math.min(startIndex + 1, totalOrders)}–${Math.min(endIndex, totalOrders)} از ${totalOrders}`}
            </div>
            
            <div className="flex items-center space-x-2 space-x-reverse">
              <button
                onClick={() => handleChangePage(page - 1)}
                disabled={page === 0}
                className={`p-2 rounded-full transition ${page === 0 ? 'text-gray-400 cursor-not-allowed' : 'text-indigo-600 hover:bg-gray-100'}`}
                title="صفحه قبل"
              >
                <svg className="w-5 h-5 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </button>
              
              <span className="text-gray-800 font-medium">صفحه {page + 1} از {pageCount}</span>
              
              <button
                onClick={() => handleChangePage(page + 1)}
                disabled={page >= pageCount - 1}
                className={`p-2 rounded-full transition ${page >= pageCount - 1 ? 'text-gray-400 cursor-not-allowed' : 'text-indigo-600 hover:bg-gray-100'}`}
                title="صفحه بعد"
              >
                <svg className="w-5 h-5 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
              </button>
            </div>
          </div>
        )}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-right overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <DeleteIcon className="text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:mr-4 sm:text-right">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      تأیید حذف
                    </h3>
                  </div>
                </div>
              </div>
              <div className="bg-white px-4 pt-0 pb-4 sm:p-6 sm:pt-0">
                <p className="text-sm text-gray-500">
                  آیا مطمئن هستید که می‌خواهید این سفارش را حذف کنید؟ این عمل قابل بازگشت نیست.
                </p>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <Button 
                  onClick={confirmDelete} 
                  color="error"
                  className="w-full sm:w-auto sm:ml-3 mb-2 sm:mb-0"
                >
                  حذف
                </Button>
                <Button 
                  onClick={() => setOpen(false)} 
                  color="secondary"
                  className="w-full sm:w-auto"
                >
                  لغو
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}