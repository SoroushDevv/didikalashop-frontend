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
    <Box component="section" sx={{ py: 8, bgcolor: "background.default", pt: 10 }}>
      <Container>
        {/* متن بالا */}
        <Box textAlign="center" mb={6} maxWidth="md" mx="auto">
          <Typography variant="h4" component="h2" fontWeight={600} gutterBottom>
            آخرین مقالات وبلاگ
          </Typography>
          <Typography variant="body1" color="text.secondary">
            اینجا می‌تونی جدیدترین مطالب درمورد محصولات فروشگاه رو بخونی و همیشه بروز باشی.
          </Typography>
        </Box>

        {/* گرید کارت‌ها */}
        {loading && <Typography>در حال بارگذاری...</Typography>}
        {error && <Typography color="error">{error}</Typography>}


        <Grid container spacing={2} mb={4} className="blog-tabs_container" justifyContent={"center"}>
          <Grid item xs={2}  className="blog-tab-link_wrapper">
            <NavLink
              onClick={() => handleFilterBlogs("همه")}
              to={`/blogs/همه`}
              className={({ isActive }) => (isActive ? "active-tab" : "tab")}
            >
              همه
            </NavLink>
          </Grid>
          {categories.map((cat, idx) => (
            <Grid item xs={2} key={idx} className="blog-tab-link_wrapper">
              <NavLink
                onClick={() => handleFilterBlogs(cat)}
                to={`/blogs/${cat}`}
                className={({ isActive }) => (isActive ? "active-tab" : "tab")}
              >
                {cat}
              </NavLink>
            </Grid>
          ))}

        </Grid>
        <Grid container spacing={3} justifyContent={"center"} >
          {
            !loading &&
            !error &&

            filteredBlogs.map((blog) => (

              <Grid item key={blog.id} xs={6} sm={4} md={2} >
                <Card

                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 3,
                    boxShadow: 3,
                    transition: "0.3s",
                    "&:hover": { boxShadow: 6, transform: "translateY(-4px)" },
                  }}
                >
                  {/* تصویر */}
                  <CardMedia
                    component="img"
                    image={`/img/blogs/${blog.cover_image}`}
                    alt={blog.title}
                    sx={{ height: 200, objectFit: "cover" }}
                  />

                  {/* هدر */}
                  <CardHeader
                    title={
                      <Typography
                        component={Link}
                        to={`/blogs/${blog.slug}`}
                        sx={{
                          textDecoration: "none",
                          color: "text.primary",
                          fontWeight: 600,
                          fontSize: "1.1rem",
                          "&:hover": { color: "primary.main" },
                        }}
                      >
                        {blog.title}
                      </Typography>
                    }
                  />

                  {/* خلاصه متن */}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ lineHeight: 1.6 }}
                    >
                      {blog.summary ||
                        blog.content?.slice(0, 120) + "..." ||
                        "بدون توضیحات"}
                    </Typography>
                  </CardContent>

                  {/* لینک پایین */}
                  <CardActions>
                    <NavLink
                      to={`/blog-details/${blog.id}`}
                      size="small"
                      component={Link}
                      sx={{ fontWeight: 500 }}
                      className={"blog-detail_button"}
                    >
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
