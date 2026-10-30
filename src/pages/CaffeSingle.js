import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function CaffeSingle() {

    const { slug } = useParams();
    const [post, setPost] = useState();

    useEffect(() => {
        fetch("https://front6.edukacija.online/backend/wp-json/wp/v2/venue?slug=" + slug)
            .then(res => res.json())
            .then(data => setPost(data[0]))
            .catch(err => console.error(err));
    }, [slug]);

    if(!post) return <p>Učitavanje...</p>

    return (
        <div className="container">
            <h1>{post.title.rendered}</h1>
            <p>Adresa kafića: {post.acf.venue_address}</p>
            <p>Grad: {post.acf.venue_city}</p>
            <p>Telefon: <a href="tel:{post.acf.venue_phone}">{post.acf.venue_phone}</a></p>
            <p>E-mail adresa: <a href="mailto:{post.acf.venue_email}">{post.acf.venue_email}</a></p>

            
            

            <div className="row">
                <div className="col-md-8 m-auto" dangerouslySetInnerHTML={{ __html: post.content.rendered }}></div>
            </div>
        </div>
    );
}

export default CaffeSingle;