import {useState, useEffect} from 'react';
import { WP_REST_URL } from '../../services/wordpress';

function Posts(){

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch(`${WP_REST_URL}/posts?author=1`)
            .then(res => res.json())
            .then(data => setPosts(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="container">
            <h1>Posts</h1>
            <div className="row">
            {
                posts.map(clanak => {
                    return (
                        <div className="col-md-3 mb-3" key={clanak.id}>
                            <h2>{clanak.title.rendered}</h2>
                            <div dangerouslySetInnerHTML={{__html: clanak.content.rendered}}></div>
                        </div>
                    );
                })
            }
            </div>
        </div>
    );
}

export default Posts;