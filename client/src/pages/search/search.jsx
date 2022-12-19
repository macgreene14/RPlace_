import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Navbar from '../../components/navbar/navbar';
import SearchCard from './searchCard';
import './search.css';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_FIND_USERS } from '../../context/queries';
import { useParams } from 'react-router-dom';

export default function Search() {
  let { q } = useParams();
  console.log(q);
  // todo replace hard coded varibles with useParams()
  // todo replace button functions
  // const { loading, error, data } = useQuery(QUERY_FIND_USERS, {
  //   variables: { firstName: 'Shawn', lastName: 'Canavan' },
  // });
  const lastSearched = localStorage.getItem('lastSearchFriend');
  console.log('file: search.jsx:25 ~ Search ~ lastSearched', lastSearched);
  const lastSearchedSplit = lastSearched.split(',');
  console.log(
    'file: search.jsx:19 ~ Search ~ lastSearchedSplit',
    lastSearchedSplit
  );
  const { loading, error, data } = useQuery(QUERY_FIND_USERS, {
    variables: {
      firstName: lastSearchedSplit[0],
      lastName: lastSearchedSplit[1],
    },
  });

  console.log(data);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  console.log('SEARCH USER DATA RETURN: ', data.findFriend);

  return (
    <div className="searchContainer">
      {data.findFriend.map((user) => (
        <SearchCard key={user._id} user={user} />
      ))}
    </div>
  );
}
