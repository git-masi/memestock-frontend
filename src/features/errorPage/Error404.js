// Modules
import React from "react";

// Styles
import styles from "./Error404.module.css";

function Error404() {
  return (
    <div className={styles.container}>
      <h1>Page Not Found</h1>
      <p>Sorry, there are no memes or stocks to see here</p>
    </div>
  );
}

export default Error404;
