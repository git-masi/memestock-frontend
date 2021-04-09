// Modules
import React from "react";
import { useSelector } from "react-redux";
import { currentGlobalLoaderState } from "./globalLoaderSlice";

// Components
import Portal from "./Portal";
import Loader from "../global/Loader";

function GlobalLoader() {
  const showGlobalLoader = useSelector(currentGlobalLoaderState);
  return <Portal id="globalLoader">{showGlobalLoader && <Loader />}</Portal>;
}

export default GlobalLoader;
