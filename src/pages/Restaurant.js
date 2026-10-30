import {useState, useEffect} from "react";
import {Link} from "react-router-dom";

function Caffe(){
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("https://front6.edukacija.online/backend/wp-json/wp/v2/venue?venue_type=94")
            .then(res => res.json())
            .then(data => setPosts(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="container">
            <h1 className="display-4 text-center py-5">Restorani</h1>
            <div className="row">
                {
                    posts.map(post => {
                        return(
                            <div className="col-md-4">
                                <h2 dangerouslySetInnerHTML={{ __html: post.title.rendered }}></h2>
                                <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}></div>
                                <Link to={'/restoran/' + post.slug}>Pročitaj više</Link>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Caffe;