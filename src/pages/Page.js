import {useState, useEffect} from 'react';
import { WP_REST_URL } from "../services/wordpress";


function Page({pageID}){

    const [page, setPage] = useState(null);

    useEffect(() => {
        fetch(`${WP_REST_URL}/pages/${pageID}`)
            .then(res => res.json())
            .then(data => setPage(data))
            .catch(err => console.error(err));
    }, [pageID])

    if(!page) return <h3>učitavanje...</h3>

    return (
        <div className="container">
            <h1 className="display-4 text-center py-5" dangerouslySetInnerHTML={{ __html: page.title.rendered }} />
            <div className="row">
                <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} className="col-md-8 m-auto" />
            </div>
        </div>
    )

}

export default Page;