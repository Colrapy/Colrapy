import React from 'react';
import styles from './canvas.module.css';
import { ReactSketchCanvas } from 'react-sketch-canvas';

import { useState, useRef, useEffect } from 'react';
import { useCallback } from 'react';

const Canvas = (props) => {
  return (
    <div className={styles.paint_box}>
      <div className={styles.canvas_container}>
        <ReactSketchCanvas />
      </div>
    </div>
  );
};

export default Canvas;
