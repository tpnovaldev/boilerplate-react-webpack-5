import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RangeSlider, Button } from '../../../components';

const STEP = 15;
const MIN = 15;
const MAX = 120;

function HowToPlayModal() {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/start-your-game#team');
  }

  return (
    <>
      <ul>
        <li>
          Vestibulum eu quam nec neque pellentesque efficitur id eget nisl. Proin porta est convallis lacus blandit
        </li>
        <li>
          Pretium sed non enim. Maecenas lacinia non orci at aliquam.
        </li>
        <li>
          Donec finibus, urna bibendum ultricies laoreet, augue eros luctus sapien, ut euismod leo tortor ac enim.
        </li>
      </ul>
      <p style={{ display: 'block', marginBottom: '48rem' }}>
        <b>
          A session of TeamConnector may require
          {' '}
          <mark>± 60 minutes</mark>
          {' '}
          to finish.
        </b>
      </p>
      <RangeSlider step={STEP} min={MIN} max={MAX} />
      <br />
      <br />
      <br />
      <Button type="button" onClick={handleNext}>
        <span>Next</span>
      </Button>
    </>
  )
}

export default HowToPlayModal;
