import {useState, useEffect} from "react";

import BlogCard from "../components/BlogCard";
import { WP_REST_URL } from "../services/wordpress";

import "./Blog.css";

function Blog(){

    const [posts, setPosts] = useState([]);
    
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        fetch(`${WP_REST_URL}/users`)
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(err => console.error(err));

        fetch(`${WP_REST_URL}/categories?_fields=id,name`)
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(err => console.error(err));
    },[])

    useEffect(() => {

        let url = `${WP_REST_URL}/posts?_embed&_fields=title,slug,excerpt,_links,date&author=1`;

        if(selectedUser) url += "&author=" + selectedUser;
        if(selectedCategory) url += "&categories=" + selectedCategory;

        fetch(url)
            .then(res => res.json())
            .then(data => setPosts(data))
            .catch(err => console.error(err));
    }, [selectedUser, selectedCategory]);

    return (
        <div className="container">
            <h1 className="display-4 text-center py-5">Blog</h1>
            <div className="row pb-5">
                <div className="col-md-4">
                    <select
                        className="form-select"
                        value={selectedUser}
                        onChange={e => setSelectedUser(e.target.value)}
                    >
                        <option value="">Svi autori</option>
                        {
                            users.map(user => {
                                return <option key={user.id} value={user.id}>{user.name}</option>
                            })
                        }
                    </select>
                </div>
                <div className="col-md-4">
                    <select
                        className="form-select"
                        value={selectedCategory}
                        onChange={e => setSelectedCategory(e.target.value)}
                    >
                        <option value="">Sve kategorije</option>
                        {
                            categories.map(category => {
                                return <option key={category.id} value={category.id}>{category.name}</option>
                            })
                        }
                    </select>
                </div>
            </div>
            <div className="row">
                {
                    posts.map(post => {
                        return(
                            <div className="col-md-3 mb-4">
                                <BlogCard post={post} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Blog;