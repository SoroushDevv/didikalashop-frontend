import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import useAllBlogs from "../../Hooks/useAllBlogs"
import { styled } from '@mui/material/styles';
import "./Blogs.css"
// MUI Components
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  Container,
  Button,
  Box,
  Paper,
} from "@mui/material"
import Grid from '@mui/material/Grid';
import { NavLink } from "react-router-dom";





const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));


export default function BlogsPage() {
  const { blogs, loading, error } = useAllBlogs()
  const [filteredBlogs, setFilteredBlogs] = useState(blogs)
  const categories = ["بررسی", "راهنما", "مقایسه", "معرفی"];
  const [activeTab, setActiveTab] = useState()



  useEffect(() => {

    const handleBlogs = () => {

      if (!blogs || blogs.length === 0 || loading) return;


      setFilteredBlogs(blogs)

    }

    handleBlogs()
  }, [blogs, loading, error])


  const handleFilterBlogs = (cat) => {

    const filteredItems = blogs.filter((blog) => {
      if (cat === "همه") {
        return blog;
      }
      return JSON.parse(blog.category).label === cat
    })

    setFilteredBlogs(filteredItems)

  }
  console.log("blogs : ", blogs)
  const sortBlogsHandler = (category) => {
  }

  return (
  <Box component="section" className="blog-section">
  <Container>
    {/* متن بالا */}
    <Box className="blog-header">
      <Typography variant="h4" component="h2" className="blog-title">
        آخرین مقالات وبلاگ
      </Typography>
      <Typography variant="body1" className="blog-subtitle">
        اینجا می‌تونی جدیدترین مطالب درمورد محصولات فروشگاه رو بخونی و همیشه بروز باشی.
      </Typography>
    </Box>

    {/* تب‌های فیلتر */}
    <Grid container spacing={2} mb={4} className="blog-tabs">
      <Grid item xs={2} className="blog-tab-item">
        <NavLink
          onClick={() => handleFilterBlogs("همه")}
          to={`/blogs/همه`}
          className={({ isActive }) => (isActive ? "tab active" : "tab")}
        >
          همه
        </NavLink>
      </Grid>

      {categories.map((cat, idx) => (
        <Grid item xs={2} key={idx} className="blog-tab-item">
          <NavLink
            onClick={() => handleFilterBlogs(cat)}
            to={`/blogs/${cat}`}
            className={({ isActive }) => (isActive ? "tab active" : "tab")}
          >
            {cat}
          </NavLink>
        </Grid>
      ))}
    </Grid>

    {/* گرید کارت‌ها */}
    <Grid container spacing={3} justifyContent="center" className="blog-grid">
      {!loading &&
        !error &&
        filteredBlogs.map((blog) => (
          <Grid item key={blog.id} xs={6} sm={4} md={2} className="blog-card-item">
            <Card className="blog-card">
              <CardMedia
                component="img"
                image={`/img/blogs/${blog.cover_image}`}
                alt={blog.title}
                className="blog-card-image"
              />

              <CardHeader
                title={
                  <Typography component={Link} to={`/blogs/${blog.slug}`} className="blog-card-title">
                    {blog.title}
                  </Typography>
                }
              />

              <CardContent className="blog-card-content">
                <Typography variant="body2" className="blog-card-summary">
                  {blog.summary || blog.content?.slice(0, 120) + "..." || "بدون توضیحات"}
                </Typography>
              </CardContent>

              <CardActions className="blog-card-footer">
                <NavLink to={`/blog-details/${blog.id}`} className="blog-detail-link">
                  ادامه مطلب
                </NavLink>
              </CardActions>
            </Card>
          </Grid>
        ))}
    </Grid>
  </Container>
</Box>

  )
}
