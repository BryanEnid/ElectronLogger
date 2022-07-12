// import the react-json-view component
import { Box, Typography, Fade } from '@mui/material';
import React from 'react';
import ReactJson from 'react-json-view';
import Fab from '@mui/material/Fab';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { TitleBar } from '../components/TitleBar';
import { toJSON, fromJSON, stringify, parse } from 'flatted';

const TITLE_BAR_H = 42;
const websocket_enabled = true;

const test = new Array(10).fill({
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
  const [history, setHistory] = React.useState([]);
  const scroll = React.useRef(null);

  const log = (obj) => setHistory((x) => [...x, obj]);

  // Websocket event listeners
  React.useEffect(() => {
    if (websocket_enabled) {
      const socket = new WebSocket('ws://localhost:4444');
      const controller = new AbortController();
      socket.addEventListener('open', () => console.log('[connected]'), {
        signal: controller.signal,
      });
      socket.addEventListener(
        'message',
        (e) => {
          let data = e.data;
          if (typeof e.data !== 'string') data = JSON.parse(e.data);
          setHistory((o) => [...o, data]);
        },
        { signal: controller.signal }
      );

      // eslint-disable-next-line react-hooks/exhaustive-deps
      return () => {
        controller.abort();
      };
    }
  }, []);

  //   React.useEffect(() => {
  //     // console.log(scroll);
  //     // const x = JSON.parse(stringify(scroll));
  //     // log(JSON.parse(stringify(scroll)));
  //     console.log(scroll);
  //     console.log(RecursiveMap.toJSON(scroll));
  //     log('here');
  //     log('again?');
  //     // log(parse(stringify(scroll)));
  //     // console.log();
  //     // log(scroll);
  //     // log(scroll);
  //     // const res = JSON.stringify(scroll.current);
  //     // log(res);

  //     return () => {
  //       setHistory([]);
  //     };
  //   }, [scroll]);

  const Block = ({ children }) => {
    return <Box sx={{ borderBottom: '1px solid #4C566A', py: 2, px: 2 }}>{children}</Box>;
  };

  if (!history.length) return <></>; // TODO: watermark

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
            <Block key={index}>
              <ReactJson
                name={String(typeof item)}
                iconStyle="circle"
                displayDataTypes={false}
                indentWidth={7}
                displayObjectSize={false}
                style={{ fontSize: 15, fontFamily: 'Roboto Mono', lineHeight: '120%' }}
                theme={{
                  base00: 'transparent',
                  base01: '#ddd',
                  base02: '#4C566A', // Gray
                  base03: 'white', // ???
                  base04: 'white', // ???
                  base05: 'red', // ???
                  base06: 'red', // ???
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
                src={item}
              />
            </Block>
          );
        })}
      </Box>

      <Box sx={{ position: 'fixed', bottom: 0, right: 0, margin: 5 }}>
        <Fade in={true}>
          <Fab color="secondary">
            <KeyboardArrowDownIcon color={'text'} />
          </Fab>
        </Fade>
      </Box>
    </>
  );
};
