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

  const shareKakao = () => {
    // kakao sdk script 부른 후 window.kakao로 접근
    if (window.Kakao) {
      const kakao = window.Kakao;

      if(!kakao.isInitialized()) {
        kakao.init('자바스크립트 키');
      }

      kakao.Link.sendDefault({
        objectType: "feed",
        content: {
          title: "colrapy: 결과물",
          description: "AI 컬러테라피 결과물",
          imageUrl: "이미지 주소",
          link: {
            mobileWebUrl: "공유할 url 주소",
            webUrl: "공유할 url 주소"
          }
        }
      });
    }
  }

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

  if(userAccess === false) {
    return <Error accessNot={true} />
  }
  
  // 공유하기 기능 추가
  // useEffect(() => { 
  //   const script:
  // })


  const nowColor = { color: color };
  const import_background = lineImgs[imgSrc];

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
            <FontAwesomeIcon
              className={styles.icon_share}
              icon={faShareNodes}
              onClick={() => shareKakao}
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
