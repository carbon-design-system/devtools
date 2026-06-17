import React from 'react';
import Sprout from '@carbon/icons/svg/32/sprout.svg';
import settings from 'carbon-components/es/globals/js/settings';
import './index.scss';

const { prefix } = settings;

function ComingSoon() {
  return (
    <div className={`${prefix}--coming-soon`}>
      <div className={`${prefix}--coming-soon__inner`}>
        <p>
          <Sprout width="32" className={`${prefix}--coming-soon__icon`} />
        </p>
        <p>Coming soon!</p>
      </div>
    </div>
  );
}

export { ComingSoon };
