import { useState, useEffect } from "react";
import axios from "axios";

const useAllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [triggerKey,setTriggerKey] = useState(0)
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        // دریافت دسته‌بندی‌ها
        const response = await axios.get("http://localhost:8000/api/blogs");
        console.log("blogs: ", response.data);
        
        setBlogs(response.data);
      } catch (err) {
        console.error("Error fetching blogs:", err.message);
        setError(err.message || "Failed to fetch blogs");
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();




  }, [triggerKey]);

const handleUpdateTrigger = () => setTriggerKey(prev => prev + 1)

  

  return { blogs, loading, error ,handleUpdateTrigger};
};

export default useAllBlogs;