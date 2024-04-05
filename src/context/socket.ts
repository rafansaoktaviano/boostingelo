import Cookies from "js-cookie";
import React, { createContext } from "react";
import {connect} from "socket.io-client";

export const socket = connect("http://localhost:5000", {
  auth: {
    token: Cookies.get("token"),
    sessionId: Cookies.get("session"),
  },
});

export const SocketContext = createContext(socket);
 