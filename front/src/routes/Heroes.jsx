import React, { Fragment, useState } from 'react';
import Line from '../components/Line';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Drawer } from 'antd';
import HeroesList from '../components/HeroesList';
import HeroForm from '../components/HeroForm';
import { useMutation } from 'urql';

function Heroes() {
  const [visible, setVisible] = useState(false);
  const CreateHeroMutation = `
    mutation CreateHeroMutation($title: String!, $description: String!, $date: String!) {
      createHero(heroInput: {title: $title, description: $description, date: $date}) {
        _id
        title
        description
        date
      }
    }
  `;
  const [createResult, createHero] = useMutation(CreateHeroMutation);
  return (
    <Fragment>
      <h1>Heroes page</h1>
      <Line />
      <Button
        type="primary"
        className="sector"
        onClick={() => { setVisible(true) }}
      >
        <PlusOutlined />
        <span>Add Hero</span>
      </Button>
      <HeroesList />
      <Drawer
        title="Add new hero"
        width={720}
        onClose={() => { setVisible(false) }}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <HeroForm
          sendbackData={args => {
            createHero({
              title: args.title,
              description: args.description,
              date: args.date
            }).then(_ => setVisible(false));
          }}
          reset='reset'
        />
      </Drawer>
    </Fragment>
  );
}

export default Heroes;
