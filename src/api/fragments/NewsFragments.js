import gql from 'graphql-tag';

export const CORE_NEWS_FIELDS = gql`
    fragment CoreNewsFields on News{
        title
        description
        content
        url
        image
        publishedAt
    }
`;