import { createFurniture } from "../furniturePresets";

export default function Toolbar({ onAdd }) {
  return (
    <div className="card toolbar">
      <h2>가구 추가</h2>

      <div className="toolbar-grid">
        <button className="tool-btn" onClick={() => onAdd(createFurniture("bed"))}>🛏 침대</button>
        <button className="tool-btn" onClick={() => onAdd(createFurniture("desk"))}>🖥 책상</button>
        <button className="tool-btn" onClick={() => onAdd(createFurniture("chair"))}>🪑 의자</button>
        <button className="tool-btn" onClick={() => onAdd(createFurniture("closet"))}>👗 옷장</button>
        <button className="tool-btn" onClick={() => onAdd(createFurniture("drawer"))}>🗄 서랍</button>
        <button className="tool-btn" onClick={() => onAdd(createFurniture("table"))}>🍽 테이블</button>
      </div>
    </div>
  );
}
