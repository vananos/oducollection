import React from 'react';
import Layout from '../components/layout/layout';
import { Menu } from '../components/navbar/navbar';

export default () => (
  <div>
    <Layout selectedMenuItem={Menu.CV} />
  </div>
);
