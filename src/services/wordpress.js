const wordpressUrl = process.env.REACT_APP_WORDPRESS_URL;

if (!wordpressUrl) {
    throw new Error('REACT_APP_WORDPRESS_URL nije postavljen u .env datoteci.');
}

const wordpressApiUrl = `${wordpressUrl.replace(/\/+$/, '')}/wp-json`;

export const WP_REST_URL = `${wordpressApiUrl}/wp/v2`;
export const WP_JWT_URL = `${wordpressApiUrl}/jwt-auth/v1`;
export const WP_CUSTOM_URL = `${wordpressApiUrl}/custom/v1`;
