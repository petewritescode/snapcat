import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Link, Redirect, Route, Switch } from 'react-router-dom';
import { favouritesActions } from '../../store/favourites/favourites.slice';
import { imagesActions } from '../../store/images/images.slice';
import { votesActions } from '../../store/votes/votes.slice';
import { HomePage } from '../home-page/home-page.component';
import { UploadPage } from '../upload-page/upload-page.component';

export const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(imagesActions.getImages());
    dispatch(favouritesActions.getFavourites());
    dispatch(votesActions.getVotes());
  });

  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/upload">Upload</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>

        <Route path="/upload">
          <UploadPage />
        </Route>

        <Redirect from="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
};
