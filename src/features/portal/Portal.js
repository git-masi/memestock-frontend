// Modified from this:
//    https://www.jayfreestone.com/writing/react-portals-with-hooks/

import React from "react";
import { createPortal } from "react-dom";
import usePortal from "../../hooks/usePortal";

const Portal = (props) => {
  const { id, children } = props;
  const target = usePortal(id);
  return <>{createPortal(children, target)}</>;
};

export default Portal;
