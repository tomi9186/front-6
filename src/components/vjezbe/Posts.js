import {useState, useEffect} from 'react';

function Posts(){

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("https://dummyjson.com/posts")
            .then(res => res.json())
            .then(data => setPosts(data.posts))
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
                            <h2>{clanak.title}</h2>
                            <p><strong>{clanak.body}</strong></p>
                            <p>
                                {
                                clanak.tags.map(tag => {
                                    return <span className="badge bg-primary me-1">{tag}</span>
                                })    
                            }
                            </p>
                            <p>Broj lajkova: {clanak.reactions.likes}</p>
                            <p>Broj dislajkova: {clanak.reactions.dislikes}</p>
                            <p>Broj pregleda: {clanak.views}</p>
                        </div>
                    );
                })
            }
            </div>
        </div>
    );
}

export default Posts;