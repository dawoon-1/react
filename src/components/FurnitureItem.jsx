// src/components/FurnitureItem.jsx
import { useRef } from "react";
import Draggable from "react-draggable";

const GRID = 20;

export default function FurnitureItem({
  item,
  isSelected,
  onSelect,
  onMove,
}) {
  const nodeRef = useRef(null);

  const angle = ((item.rotation ?? 0) % 360 + 360) % 360;

  // --------------------------
  // 🔥 회전 상태에 따른 실제 크기
  // --------------------------
  const rotatedWidth =
    angle === 90 || angle === 270 ? item.height : item.width;

  const rotatedHeight =
    angle === 90 || angle === 270 ? item.width : item.height;

  // --------------------------
  // 🔥 90° / 270° 회전 정확 오프셋
  //    → 벽 끝 0px 맞춤용 완전 정확한 공식
  // --------------------------
  let offsetX = 0;
  let offsetY = 0;

  if (angle === 90) {
    // 가구가 시계방향 90도 → 가로/세로 뒤바뀜
    offsetX = (item.width - item.height) / 2;
    offsetY = (item.height - item.width) / 2;
  } else if (angle === 270) {
    // 반시계 90도
    offsetX = (item.height - item.width) / 2;
    offsetY = (item.width - item.height) / 2;
  }
  // 0도·180도는 offset 필요 없음

  // --------------------------
  // 드래그 종료 → GRID에 맞춤
  // --------------------------
  const handleStop = (e, data) => {
    const snapX = Math.round(data.x / GRID) * GRID;
    const snapY = Math.round(data.y / GRID) * GRID;

    // ⭐ 회전된 상태에서도 좌표는 rotatedWidth/rotatedHeight 기준
    onMove(item.id, snapX, snapY);
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      bounds="parent"
      position={{ x: item.x, y: item.y }}
      grid={[GRID, GRID]}
      onStop={handleStop}
    >
      <div
        ref={nodeRef}
        style={{
          position: "absolute",
          width: rotatedWidth,
          height: rotatedHeight,
          transform: `translate(${offsetX}px, ${offsetY}px)`,
          cursor: "grab",
        }}
      >
        <div
          className={`furniture ${isSelected ? "selected" : ""}`}
          onDoubleClick={(e) => {
            e.stopPropagation();
            onSelect(item.id);
          }}
          style={{
            width: item.width,
            height: item.height,
            backgroundColor: item.color,
            transform: `rotate(${angle}deg)`,
            transformOrigin: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "10px",
            userSelect: "none",
          }}
        >
          {item.label}
        </div>
      </div>
    </Draggable>
  );
}
