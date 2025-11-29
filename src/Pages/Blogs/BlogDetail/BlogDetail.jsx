import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useAllBlogs from "../../../Hooks/useAllBlogs";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import api from "../../../../src/api/axios";
import moment from "moment-jalaali";

export default function BlogDetail() {
  const { blogs, loading, error } = useAllBlogs();
  const [blog, setBlog] = useState(null);
  const [author, setAuthor] = useState(null);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getBlog = async () => {
      if (!blogs || loading) return;
      try {
        const response = await api.get(`/blogs/${id}`);
        setBlog(response.data);
      } catch (err) {
        console.error("Error fetching blog:", err);
      }
    };
    getBlog();
  }, [blogs, loading, error, id]);

  useEffect(() => {
    const getAuthor = async () => {
      try {
        const response = await api.get("/users");
        const users = response.data;
        const foundAuthor = users.find((u) => u.id === blog?.authorID);
        setAuthor(foundAuthor);
      } catch (err) {
        console.error("Error fetching author:", err);
      }
    };

    const getRecentBlogs = () => {
      if (!blogs || blogs.length === 0) return;
      const today = new Date();
      const start = new Date("06/30/2025");
      const filtered = blogs.filter((b) => {
        const blogDate = new Date(b.published_at);
        return blogDate <= today && blogDate >= start;
      });
      setRecentBlogs(filtered);
    };

    if (blog) {
      getRecentBlogs();
      getAuthor();
    }
  }, [blog, blogs]);

  if (!blog) return <ErrorMessage msg={"بلاگی یافت نشد"} />;

  return (
    <div dir="rtl" className="bg-gray-50 py-8 px-4 md:px-8 flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <nav className="text-sm text-gray-500 flex gap-1">
          <Link to="/" className="hover:text-blue-600">خانه</Link> /
          <Link to="/blogs/همه" className="hover:text-blue-600">مقالات</Link> /
          <span className="text-gray-600">{blog.excerpt}</span>
        </nav>
        <h1 className="text-2xl font-semibold text-gray-900">{blog.title}</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 bg-white p-6 rounded-2xl shadow-sm">
          <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm mb-4">
            <span>📅 {moment(blog.published_at.split("T")[0]).format("jYYYY/jMM/jDD")}</span>
            <span>
              👤 ارسال شده توسط{" "}
              <span className="font-semibold text-gray-800">
                {author ? `${author.firstname} ${author.lastname}` : "ادمین سایت"}
              </span>
            </span>
            <span>📂 دسته‌بندی نشده</span>
            <span>👁 {blog.views_count} بازدید</span>
          </div>

          <div className="w-full overflow-hidden rounded-xl mb-6">
            <img
              src={`/img/blogs/${blog.cover_image}`}
              alt="Blog Cover"
              className="w-full h-[300px] md:h-[400px] object-cover rounded-xl"
            />
          </div>
          <div className="prose prose-sm md:prose-base prose-gray text-justify leading-8">
            {blog.content}
          </div>
        </div>

        <aside className="w-full md:w-1/3 flex flex-col gap-6">
          <div className="bg-white p-4 rounded-2xl shadow-sm">
            <h3 className="text-lg font-semibold mb-3">جدیدترین نوشته‌ها</h3>
            <div className="flex flex-col gap-3">
              {recentBlogs.map((b, i) => (
                <div key={i} className="flex items-center gap-3">
                  <img
                    src={`/img/blogs/${b.cover_image}`}
                    alt={b.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <Link
                      to={`/blog-details/${b.id}`}
                      className="block text-sm font-medium text-gray-800 hover:text-blue-600"
                    >
                      {b.title}
                    </Link>
                    <span className="text-xs text-gray-500">{b.published_at.split("T")[0]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow-sm">
            <h3 className="text-lg font-semibold mb-3">برچسب‌ها</h3>
            <div className="flex flex-wrap gap-2">
              {["ابزار", "لوازم خانه", "فروشگاه", "لپتاپ"].map((tag, i) => (
                <button
                  key={i}
                  className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-blue-600 hover:text-white transition-all"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
