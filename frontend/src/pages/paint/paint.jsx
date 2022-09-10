import React from 'react';
import styles from './paint.module.css';
import { HexColorPicker } from 'react-colorful';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShareNodes,
  faFillDrip,
  faPaintbrush,
  faArrowRotateLeft,
  faPalette,
} from '@fortawesome/free-solid-svg-icons';
import Button from '../../components/button';
import { useState, useRef, useEffect } from 'react';
import { useCallback } from 'react';
import Canvas from '../canvas/canvas';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/header';
import { authStore, colorStore } from '../../shared/store';
import Error from '../error/error';
import AlertBar from '../../components/alertBar';

const Paint = () => {
  let navigate = useNavigate();
  const userAccess = authStore((state) => state.userAccess);
  const [alertBar, setAlertBar] = useState(false);

  const location = useLocation();
  let imgSrc = location.state.imgSrc;
  const colors = colorStore((state) => state.colors);
  const lineImgs = colorStore((state) => state.lineImgs);

  const colorList = colors.map((color) => {
    return (
      <li
        key={color.code}
        className={styles.reco_color}
        style={{ backgroundColor: color.code }}
        onClick={() => setColor(color.code)}
      ></li>
    );
  });

  const handleClick = (e) => {
    e.preventDefault();
    setAlertBar(true);
    setTimeout(() => {
      navigate('/canvas/poll');
    }, 2000);
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src="https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);


  const [showPalette, setshowPalette] = useState(false); // 아코디언 메뉴 표시 state
  const [showBrush, setShowBrush] = useState(false); // 브러쉬 사이즈 state
  const [color, setColor] = useState('#000000'); // 색상 변경 state
  const [brushSize, setBrushSize] = useState(1); // 브러쉬 사이즈
  // 뒤로가기
  const canvasRef = React.createRef();
  const undoHandler = () => {
    const undo = canvasRef.current.undo;

    if (undo) {
      undo();
    }
  };

  const nowColor = { color: color };
  // const import_background = lineImgs[imgSrc];
  const import_background = '/media/canvas/line/yellow1.jpg';

  return (
    <>
      { alertBar && <AlertBar alert_text={'완성하셨나요? 곧 페이지가 전환됩니다.'} alert_color={'green'}/> }
      <Header whiteback={true} />
      <div className={styles.content}>
        <div className={styles.controlbar_box}>
          <div className={styles.control_element}>
            <FontAwesomeIcon
              className={styles.icon_undo}
              icon={faArrowRotateLeft}
              onClick={() => undoHandler()}
            />
          </div>
          <div className={styles.control_element}>
            <FontAwesomeIcon className={styles.icon_fill} icon={faFillDrip} />
          </div>
          <div className={styles.control_element}>
            <FontAwesomeIcon
              className={styles.icon_brush}
              icon={faPaintbrush}
              onClick={() => setShowBrush(!showBrush)}
            />
          </div>
          <div className={styles.control_element}>
            <FontAwesomeIcon
              className={styles.icon_color}
              icon={faPalette}
              style={nowColor}
              onClick={() => setshowPalette(!showPalette)}
            />
          </div>
          <div className={styles.control_element}>
            {/* <KakaoButton /> */}
            <FontAwesomeIcon
              className={styles.icon_share}
              icon={faShareNodes}
            />
          </div>
        </div>
        {showBrush ? (
          <div className={styles.controlbar_accordion}>
            <div className={styles.brush_wrap}>
              <div className={styles.brush_box}>
                <div
                  className={styles.brush_size}
                  style={{ fontSize: '10px', color: color }}
                  onClick={() => setBrushSize(3)}
                >
                  ●
                </div>
                <div
                  className={styles.brush_size}
                  style={{ fontSize: '15px', color: color }}
                  onClick={() => setBrushSize(6)}
                >
                  ●
                </div>
                <div
                  className={styles.brush_size}
                  style={{ fontSize: '20px', color: color }}
                  onClick={() => setBrushSize(10)}
                >
                  ●
                </div>
                <div
                  className={styles.brush_size}
                  style={{ fontSize: '25px', color: color }}
                  onClick={() => setBrushSize(15)}
                >
                  ●
                </div>
                <div
                  className={styles.brush_size}
                  style={{ fontSize: '30px', color: color }}
                  onClick={() => setBrushSize(20)}
                >
                  ●
                </div>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
        {showPalette ? (
          <div className={styles.controlbar_accordion}>
            <div className={styles.recommand_box}>{colorList}</div>
            <div className={styles.responsive}>
              <HexColorPicker color={color} onChange={setColor} />
            </div>
          </div>
        ) : (
          ''
        )}
        <div className={styles.canvas_container}>
          <ReactSketchCanvas
            ref={canvasRef}
            height="350px"
            width="350px"
            strokeWidth={brushSize}
            strokeColor={color}
            backgroundImage={import_background}
            exportWithBackgroundImage={true}
            className={styles.canvasElement}
          />
          {/* <Canvas 
            ref={canvasRef}
            strokeWidth={brushSize}
            strokeColor={color}
            className={styles.canvasElement}
          /> */}
        </div>
        <Button
          content={'완성했어요!'}
          _onClick={handleClick}
          whiteback={true}
        />
      </div>
    </>
  );
};

export default Paint;
