/* eslint-disable react/prop-types */
import React from 'react';
import { Range } from 'react-range';

import 'react-range-slider-input/dist/style.css';
import styles from './RangeSlider.module.scss';

function RangeSlider({
  step, min, max, ...rest
}) {
  const rangeRef = React.useRef();

  const [values, setValues] = React.useState([60]);

  const renderTrack = ({ props, children }) => (
    <div
      {...props}
      style={{
        ...props.style,
        height: '4px',
        width: '100%',
        backgroundColor: '#ECECEC',
      }}
    >
      {children}
    </div>
  );

  const renderThumb = ({ props }) => (
    <div
      {...props}
      style={{
        ...props.style,
        height: '42px',
        width: '50px',
        borderRadius: '4px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // eslint-disable-next-line max-len
        backgroundImage: 'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzYiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCAzNiA0MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfZF8xMTk3XzMzNzApIj4KPHBhdGggZD0iTTEwLjk2MDQgMjUuOTQ5OEwxOC4wMTA3IDMzVjE4Ljg5OTZMMTAuOTYwNCAyNS45NDk4WiIgZmlsbD0iIzAwNDIzNiIvPgo8cGF0aCBkPSJNMjQuOTg5MyAyNS45NDk4TDE3LjkzOTEgMzNWMTguODk5NkwyNC45ODkzIDI1Ljk0OThaIiBmaWxsPSIjMzE5NjgzIi8+CjxwYXRoIGQ9Ik0zMiAxNEMzMiAxNS44Mzg1IDMxLjYzNzkgMTcuNjU5IDMwLjkzNDMgMTkuMzU3NkMzMC4yMzA3IDIxLjA1NjEgMjkuMTk5NSAyMi41OTk1IDI3Ljg5OTUgMjMuODk5NUMyNi41OTk1IDI1LjE5OTUgMjUuMDU2MSAyNi4yMzA3IDIzLjM1NzYgMjYuOTM0M0MyMS42NTkgMjcuNjM3OSAxOS44Mzg1IDI4IDE4IDI4TDE4IDE0SDMyWiIgZmlsbD0iIzMxOTY4MyIvPgo8cGF0aCBkPSJNNCAxNEM0IDEyLjE2MTUgNC4zNjIxMiAxMC4zNDEgNS4wNjU2OSA4LjY0MjQzQzUuNzY5MjUgNi45NDM4NyA2LjgwMDQ5IDUuNDAwNTMgOC4xMDA1MSA0LjEwMDVDOS40MDA1MyAyLjgwMDQ4IDEwLjk0MzkgMS43NjkyNSAxMi42NDI0IDEuMDY1NjlDMTQuMzQxIDAuMzYyMTIxIDE2LjE2MTUgLTguMDM2MzdlLTA4IDE4IDBMMTggMTRINFoiIGZpbGw9IiMzMTk2ODMiLz4KPHBhdGggZD0iTTE4IDI4QzE2LjE2MTUgMjggMTQuMzQxIDI3LjYzNzkgMTIuNjQyNCAyNi45MzQzQzEwLjk0MzkgMjYuMjMwNyA5LjQwMDUzIDI1LjE5OTUgOC4xMDA1IDIzLjg5OTVDNi44MDA0OCAyMi41OTk1IDUuNzY5MjUgMjEuMDU2MSA1LjA2NTY5IDE5LjM1NzZDNC4zNjIxMiAxNy42NTkgNCAxNS44Mzg1IDQgMTRMMTggMTRWMjhaIiBmaWxsPSIjMDA0MjM2Ii8+CjxwYXRoIGQ9Ik0xOCAwQzE5LjgzODUgMCAyMS42NTkgMC4zNjIxMjIgMjMuMzU3NiAxLjA2NTY5QzI1LjA1NjEgMS43NjkyNSAyNi41OTk1IDIuODAwNDkgMjcuODk5NSA0LjEwMDUxQzI5LjE5OTUgNS40MDA1MyAzMC4yMzA3IDYuOTQzODcgMzAuOTM0MyA4LjY0MjQzQzMxLjYzNzkgMTAuMzQxIDMyIDEyLjE2MTUgMzIgMTRMMTggMTRWMFoiIGZpbGw9IiMwMDQyMzYiLz4KPGNpcmNsZSByPSIxMC41IiB0cmFuc2Zvcm09Im1hdHJpeCgxIDAgMCAtMSAxOC41IDEzLjUpIiBmaWxsPSIjNzNEQkE5IiBmaWxsLW9wYWNpdHk9IjAuNDUiLz4KPC9nPgo8ZGVmcz4KPGZpbHRlciBpZD0iZmlsdGVyMF9kXzExOTdfMzM3MCIgeD0iMCIgeT0iMCIgd2lkdGg9IjM2IiBoZWlnaHQ9IjQxIiBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiI+CjxmZUZsb29kIGZsb29kLW9wYWNpdHk9IjAiIHJlc3VsdD0iQmFja2dyb3VuZEltYWdlRml4Ii8+CjxmZUNvbG9yTWF0cml4IGluPSJTb3VyY2VBbHBoYSIgdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDEyNyAwIiByZXN1bHQ9ImhhcmRBbHBoYSIvPgo8ZmVPZmZzZXQgZHk9IjQiLz4KPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMiIvPgo8ZmVDb21wb3NpdGUgaW4yPSJoYXJkQWxwaGEiIG9wZXJhdG9yPSJvdXQiLz4KPGZlQ29sb3JNYXRyaXggdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAuMjE2NjY3IDAgMCAwIDAgMC4xNzU5MDggMCAwIDAgMC4xNSAwIi8+CjxmZUJsZW5kIG1vZGU9Im5vcm1hbCIgaW4yPSJCYWNrZ3JvdW5kSW1hZ2VGaXgiIHJlc3VsdD0iZWZmZWN0MV9kcm9wU2hhZG93XzExOTdfMzM3MCIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9ImVmZmVjdDFfZHJvcFNoYWRvd18xMTk3XzMzNzAiIHJlc3VsdD0ic2hhcGUiLz4KPC9maWx0ZXI+CjwvZGVmcz4KPC9zdmc+Cg==")',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        outline: 'none',
      }}
    >
      <div className={styles.labeled}>
        <span style={{ whiteSpace: 'nowrap' }}>
          {values}
          <em style={{ color: 'rgba(255, 255, 255, 0.52)', fontStyle: 'normal' }}>min</em>
        </span>
      </div>
    </div>
  );

  return (
    <>
      <Range
        ref={rangeRef}
        className={styles.rangeslider}
        step={step}
        min={min}
        max={max}
        values={values}
        onChange={(e) => setValues(e)}
        renderMark={({ props, index }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '10px',
              width: '1px',
              backgroundColor: index * step < values[0] ? '#F5D842' : '#ECECEC',
            }}
          />
        )}
        renderTrack={renderTrack}
        renderThumb={renderThumb}
        {...rest}
      />
      <div className={styles.bottom__text}>
        <p>
          {min}
          <span>m</span>
        </p>
        <p>
          {max}
          <span>m</span>
        </p>
      </div>
    </>
  )
}

export default RangeSlider;
