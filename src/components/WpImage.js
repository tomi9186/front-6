import './WpImage.css';

function WpImage({post}){

    const media = post._embedded?.['wp:featuredmedia']?.[0];

    if(!media) return <img src="https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=600" alt="Placeholder" />

    return (
        <img 
            src={media?.media_details?.sizes?.medium_large?.source_url} 
            alt={media?.alt_text}
            title={media?.title?.rendered}
            className="wp-image-card"    
        />
    )
}

export default WpImage;