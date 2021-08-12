import gql from 'graphql-tag';

export const GET_NEWS_SCHEMA = gql`
query getNews($country: String, $lang: String){
    getNews(country: $country, lang: $lang){
      totalArticles
      articles{
        title
      description
      content
      url
      image
      publishedAt
      source{
        name
        url
      }
      }
    }
  }
  
`;