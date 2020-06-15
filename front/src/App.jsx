import React from 'react';
import { Row, Col } from 'antd';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Main from './routes/Main';
import Heroes from './routes/Heroes';
import Hero from './routes/Hero';
import { createClient, Provider } from 'urql';

const client = createClient({ url: `${process.env.REACT_APP_API_PORT}graphql` });

function App() {
  return (
    <Provider value={client}>
      <BrowserRouter>
        <Header />
        <Switch>
          <div className="wrapper">
            <Row>
              <Col span={18} offset={3}>
                <Route path="/" exact component={Main} />
                <Route path="/heroes" exact component={Heroes} />
                <Route path="/heroes/:id" exact component={Hero} />
              </Col>
            </Row>
          </div>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
