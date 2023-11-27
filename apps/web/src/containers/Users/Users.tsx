import type { JSX } from 'react';
import './index.scss';
import UserList from '@/containers/UserList/UserList';
import { Row, Grid, Zone, Col } from 'ui';

function Users(): JSX.Element {
  return (
    <Zone>
      <Grid className="u-no-gutters">
        <Row>
          <Col className="o-col">
            <div className="o-cell--one">
              <UserList canAdd canDelete canEdit id="test" />
            </div>
          </Col>
        </Row>
      </Grid>
    </Zone>
  );
}

export default Users;
