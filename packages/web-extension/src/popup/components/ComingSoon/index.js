import React from 'react';
import { Sprout } from '@carbon/icons-react';

function ComingSoon() {
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <div style={{ textAlign: 'center' }}>
        <p>
          <Sprout width="32" style={{ fill: 'currentColor' }} />
        </p>
        <p>Coming soon!</p>
      </div>
    </div>
  );
}

export { ComingSoon };
