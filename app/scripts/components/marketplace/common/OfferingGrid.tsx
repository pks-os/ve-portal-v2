import * as React from 'react';
import * as Col from 'react-bootstrap/lib/Col';
import * as Row from 'react-bootstrap/lib/Row';

import { LoadingSpinner } from '@waldur/core/LoadingSpinner';
import { TranslateProps, withTranslation } from '@waldur/i18n';
import { OfferingsListType } from '@waldur/marketplace/types';

import { OfferingCard } from './OfferingCard';

interface OfferingGridProps extends OfferingsListType {
  width?: number;
}

export const OfferingGrid: React.SFC<OfferingGridProps> = withTranslation((props: OfferingGridProps & TranslateProps) => {
  if (props.loading) {
    return <LoadingSpinner/>;
  }

  if (!props.loaded) {
    return (
      <h3 className="text-center">
        {props.translate('Unable to load marketplace offerings.')}
      </h3>
    );
  }

  if (props.loaded && !props.items.length) {
    return (
      <h3 className="text-center">
        {props.translate('There are no offerings in marketplace yet.')}
      </h3>
    );
  }

  return (
    <Row>
      {props.items.map((offering, index) => (
        <Col key={index} md={props.width} sm={6}>
          <OfferingCard offering={offering}/>
        </Col>
      ))}
    </Row>
  );
});

OfferingGrid.defaultProps = {
  width: 3,
};
