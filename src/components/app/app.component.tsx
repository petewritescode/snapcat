import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { favouritesActions } from '../../store/favourites/favourites.slice';
import { imagesActions } from '../../store/images/images.slice';
import { votesActions } from '../../store/votes/votes.slice';
import { HomePage } from '../home-page/home-page.component';
import { Layout } from '../layout/layout.component';
import { UploadPage } from '../upload-page/upload-page.component';
import 'reset-css';
import './app.module.css';

export const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(imagesActions.getImages());
    dispatch(favouritesActions.getFavourites());
    dispatch(votesActions.getVotes());
  });

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Layout>
            <HomePage />
          </Layout>
        </Route>

        <Route path="/upload">
          <Layout>
            <UploadPage />
          </Layout>
        </Route>

        <Redirect from="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
};
