import { Link } from "react-router-dom";
import WpImage from "./WpImage";


import {
    Search,
    ArrowRight,
    PinMap,
    CupHot,
    ForkKnife,
    X,
    Sliders
} from "react-bootstrap-icons";

function ObjectCard({ post, title, excerpt, image, isCafe }) {

    return (
        <article className="venue-card">

            <Link
                to={`/restoran/${post.slug}`}
                className="venue-card-image"
            >

                <WpImage post={post} />

                <span className="venue-category">
                    {isCafe ? "Kafić" : "Restoran"}
                </span>

            </Link>

            <div className="venue-card-content">

                <h2>
                    <Link to={`/restoran/${post.slug}`}>
                        <span dangerouslySetInnerHTML={{
                            __html: title
                        }} />
                    </Link>
                </h2>

                <div
                    className="venue-card-description"
                    dangerouslySetInnerHTML={{
                        __html: excerpt
                    }}
                />

                {post.acf?.adresa && (
                    <div className="venue-location">
                        <PinMap />
                        {post.acf.adresa}
                    </div>
                )}

                <div className="venue-card-footer">

                    <Link
                        to={`/restoran/${post.slug}`}
                        className="venue-card-link"
                    >
                        Pogledaj objekt
                        <ArrowRight />
                    </Link>

                </div>

            </div>

        </article>
    )
}

export default ObjectCard;