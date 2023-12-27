import React from "react";

const width = 900;
const height = 500;
const centerX = width / 2;
const centerY = height / 2;
export const AreaContext = React.createContext({width: width, height: height, centerX: centerX, centerY: centerY})