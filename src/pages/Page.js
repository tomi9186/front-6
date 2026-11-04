import {useState, useEffect} from 'react';


function Page(){

    const [page, setPage] = useState(null);

    useEffect(() => {
        fetch("https://front6.edukacija.online/backend/wp-json/wp/v2/pages/285")
            .then(res => res.json())
            .then(data => setPage(data))
            .catch(err => console.error(err));
    }, [])

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