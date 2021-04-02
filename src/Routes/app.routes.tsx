import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from '../Pages/Dashboard';
import List from '../Pages/List';
import Layout from '../Components/Layout';

const AppRoutes: React.FC = () => (
  <Layout>
    <Switch>
      <Route path="/dashboard" exact component={Dashboard} />
      <Route path="/list/:type" exact component={List} />
    </Switch>
  </Layout>
);

export default AppRoutes;
