import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { sendTabMessage, getMessage } from '@carbon/devtools-utilities';
import { Button } from 'carbon-components-react';
import { ChevronLeft16 } from '@carbon/icons-react';

function Validation({ panelControls }) {
  const [pageGrades, setPageGrades] = useState({});

  useEffect(() => {
    sendTabMessage(-1, { requestPageGrade: true });

    getMessage((msg) => {
      if (msg.pageGrades) {
        setPageGrades(msg.pageGrades);
      }
    });
  }, []);

  return (
    <>
      <Button kind="secondary" onClick={() => panelControls.close('validate')}>
        <ChevronLeft16 style={{ marginRight: 8 }} />
        Back
      </Button>
      <p>{JSON.stringify(pageGrades)}</p>
    </>
  );
}

Validation.propTypes = {
  panelControls: PropTypes.func,
};

export { Validation };
