import React from "react";

const width = window.innerWidth * 0.75;
const height = window.innerHeight * 0.5;
const centerX = width / 2;
const centerY = height / 2;
export const AreaContext = React.createContext({width: width, height: height, centerX: centerX, centerY: centerY})