$(document).ready(() => {
  const socket = io("http://localhost:5000");

  socket.on("connect", () => {
    console.log("Connected to Socket.IO server");
  });

  socket.on("newMessage", ({ message }) => {
    $(".message").html(message.message);
    console.log(`MESSAGE: ${message.message}`);
  });
});
