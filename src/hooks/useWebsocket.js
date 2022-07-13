import React from 'react';

export const useWebsocket = (options) => {
  const websocket_enabled = React.useRef(true);
  const socket = new WebSocket(options?.address ?? 'ws://localhost:4444');
  const controller = new AbortController();
  const controller_options = { signal: controller.signal };
  const onOpen_fallback = () => console.log('[connected]');

  // Websocket event listeners
  React.useEffect(() => {
    if (websocket_enabled.current) {
      socket.addEventListener('open', onOpen_fallback, controller_options);
      socket.addEventListener('message', options.onMessage, controller_options);
      websocket_enabled.current = false;
    }
  }, []);

  return { abort: controller.abort };
};
