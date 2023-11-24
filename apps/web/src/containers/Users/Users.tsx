import type { JSX } from 'react';
import './index.scss';

import { Col } from 'ui/components/layouts/Col/Col';
import UserList from '@/containers/UserList/UserList';
import { Zone } from 'ui/components/layouts/Zone/Zone';
import { Grid } from 'ui/components/layouts/Grid/Grid';
import { Row } from 'ui/components/layouts/Row/Row';

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
