import api from "../config/Api";
import { User } from "../types/models/User.model";

type addBlogRequest = {
  title: string,
  text: string;
  author: User,
  category: string
}
type UpdateBlogRequest = {
  title: string,
  text: string;
  category: string
}

const BlogService = {
  findAll: async (page: number) => {
    return await api.get(`/blogs?page=${page}&size=5`);

  },

  getBlogById: async (id:string) => {
    const data = await api.get(`/blogs/${id}`);
    return data['data'];
  },

  getPageCount: async () => {
    return (await api.get(`/blogs/count`)).data;
  },

  createBlog: async (params: addBlogRequest) => {
    const res = await api.post('/blogs', params);
    if (res && res.status === 200) {
      console.log("blog successfully created");
    }
  },
  deleteBlog: async (blogId: string) => {
    const res = await api.delete(`/blogs/${blogId}`);
    if (res && res.status === 200) {
      console.log("blog successfully deleted")
    }
  },

  updateBlog: async (id: string, params: UpdateBlogRequest) => {
    const res = await api.put(`/blogs/${id}`, params)
    if (res && res.status === 200) {
      console.log("blog successfully updated")
    }
  }

}
export default BlogService;
