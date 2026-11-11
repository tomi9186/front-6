

function WpImage({post}){

    const media = post._embedded?.['wp:featuredmedia']?.[0];

    console.log(media);

    return (
        <img 
            src={media.media_details.sizes.medium_large.source_url} 
            alt={media.alt_text}
            title={media.title.rendered}    
        />
    )
}

export default WpImage;