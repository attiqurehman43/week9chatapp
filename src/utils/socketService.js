import io from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3001';

class WSService {
  initializeSocket = async () => {
    try {
      this.socket = io(SOCKET_URL, {
        transports: ['websocket'],
      });
      console.log('initializing socket', this.socket);

      this.socket.on('connect', data => {
        console.log('=== Socket Connected ===');
      });

      this.socket.on('disconnect', data => {
        console.log('=== Socket disconnected ===');
      });

      // this.socket.on('connect', data => {
      //   console.log('=== Socket Error? ===', data);
      // });
    } catch (error) {
      console.log('error is not initialized', error);
    }
  };

  emit(event, data = {}) {
    this.socket.emit(event, data);
  }
  on(event, cb = {}) {
    this.socket.on(event, cb);
  }
  removeListener(listenerName) {
    this.socket.removeListener(listenerName);
  }
}

const socketServices = new WSService();

export default socketServices;
