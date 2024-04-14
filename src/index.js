const WebSocket = require("ws");

class CTFApiClient {
  constructor(serverUrl) {
    this.serverUrl = serverUrl;
    this.ws = new WebSocket(serverUrl);

    // Handle WebSocket events
    this.ws.on("open", () => {
      console.log("Connected to the server");
    });

    this.ws.on("close", () => {
      console.log("Connection closed");
    });

    this.ws.on("message", (data) => {
      this.handleMessage(data);
    });

    this.requests = {};
    this.requestId = 0;
  }

  // Send a request to the server and return a promise
  sendRequest(type, payload) {
    const requestId = this.requestId++;
    const request = {
      requestId,
      type,
      payload,
    };
    this.ws.send(JSON.stringify(request));

    // Return a promise that resolves when the response is received
    return new Promise((resolve, reject) => {
      this.requests[requestId] = { resolve, reject };
    });
  }

  // Handle incoming messages from the server
  handleMessage(data) {
    const response = JSON.parse(data);
    const { requestId, result, error } = response;

    if (error) {
      this.requests[requestId].reject(error);
    } else {
      this.requests[requestId].resolve(result);
    }

    delete this.requests[requestId];
  }

  // API method to get teams
  getTeams() {
    return this.sendRequest("getTeams", {});
  }

  // API method to check if the game is running
  isGameRunning() {
    return this.sendRequest("isGameRunning", {});
  }
}
function loader(bot) {
  const serverUrl = "ws://192.168.8.100:7890";

  const apiClient = new CTFApiClient(serverUrl);

  bot.ctfApi = apiClient;
}

module.exports = loader;
