// import the react-json-view component
import { Box, Typography, Fade } from '@mui/material';
import React from 'react';
import ReactJson from 'react-json-view';
import Fab from '@mui/material/Fab';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { TitleBar } from '../components/TitleBar';
import { toJSON, fromJSON, stringify, parse } from 'flatted';
import { useWebsocket } from '../hooks/useWebsocket';
import { JsonVisualizer } from '../components/JsonVisualizer';

const TITLE_BAR_H = 42;

const test = new Array(20).fill({
  string: 'this is a test string',
  integer: 42,
  array: [1, 2, 3, 'test', null],
  float: 3.14159,
  object: {
    'first-child': true,
    'second-child': false,
    'last-child': null,
  },
  string_number: '1234',
  date: '2022-07-12T02:06:25.435Z',
  lol: () => {
    console.log('yay');
  },
});

export const Main = () => {
  const [history, setHistory] = React.useState([...test]);
  const scroll = React.useRef();
  const bottomRef = React.useRef();
  useWebsocket({
    onMessage: async (e) => {
      try {
        const data = JSON.parse(e.data);
        setHistory((o) => [...o, data]);
        scrollToBottom();
      } catch (e) {
        setHistory((o) => [...o, e.data]);
      }
    },
  });

  const scrollToBottom = () => {
    bottomRef.current.scrollIntoView();
  };

  const handleToggle = (e) => {
    if (e.index + 1 === history.length && e.index) scrollToBottom();
  };

  const Block = ({ children, onToggle }) => {
    return <Box sx={{ borderBottom: '1px solid #4C566A', py: 2, px: 2 }}>{children}</Box>;
  };

  // if (!history.length) return <></>; // TODO: watermark

  return (
    <>
      <TitleBar height={TITLE_BAR_H} title={'Logger'} />

      <Box
        ref={scroll}
        className="sc3"
        style={{
          height: `calc(100vh - ${TITLE_BAR_H}px)`,
          overflowX: 'hidden',
        }}
      >
        {history.map((item, index) => {
          if (typeof item === 'string')
            return (
              <Block key={index}>
                <Typography color={'primary'} component="span">
                  Text:
                </Typography>{' '}
                <Typography component="span">{item}</Typography>
              </Block>
            );
          return (
            <Block key={index} onToggle={handleToggle}>
              <JsonVisualizer index={index} json={item} onToggle={handleToggle} />
            </Block>
          );
        })}
        <div ref={bottomRef} />
      </Box>

      <Box sx={{ position: 'fixed', bottom: 0, right: 0, margin: 5 }}>
        <Fade in={true}>
          <Fab onClick={scrollToBottom} color="secondary">
            <KeyboardArrowDownIcon color={'text'} />
          </Fab>
        </Fade>
      </Box>
    </>
  );
};
