import { io } from 'socket.io-client';

// Replace with your computer's IP address (e.g., 'http://192.168.1.5:3001')
// so that phones on the same Wi-Fi can connect.
const SOCKET_URL = 'http://localhost:3001'; 

export const socket = io(SOCKET_URL, {
  autoConnect: true,
});

export const sendOrder = (order) => {
  socket.emit('send-order', order);
};

export const onNewOrder = (callback) => {
  socket.on('new-order', callback);
  return () => socket.off('new-order', callback);
};

export const onInitialOrders = (callback) => {
  socket.on('initial-orders', callback);
  return () => socket.off('initial-orders', callback);
};

export const updateOrderStatus = (id, status) => {
  socket.emit('update-order-status', { id, status });
};
