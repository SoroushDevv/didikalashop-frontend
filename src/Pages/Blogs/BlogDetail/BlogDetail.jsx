import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Paper, Avatar, Button, Breadcrumbs, Link } from "@mui/material";
import { useParams } from "react-router-dom";
import useAllBlogs from "../../../Hooks/useAllBlogs";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import axios from "axios";
import moment from "moment-jalaali";


export default function BlogDetail() {

  const { blogs, loading, error } = useAllBlogs()
  const [blog, setBlog] = useState(null)
  const [author, setAuthor] = useState(null)
  const [recentBlogs,setRecentBlogs] = useState([])
  const { id } = useParams()


  useEffect(() => {

    const getBlog = async () => {
      if (!blogs & loading) return;
      if (error) {
        console.log("get blog error : ", error)
      }


      try {
        const response = await axios.get(`http://localhost:8000/api/blogs/${id}`)

        setBlog(response.data)
      } catch (err) {
        console.error("error : ", err)
      } finally {
        console.log("done")
      }
    }

    getBlog()
  }, [blogs, loading, error])

  useEffect(() => {

    const getAuthor = async () => {

      try {
        const response = await axios.get("http://localhost:8000/api/users")

        const users = response.data

        console.log("users", users)
        const author = users.find((user) => user.id === blog.authorID)

        setAuthor(author)



      } catch (err) {
        console.log("get author error : ", err)
      }
    }


    const recentBlogs = () => {

      const today = new Date()
      const start = new Date("06/30/2025")


   


      
      const filteredBlogs = blogs.filter((blog) => {

        const blogDate = new Date(blog.published_at)
        
        if(blogDate <= today && start <= blogDate ){

          return blog;
        }
      })

      setRecentBlogs(filteredBlogs)
    }


    recentBlogs()
    getAuthor()
  }, [blogs, loading, error])





  return (
    blog ?
      <Box sx={{ py: 8, px: { xs: 2, md: 4 }, bgcolor: "#f9f9f9", display: "flex", flexDirection: "column", gap: 4 }}>
        {/* Breadcrumb */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">خانه</Link>
            <Link underline="hover" color="inherit" href="/blogs/همه">مقالات</Link>
            <Link underline="hover" color="inherit" href="#">{blog.excerpt}</Link>
          </Breadcrumbs>
          <Typography variant="h4" fontWeight={600}>{blog.title}</Typography>
        </Box>

        {/* Main Grid */}
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4 }}>
          {/* Main Content */}
          <Box sx={{ flex: 3, display: "flex", flexDirection: "column", gap: 4 }}>
            <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3, bgcolor: "#fff", display: "flex", flexDirection: "column", gap: 3 }}>
              {/* Post Meta */}
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, color: "text.secondary", fontSize: 14 }}>
                <Typography>📅 {moment(blog.published_at.split("T")[0]).format("jYYYY/jMM/jDD")}</Typography>
                <Typography>👤 ارسال شده توسط <Box component="span" fontWeight={600}>{author ? `${author.firstname} ${author.lastname}` : "ادمین سایت"}</Box></Typography>
                <Typography>📂 دسته‌بندی نشده</Typography>
                <Typography>👁 {blog.views_count} بازدید</Typography>
              </Box>

              {/* Thumbnail */}
              <Box sx={{ width: "100%", height: { xs: 200, md: 400 }, overflow: "hidden", borderRadius: 2 }}>
                <img src={`/img/blogs/${blog.cover_image}`} alt="Post" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </Box>

              {/* Content */}
              <Box sx={{ typography: "body1", lineHeight: 1.8 }}>{blog.content}</Box>
            </Paper>
          </Box>

          {/* Sidebar */}
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
            {/* Latest Posts */}
            <Paper sx={{ p: 2, borderRadius: 2, boxShadow: 2, display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography variant="h6">جدیدترین نوشته‌ها</Typography>
              {recentBlogs.map((blog,index) => (
                <Box key={index} sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                <img src={`/img/blogs/${blog.cover_image}`} alt="Post" style={{ width: "60px", height: "auto", objectFit: "contain" }} />
                  <Box>
                    <Typography fontSize={14}>
                      <Link href={`/blog-details/${blog.id}`} style={{textDecoration:"none", color:"inherit", cursor:"pointer"}}>{blog.title}</Link>
                      
                     
                       
                       
                       </Typography>
                    <Typography fontSize={12} color="text.secondary">{blog.published_at.split("T")[0]}</Typography>
                  </Box>
                </Box>
              ))}
            </Paper>

            {/* Tags */}
            <Paper sx={{ p: 2, borderRadius: 2, boxShadow: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
              <Typography variant="h6" sx={{ width: "100%" }}>برچسب‌ها</Typography>
              {[ "ابزار", "لوازم خانه", " قروشگاه", "لپتاپ"].map((tag, i) => (
                <Button key={i} size="small" variant="outlined">{tag}</Button>
              ))}
            </Paper>
          </Box>
        </Box>
      </Box> : <ErrorMessage msg={"بلاگی یافت نشد"}/>
      )



}
