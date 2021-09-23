import React from 'react';
import { Sprout32 } from '@carbon/icons-react';

function ComingSoon() {
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <p>
          <Sprout32 />
        </p>
        <p>Coming soon!</p>
      </div>
    </div>
  );
}

export { ComingSoon };
