import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useAllBlogs from "../../Hooks/useAllBlogs";
import AOS from "aos";
import "aos/dist/aos.css";

export default function BlogsPage() {
  const { blogs, loading, error } = useAllBlogs();
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const categories = ["بررسی", "راهنما", "مقایسه", "معرفی"];

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  useEffect(() => {
    if (!blogs || loading) return;
    setFilteredBlogs(blogs);
  }, [blogs, loading]);

  const handleFilterBlogs = (cat) => {
    if (cat === "all") {
      setFilteredBlogs(blogs);
    } else {
      const filteredItems = blogs.filter(
        (blog) => JSON.parse(blog.category).label === cat
      );
      setFilteredBlogs(filteredItems);
    }
  };

  return (
    <section className="bg-gray-50 py-20 font-vazir" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            آخرین مقالات وبلاگ
          </h2>
          <p className="text-gray-600 leading-7">
            اینجا می‌تونی جدیدترین مطالب درمورد محصولات فروشگاه رو بخونی و همیشه بروز باشی.
          </p>
        </div>

        <div className="flex justify-center flex-wrap gap-3 mb-10">
          <NavLink
            onClick={() => handleFilterBlogs("all")}
            to={`/blogs/all`}
            className={({ isActive }) =>
              `px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isActive
                  ? "bg-pink-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800"
              }`
            }
          >
            همه
          </NavLink>

          {categories.map((cat, idx) => (
            <NavLink
              key={idx}
              onClick={() => handleFilterBlogs(cat)}
              to={`/blogs/${cat}`}
              className={({ isActive }) =>
                `px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  isActive
                    ? "bg-pink-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800"
                }`
              }
            >
              {cat}
            </NavLink>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center">
          {!loading &&
            !error &&
            filteredBlogs.map((blog, index) => (
              <div
                key={blog.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-transform duration-300 hover:-translate-y-1 flex flex-col"
                data-aos={"fade-up"}
              >
                <img
                  src={`/img/blogs/${blog.cover_image}`}
                  alt={blog.title}
                  className="w-full h-52 object-cover rounded-t-2xl"
                />

                <div className="p-4 flex flex-col flex-grow">
                  <Link
                    to={`/blogs/${blog.slug}`}
                    className="text-gray-800 font-semibold text-base mb-2 hover:text-pink-500 transition-colors"
                  >
                    {blog.title}
                  </Link>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
                    {blog.summary ||
                      blog.content?.slice(0, 120) + "..." ||
                      "بدون توضیحات"}
                  </p>

                  <Link
                    to={`/blog-details/${blog.id}`}
                    className="text-pink-500 font-medium text-sm hover:text-pink-600 transition-colors self-start"
                  >
                    ادامه مطلب
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
