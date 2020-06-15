import React, { Fragment } from 'react';
import { message } from 'antd';
import { useQuery, useMutation } from 'urql';
import HeroForm from '../components/HeroForm';

function Hero(props) {
  const HeroQuery = `
    query HeroQuery($id: ID!) {
      findHero(id: $id) {
        _id
        title
        description
        date
      }
    }
  `;
  const UpdateHeroMutation =`
    mutation UpdateHeroMutation($id: ID!, $title: String!, $description: String!, $date: String!) {
      updateHero(heroUpdate: {_id: $id, title: $title, description: $description, date: $date}) {
        _id
        title
        description
        date
      }
    }
  `;
  const [res, executeQuery] = useQuery({
    query: HeroQuery,
    variables: { id: props.match.params.id }
  });
  const [updateResult, updateHero] = useMutation(UpdateHeroMutation);
  const success = () => {
    message.success('Document updated successfully');
  };
  if (res.fetching) return <p>Loading...</p>;
  if (res.error) return <p>Errored!</p>;
  const hero = res.data.findHero;
  return (
    <Fragment>
      <HeroForm
        data={hero}
        sendbackData={args => {
          updateHero({
            id: props.match.params.id,
            title: args.title,
            description: args.description,
            date: args.date
          });
          success();
        }}
      />
    </Fragment>
  );
}

export default Hero;
