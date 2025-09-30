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

export default function UserOrders({ orders, rowsPerPage = 5, showPagination = true }) {
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [currentRowsPerPage, setCurrentRowsPerPage] = useState(rowsPerPage);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleChangePage = (event, newPage) => {
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
    setDeleteId(null);
  };

  const handleEdit = (id) => {
    navigate(`/profile/edit-order/${id}`);
  };

  const handleDetails = (id) => {
    navigate(`/profile/order-details/${id}`);
  };

  // فرض می‌کنیم قیمت محصول از جایی دیگر (مثلاً هوک یا پراپ) دریافت شده است
  // برای ساده‌سازی، فرض می‌کنیم هر سفارش فقط یک محصول دارد و قیمت آن از جدول products می‌آید
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
                <Typography variant="h6">کد سفارش</Typography>
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
              displayedOrders.map((order, index) => {
                // فرض می‌کنیم قیمت محصول از جایی دیگر در دسترس است
                // برای محاسبه، باید productID را با جدول products مطابقت دهیم
                // اینجا فرض می‌کنیم قیمت محصول به صورت دستی یا از API گرفته شده
                const productPrice = 100000; // این باید از جدول products گرفته شود
                const totalAmount = productPrice; // قیمت کل (بدون تخفیف)
                const payableAmount = Math.round(totalAmount * (1 - order.percent / 100)); // قیمت با تخفیف
                const status = order.isActive ? "فعال" : "غیرفعال"; // تبدیل isActive به وضعیت

                return (
                  <TableRow
                    key={order.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      backgroundColor: index % 2 === 0 ? "#f5f5f5" : "white",
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {showPagination ? page * currentRowsPerPage + index + 1 : index + 1}
                    </TableCell>
                    <TableCell>{order.code}</TableCell>
                    <TableCell align="right">{new Date(order.date).toLocaleDateString("fa-IR")}</TableCell>
                    <TableCell align="right">{payableAmount.toLocaleString("fa-IR")} تومان</TableCell>
                    <TableCell align="right">{totalAmount.toLocaleString("fa-IR")} تومان</TableCell>
                    <TableCell align="right">{status}</TableCell>
                    <TableCell align="right" style={{ width: "fit-content", padding: "0px" }}>
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
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography variant="body1">هیچ سفارشی یافت نشد</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
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
            sx={{ direction: "ltr" }}
          />
        )}
      </TableContainer>

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