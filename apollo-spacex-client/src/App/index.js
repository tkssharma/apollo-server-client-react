import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import SpacexComponent from './Space';
import Mock from './Space/mock';

const GET_REPOSITORIES_OF_CURRENT_USER = gql`
  {
    viewer {
      repositories(
        first: 5
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
        // error occured deal it in your iwn way .. 
        return <span>error </span>
      }
      else if(loading){
        return <span>Loading ...</span>
      } else if (data){
        return <SpacexComponent spacex={data}/>
      }
    }}
  </Query>
);
export default Profile;