import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import RepoComponent from './Repo';

const GET_REPOSITORIES_OF_CURRENT_USER = gql`
  {
    viewer {
      repositories(
        first: 100
        orderBy: { direction: DESC, field: STARGAZERS }
      ) {
        edges {
          node {
            id
            name
            url
            descriptionHTML
            primaryLanguage {
              name
            }
            owner {
              login
              url
            }
            stargazers {
              totalCount
            }
            viewerHasStarred
            watchers {
              totalCount
            }
            viewerSubscription
          }
        }
      }
    }
  }
`;
const Profile = () => (
  <Query query={GET_REPOSITORIES_OF_CURRENT_USER}>
    {({data, loading, error}) => {
      if(error){
        return <span>Error ...</span>
      }
      else if(loading){
        return <span>Loading ...</span>
      } else if (data){
        return <RepoComponent repo={data}/>
      }
    }}
  </Query>
);
export default Profile;