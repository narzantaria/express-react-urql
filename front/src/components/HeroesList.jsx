import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useQuery, useMutation } from 'urql';

function HeroesList() {
  const [res, executeQuery] = useQuery({
    query: `
      query {
        heroes {
          _id
          title
          description
          date
        }
      }
    `,
  });
  const RemoveHeroMutation = `
    mutation RemoveHeroMutation($id: ID!) {
      deleteHero(heroRemove: {_id: $id}) {
        _id
        title
        description
        date
      }
    }
  `;
  const [removeResult, removeHero] = useMutation(RemoveHeroMutation);
  if (res.fetching) return <p>Loading...</p>;
  if (res.error) return <p>Errored!</p>;
  const { heroes } = res.data;
  return (
    <Fragment>
      {heroes.map(hero => (
        <Fragment>
          <Row className="line">
            <Col span={12}>
              <Link to={`/heroes/${hero._id}`}>
                <h3>{hero.title}</h3>
              </Link>
            </Col>
            <Col span={6}>{hero.date}</Col>
            <Col span={6}>
              <DeleteOutlined
                className="delete"
                onClick={() => {
                  removeHero({id: hero._id});
                }}
              />
            </Col>
          </Row>
        </Fragment>
      ))}
    </Fragment>
  );
}

export default HeroesList;
