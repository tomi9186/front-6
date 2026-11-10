import {useState, useEffect} from "react";
import {Link} from "react-router-dom";

import "./Blog.css";

function Blog(){

    const [posts, setPosts] = useState([]);
    
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        fetch("https://front6.edukacija.online/backend/wp-json/wp/v2/users")
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(err => console.error(err));

        fetch("https://front6.edukacija.online/backend/wp-json/wp/v2/categories?_fields=id,name")
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(err => console.error(err));
    },[])

    useEffect(() => {

        let url = "https://front6.edukacija.online/backend/wp-json/wp/v2/posts?";

        if(selectedUser) url += "author=" + selectedUser + "&";
        if(selectedCategory) url += "categories=" + selectedCategory;

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
                            <div className="col-md-4 mb-4">
                                <div className="blog-card">
                                    <Link to={'/blog/' + post.slug} class="blog-card__image-link" aria-label="Pročitaj članak">
                                        <img
                                        class="blog-card__image"
                                        src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=900&q=85"
                                        alt={post.title.rendered}
                                        loading="lazy"
                                        />
                                    </Link>
                                    <div className="blog-card__content">
                                        <h2 className="blog-card__title">
                                            <Link to={'/blog/' + post.slug} dangerouslySetInnerHTML={{ __html:post.title.rendered }} />
                                        </h2>
                                        <div className="blog-card__excerpt" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}></div>
                                    </div>
                                    <div class="blog-card__footer">
                                        <time class="blog-card__date" datetime="2026-09-12">
                                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                            <rect x="3" y="5" width="18" height="16" rx="2"/>
                                            <path d="M16 3v4M8 3v4M3 10h18"/>
                                            </svg>
                                            12. rujna 2026.
                                        </time>

                                        <Link className="blog-card__read-more" to={'/blog/' + post.slug}>Pročitaj više <span aria-hidden="true">→</span></Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Blog;