import gql from 'graphql-tag';
import { CORE_NEWS_FIELDS } from '../fragments/NewsFragments';

export const GET_NEWS_SCHEMA = gql`
  ${CORE_NEWS_FIELDS}
  query getNews($country: String, $lang: String){
    getNews(country: $country, lang: $lang){
      totalArticles
      articles{
        ...CoreNewsFields
        source{
          name
          url
        }
      }
    }
  }
`;