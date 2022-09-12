import * as React from 'react';
import Paths, { SvgPath } from './path';
const loadImage = (url) => new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener('load', () => {
        if (img.width > 0) {
            resolve(img);
        }
        reject('Image not found');
    });
    img.addEventListener('error', (err) => reject(err));
    img.src = url;
    img.setAttribute('crossorigin', 'anonymous');
});

function getCanvasWithViewBox(canvas) {
    var _a;
    const svgCanvas = (_a = canvas.firstChild) === null || _a === void 0 ? void 0 : _a.cloneNode(true);
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    svgCanvas.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svgCanvas.setAttribute('width', width.toString());
    svgCanvas.setAttribute('height', height.toString());
    return { svgCanvas, width, height };
}

export const Canvas = React.forwardRef((props, ref) => {
    const { paths, isDrawing, onPointerDown, onPointerMove, onPointerUp, id = 'react-sketch-canvas', width = '100%', height = '100%', className = 'react-sketch-canvas', canvasColor = 'red', backgroundImage = '', exportWithBackgroundImage = false, preserveBackgroundImageAspectRatio = 'none', allowOnlyPointerType = 'all', style = {
        border: '0.0625rem solid #9c9c9c',
        borderRadius: '0.25rem',
    }, svgStyle = {}, } = props;
    const canvasRef = React.useRef(null);
    // Converts mouse coordinates to relative coordinate based on the absolute position of svg
    const getCoordinates = (pointerEvent) => {
        var _a, _b, _c;
        const boundingArea = (_a = canvasRef.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
        const scrollLeft = (_b = window.scrollX) !== null && _b !== void 0 ? _b : 0;
        const scrollTop = (_c = window.scrollY) !== null && _c !== void 0 ? _c : 0;
        if (!boundingArea) {
            return { x: 0, y: 0 };
        }
        const point = {
            x: pointerEvent.pageX - boundingArea.left - scrollLeft,
            y: pointerEvent.pageY - boundingArea.top - scrollTop,
        };
        return point;
    };
    /* Mouse Handlers - Mouse down, move and up */
    const handlePointerDown = (event) => {
        // Allow only chosen pointer type
        if (allowOnlyPointerType !== 'all' &&
            event.pointerType !== allowOnlyPointerType) {
            return;
        }
        if (event.pointerType === 'mouse' && event.button !== 0)
            return;
        const point = getCoordinates(event);
        onPointerDown(point);
    };
    const handlePointerMove = (event) => {
        if (!isDrawing)
            return;
        // Allow only chosen pointer type
        if (allowOnlyPointerType !== 'all' &&
            event.pointerType !== allowOnlyPointerType) {
            return;
        }
        const point = getCoordinates(event);
        onPointerMove(point);
    };
    const handlePointerUp = (event) => {
        if (event.pointerType === 'mouse' && event.button !== 0)
            return;
        // Allow only chosen pointer type
        if (allowOnlyPointerType !== 'all' &&
            event.pointerType !== allowOnlyPointerType) {
            return;
        }
        onPointerUp();
    };
    /* Mouse Handlers ends */
    React.useImperativeHandle(ref, () => ({
        exportImage: (imageType) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const canvas = canvasRef.current;
                    if (!canvas) {
                        throw Error('Canvas not rendered yet');
                    }
                    const { svgCanvas, width, height } = getCanvasWithViewBox(canvas);
                    const canvasSketch = `data:image/svg+xml;base64,${btoa(svgCanvas.outerHTML)}`;
                    const loadImagePromises = [await loadImage(canvasSketch)];
                    if (exportWithBackgroundImage) {
                        try {
                            const img = await loadImage(backgroundImage);
                            loadImagePromises.push(img);
                        }
                        catch (error) {
                            console.warn('exportWithBackgroundImage props is set without a valid background image URL. This option is ignored');
                        }
                    }
                    Promise.all(loadImagePromises)
                        .then((images) => {
                        const renderCanvas = document.createElement('canvas');
                        renderCanvas.setAttribute('width', width.toString());
                        renderCanvas.setAttribute('height', height.toString());
                        const context = renderCanvas.getContext('2d');
                        if (!context) {
                            throw Error('Canvas not rendered yet');
                        }
                        images.reverse().forEach((image) => {
                            context.drawImage(image, 0, 0);
                        });
                        resolve(renderCanvas.toDataURL(`image/${imageType}`));
                    })
                        .catch((e) => {
                        throw e;
                    });
                }
                catch (e) {
                    reject(e);
                }
            });
        },
        exportSvg: () => {
            return new Promise((resolve, reject) => {
                var _a, _b, _c;
                try {
                    const canvas = (_a = canvasRef.current) !== null && _a !== void 0 ? _a : null;
                    if (canvas !== null) {
                        const { svgCanvas } = getCanvasWithViewBox(canvas);
                        if (exportWithBackgroundImage) {
                            resolve(svgCanvas.outerHTML);
                            return;
                        }
                        (_b = svgCanvas.querySelector(`#${id}__background`)) === null || _b === void 0 ? void 0 : _b.remove();
                        (_c = svgCanvas
                            .querySelector(`#${id}__canvas-background`)) === null || _c === void 0 ? void 0 : _c.setAttribute('fill', canvasColor);
                        resolve(svgCanvas.outerHTML);
                    }
                    reject(new Error('Canvas not loaded'));
                }
                catch (e) {
                    reject(e);
                }
            });
        },
    }));
    
    return (
        <div
          role="presentation"
          ref={canvasRef}
          className={className}
          style={{
            touchAction: 'none',
            width,
            height,
            ...style,
          }}
          touch-action="none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          <svg
            version="1.1"
            baseProfile="full"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            style={{
              width: '100%',
              height: '100%',
              ...svgStyle,
            }}
            id={id}
          >
            <g id={`${id}__eraser-stroke-group`} display="none">
              <rect
                id={`${id}__mask-background`}
                x="0"
                y="0"
                width="100%"
                height="100%"
                fill="white"
              />
              {eraserPaths.map((eraserPath, i) => (
                <SvgPath
                  key={`${id}__eraser-${i}`}
                  id={`${id}__eraser-${i}`}
                  paths={eraserPath.paths}
                  strokeColor="#000000"
                  strokeWidth={eraserPath.strokeWidth}
                />
              ))}
            </g>
            <defs>
              {backgroundImage && (
                <pattern
                  id={`${id}__background`}
                  x="0"
                  y="0"
                  width="100%"
                  height="100%"
                  patternUnits="userSpaceOnUse"
                >
                  <image
                    x="0"
                    y="0"
                    width="100%"
                    height="100%"
                    xlinkHref={backgroundImage}
                    preserveAspectRatio={preserveBackgroundImageAspectRatio}
                  ></image>
                </pattern>
              )}
    
              {eraserPaths.map((_, i) => (
                <mask
                  id={`${id}__eraser-mask-${i}`}
                  key={`${id}__eraser-mask-${i}`}
                  maskUnits="userSpaceOnUse"
                >
                  <use href={`#${id}__mask-background`} />
                  {Array.from(
                    { length: eraserPaths.length - i },
                    (_, j) => j + i
                  ).map((k) => (
                    <use
                      key={k.toString()}
                      href={`#${id}__eraser-${k.toString()}`}
                    />
                  ))}
                </mask>
              ))}
            </defs>
            <g id={`${id}__canvas-background-group`}>
              <rect
                id={`${id}__canvas-background`}
                x="0"
                y="0"
                width="100%"
                height="100%"
                fill={backgroundImage ? `url(#${id}__background)` : canvasColor}
              />
            </g>
            {pathGroups.map((pathGroup, i) => (
              <g
                id={`${id}__stroke-group-${i}`}
                key={`${id}__stroke-group-${i}`}
                mask={`url(#${id}__eraser-mask-${i})`}
              >
                <Paths id={id} paths={pathGroup} />
              </g>
            ))}
          </svg>
        </div>
      );
    });