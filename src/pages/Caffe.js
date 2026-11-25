import {useState, useEffect} from "react";
import ObjectCard from "../components/ObjectCard";
import { WP_REST_URL } from "../services/wordpress";

function Caffe(){
    const [posts, setPosts] = useState([]);

    const [venueType, setVenueType] = useState([]);
    const [selectedVenue, setSelectedVenue] = useState("");

    const [lokacije, setLokacije] = useState([]);
    const [selectedLokacija, setSelectedLokacija] = useState("");

    useEffect(() => {
        fetch(`${WP_REST_URL}/venue_type?_fields=id,name`)
            .then(res => res.json())
            .then(data => setVenueType(data))
            .catch(err => console.log(err))

        fetch(`${WP_REST_URL}/lokacija?_fields=id,name&per_page=100`)
            .then(res => res.json())
            .then(data => setLokacije(data))
            .catch(err => console.log(err))
    }, []);

    useEffect(() => {
        let url = `${WP_REST_URL}/venue?_embed`

        if(selectedVenue) url += "&venue_type=" + selectedVenue;
        if(selectedLokacija) url += "&lokacija=" + selectedLokacija;

        fetch(url)
            .then(res => res.json())
            .then(data => setPosts(data))
            .catch(err => console.error(err));
    }, [selectedVenue, selectedLokacija]);

    return (
        <div className="container">
            <h1 className="display-4 text-center py-5">Kafići</h1>
            <div className="row mb-5">
                <div className="col-md-4">
                    <select
                        className="form-select"
                        value={selectedVenue}
                        onChange={e => setSelectedVenue(e.target.value)}
                    >
                        <option value="">Svi objekti</option>
                        {
                            venueType.map(type => {
                                return <option key={type.id} value={type.id}>{type.name}</option>
                            })
                        }
                    </select>
                </div>
                <div className="col-md-4">
                    <select
                        className="form-select"
                        value={selectedLokacija}
                        onChange={e => setSelectedLokacija(e.target.value)}
                    >
                        <option value="">Sve lokacije</option>
                        {
                            lokacije.map(lokacija => {
                                return <option key={lokacija.id} value={lokacija.id}>{lokacija.name}</option>
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
                                <ObjectCard post={post} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Caffe;