import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactJson from 'react-json-view';

export const JsonVisualizer = ({ index, json, onToggle }) => {
  const logRef = React.useRef();
  const open = React.useRef(false);
  const handleToggle = (mutationList) => {
    mutationList.forEach((mutation) => {
      if (mutation.attributeName === 'class') {
        open.current = !open.current;
        const payload = { isOpen: open.current, index };
        onToggle(payload);
      }
    });
  };
  const mutationObserver = onToggle && new MutationObserver(handleToggle);

  React.useEffect(() => {
    if (mutationObserver) {
      const elem = findDOMNode(logRef.current).getElementsByClassName('node-ellipsis')[0];
      mutationObserver.observe(elem, { attributes: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ReactJson
      name={String(typeof json)}
      collapsed={0}
      iconStyle="circle"
      displayDataTypes={false}
      indentWidth={7}
      displayObjectSize={false}
      style={{ fontSize: 15, fontFamily: 'Roboto Mono', lineHeight: '120%' }}
      ref={logRef}
      theme={{
        base00: 'transparent',
        base01: '#ddd',
        base02: '#4C566A', // Gray
        base03: 'white', // ???
        base04: 'white', // ???
        base05: 'white', // ???
        base06: 'white', // ???
        base07: '#FFA59B', // RED
        base08: 'white',
        base09: '#BEFFB4', // GREEN
        base0A: 'white',
        base0B: '#FFBC32', // Orange
        base0C: '#4C566A', // Gray
        base0D: 'white',
        base0E: '#88C0D0', // Blue
        base0F: '#FFBC32',
      }}
      src={json}
    />
  );
};
