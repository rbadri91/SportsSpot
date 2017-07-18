import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'


const HomePage = () => (
  <MuiThemeProvider>
  <Card className="container">
    <CardTitle title="React Application" subtitle="This is the home page." />
  </Card>
  </MuiThemeProvider>
);

export default HomePage;