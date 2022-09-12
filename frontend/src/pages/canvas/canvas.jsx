import React from 'react';
import styles from './canvas.module.css';
import { HexColorPicker } from 'react-colorful';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShareNodes,
  faFillDrip,
  faPaintbrush,
  faArrowRotateLeft,
  faPalette,
} from '@fortawesome/free-solid-svg-icons';
import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/header';
import { authStore, colorStore } from '../../shared/store';
import AlertBar from '../../components/alertBar';

const Canvas = () => {
  let navigate = useNavigate();
  const userAccess = authStore((state) => state.userAccess);
  const [alertBar, setAlertBar] = useState(false);

  const location = useLocation();
  // let imgSrc = location.state.imgSrc;
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

  
  // ------------------------- 컨버스 코드 시작
  const [showPalette, setshowPalette] = useState(false); // 아코디언 메뉴 표시 state
  const [showBrush, setShowBrush] = useState(false); // 브러쉬 사이즈 state
  const [color, setColor] = useState('#000000'); // 색상 변경 state
  const [colorData, setColorData] = useState(undefined)
  const [outlineData, setOutlineData] = useState(undefined);
  const [brushSize, setBrushSize] = useState(1); // 브러쉬 사이즈
  const [canvasWidth, setCanvasWidth] = useState(350); // 캔버스 가로
  const [canvasHeight, setCanvasHeight] = useState(350); // 캔버스 세로
  const [context, setContext] = useState(undefined);

  const outlineImage = new Image();
  const backgroundImage = new Image();
  
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 350;
    canvas.height = 350;
    setCanvasWidth(canvas.width);
    setCanvasHeight(canvas.height);
    setContext(canvas.getContext('2d'));
    // init();
  });

  // 캔버스 초기화: 컨버스 요소 생성, 이미지 로드, 이벤트 추가
  const init = () => {
    backgroundImage.src = 'images/background.png';
    // backgroundImage.onload = resourceLoaded; // 이미지 로드 후 렌더링하기

    outlineImage.src = '/media/canvas/line/yellow1.png';

    outlineImage.onload = () => {
      context?.drawImage(outlineImage, 0, 0, canvasWidth, canvasHeight);

      // try {
      //   // getImageData로 컨버스에 그려진 이미지 픽셀정보 얻기
        setOutlineData(context.getImageData(0, 0, canvasWidth, canvasHeight)); // x, y(위치)와 너비, 높이(치수)
      // } catch (error) {
      //   window.alert("Application cannot be run locally. Please run on a server.");
      //   return;
      // }

      // clearCanvas(); // 컨버스 초기화
      setColorData(context.getImageData(0, 0, canvasWidth, canvasHeight)); // 각 픽셀에 대한 imageData 객체의 (R,G,B,A) 값을 받아옴
      // resourceLoaded();
    }
  }

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
              // onClick={() => undoHandler()}
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
          <canvas 
            ref={canvasRef}
            width='500'
            height='500'
            id={styles.canvas}
          />
        </div>

      </div>
    </>
  );
};

export default Canvas;
