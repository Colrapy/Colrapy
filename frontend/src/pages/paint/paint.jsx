import React from 'react';
import styles from './paint.module.css';
import { HexColorPicker } from 'react-colorful';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCloudArrowDown,
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
import { colorStore } from '../../shared/store';

const Paint = () => {
  let navigate = useNavigate();
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
    alert('완성하셨나요? 1초 뒤 페이지가 전환됩니다.');
    setTimeout(() => {
      navigate('/canvas/poll');
    }, 1000);
  };

  const [showPalette, setshowPalette] = useState(false); // 아코디언 메뉴 표시 state
  const [showBrush, setShowBrush] = useState(false); // 브러쉬 사이즈 state
  const [color, setColor] = useState('#000000'); // 색상 변경 state
  const [brushSize, setBrushSize] = useState(1); // 브러쉬 사이즈
  const canvas_ref = useRef(null); // 컨버스의 DOM값 가져오기

  // 뒤로가기
  const canvasRef = React.createRef();
  const undoHandler = () => {
    const undo = canvasRef.current.undo;

    if (undo) {
      undo();
    }
  };

  // 이미지 내보내기
  const exportImageHandler = (resolve, reject) => {
    try {
      const canvas = canvasRef.current;
      if (!canvas) throw Error('Canvas not rendered yet');
      // const {sageCanvas, width, height} = getCanvasWithViewBox(canvas);

      const canvasSketch = `data:image/svg+xml;base64`;
      console.log(canvasSketch);
    } catch (error) {
      console.log('error');
    }
  };

  // 마우스가 눌렸을때만 커서의 움직임 그리기
  // 마우스가 클릭되었는지 안되었는지를 저장하는 state 생성
  const [isPainting, setIsPainting] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // 좌표를 얻는 함수
  const getCoordinates = (e) => {
    if (!canvas_ref.current) {
      return;
    }
    const canvas = canvas_ref.current;

    return {
      // x: e.clientX - e.target.offsetLeft,
      // y: e.clientY - e.target.offsetTop
      x: e.pageX - canvas.offsetLeft,
      y: e.pageY - canvas.offsetTop,
    };
  };

  // canvas에 선 그리기
  const drawLine = (originalPosition, newMousePosition) => {
    if (!canvas_ref.current) {
      return;
    }
    const canvas = canvas_ref.current;
    const context = canvas.getContext('2d');

    if (context) {
      context.strokeStyle = color; // 선 색깔
      context.lineJoin = 'round'; // 선 끄트머리
      context.lineWidth = brushSize; //선 굵기

      context.beginPath();
      context.moveTo(originalPosition.x, originalPosition.y);
      context.lineTo(newMousePosition.x, newMousePosition.y);
      context.closePath();
      context.stroke();
    }
  };

  // paint 시작
  const startPaint = useCallback((e) => {
    const coordinates = getCoordinates(e);
    if (coordinates) {
      setIsPainting(true);
      setMousePosition(coordinates);
    }
  }, []);

  const paint = useCallback(
    (e) => {
      e.preventDefault(); // 드래그 방지
      e.stopPropagation(); // 드래그 방지

      if (isPainting) {
        const newMousePosition = getCoordinates(e);
        if (mousePosition && newMousePosition) {
          drawLine(mousePosition, newMousePosition);
          setMousePosition(newMousePosition);
        }
      }
    },
    [isPainting, mousePosition]
  );

  const exitPaint = useCallback(() => {
    setIsPainting(false);
  }, []);

  useEffect(() => {
    if (!canvas_ref.current) {
      return;
    }
    const canvas = canvas_ref.current;

    canvas.addEventListener('mousedown', startPaint);
    canvas.addEventListener('mousemove', paint);
    canvas.addEventListener('mouseup', exitPaint);
    canvas.addEventListener('mouseleave', exitPaint);

    return () => {
      // Unmount 시 이벤트 리스터 제거
      canvas.removeEventListener('mousedown', startPaint);
      canvas.removeEventListener('mousemove', paint);
      canvas.removeEventListener('mouseup', exitPaint);
      canvas.removeEventListener('mouseleave', exitPaint);
    };
  }, [startPaint, paint, exitPaint]);

  const nowColor = { color: color };
  const import_background = lineImgs[imgSrc];

  return (
    <>
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
            <FontAwesomeIcon
              className={styles.icon_save}
              icon={faCloudArrowDown}
              onClick={() => exportImageHandler()}
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
            strokeWidth={brushSize}
            strokeColor={color}
            backgroundImage={import_background}
            exportWithBackgroundImage={true}
          />
          {/* <Canvas /> */}
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
