import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  TablePagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";

export default function UserOrders({orders, rowsPerPage = 5, showPagination = true }) {
  const navigate = useNavigate();

  // State برای صفحه‌بندی (فقط در صورت showPagination=true)
  const [page, setPage] = useState(0);
  const [currentRowsPerPage, setCurrentRowsPerPage] = useState(rowsPerPage);

  // State برای دیالوگ حذف
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // مدیریت تغییر صفحه
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // مدیریت تغییر تعداد ردیف‌ها
  const handleChangeRowsPerPage = (event) => {
    setCurrentRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // بازگشت به صفحه اول
  };

  // تابع حذف سفارش
  const handleDelete = (id) => {
    setDeleteId(id);
    setOpen(true);
  };

  // تأیید حذف
  const confirmDelete = () => {
    setOpen(false);
    setDeleteId(null);
  };

  // تابع ویرایش
  const handleEdit = (id) => {
    navigate(`/profile/edit-order/${id}`);
  };

  // تابع جزئیات
  const handleDetails = (id) => {
    navigate(`/profile/order-details/${id}`);
  };

  // محاسبه ردیف‌های قابل نمایش
  const displayedOrders = showPagination
    ? orders.slice(page * currentRowsPerPage, page * currentRowsPerPage + currentRowsPerPage)
    : orders.slice(0, rowsPerPage);

  return (
    <>
      <TableContainer component={Paper} sx={{ maxWidth: 1200, margin: "auto", mt: 4, p: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="order table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6">#</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">شماره سفارش</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6">تاریخ ثبت سفارش</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6">مبلغ قابل پرداخت</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6">مبلغ کل</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6">وضعیت</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6">عملیات</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedOrders.length > 0 ? (
              displayedOrders.map((order, index) => (
                <TableRow
                  key={order.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    // رنگ‌بندی یکی‌درمیان
                    backgroundColor: index % 2 === 0 ? "#f5f5f5" : "white",
                  }}
                >
                  <TableCell component="th" scope="row">
                    {showPagination ? page * currentRowsPerPage + index + 1 : index + 1}
                  </TableCell>
                  <TableCell>{order.orderNumber}</TableCell>
                  <TableCell align="right">{order.orderDate}</TableCell>
                  <TableCell align="right">{order.payableAmount.toLocaleString("fa-IR")}</TableCell>
                  <TableCell align="right">{order.totalAmount.toLocaleString("fa-IR")} تومان</TableCell>
                  <TableCell align="right">{order.status}</TableCell>
                  <TableCell align="right" style={{width:"fit-content",padding:"0px"}}>
                    <IconButton
                      color="primary"
                      onClick={() => handleDetails(order.id)}
                      title="جزئیات"
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      color="warning"
                      onClick={() => handleEdit(order.id)}
                      title="ویرایش"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(order.id)}
                      title="حذف"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography variant="body1">هیچ سفارشی یافت نشد</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {/* نمایش صفحه‌بندی فقط در صورت showPagination=true */}
        {showPagination && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={orders.length}
            rowsPerPage={currentRowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="تعداد ردیف‌ها در هر صفحه:"
            labelDisplayedRows={({ from, to, count }) => `${from}–${to} از ${count}`}
            sx={{ direction: "ltr" }} // برای راست‌چین بودن
          />
        )}
      </TableContainer>

      {/* دیالوگ تأیید حذف */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>تأیید حذف</DialogTitle>
        <DialogContent>
          <DialogContentText>آیا مطمئن هستید که می‌خواهید این سفارش را حذف کنید؟</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>لغو</Button>
          <Button onClick={confirmDelete} color="error">
            حذف
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}