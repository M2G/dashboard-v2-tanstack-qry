import type { JSX } from 'react';

import { Cell, Col, Grid, Row, Zone } from 'ui';
import UserList from '@/containers/UserList/UserList';

import './index.scss';

function Users(): JSX.Element {
  return (
    <Zone>
      <Grid className="u-no-gutters">
        <Row>
          <Col className="o-col">
            <Cell className="o-cell--one">
              <UserList canAdd canDelete canEdit id="test" />
            </Cell>
          </Col>
        </Row>
      </Grid>
    </Zone>
  );
}

export default Users;
