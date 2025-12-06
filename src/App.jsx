// src/App.jsx
import { useEffect, useState } from "react";
import "./App.css";

import Toolbar from "./components/Toolbar";
import RoomCanvas from "./components/RoomCanvas";
import PropertyPanel from "./components/PropertyPanel";

const STORAGE_KEY = "roomLayout_v5";

export default function App() {
  const [roomSize, setRoomSize] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY))?.roomSize || {
        width: 500,
        height: 500,
      };
    } catch {
      return { width: 500, height: 500 };
    }
  });

  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY))?.items || [];
    } catch {
      return [];
    }
  });

  const [selectedId, setSelectedId] = useState(null);

  // 자동 저장
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ roomSize, items })
    );
  }, [roomSize, items]);

  // 가구 추가
  const handleAdd = (item) => {
    setItems((prev) => [...prev, item]);
    setSelectedId(item.id);
  };

  // 가구 선택
  const handleSelect = (id) => {
    setSelectedId(id);
  };

  // 드래그 이동
  const handleMove = (id, x, y) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, x, y } : i))
    );
  };

  // 속성 변경
  const handleChangeItem = (id, patch) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, ...patch } : i))
    );
  };

  // 삭제
  const handleDeleteItem = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    setSelectedId(null);
  };

  // 전체 초기화
  const handleReset = () => {
    if (!window.confirm("정말 모든 가구를 초기화하시겠습니까?")) return;
    setItems([]);
    setSelectedId(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const selectedItem = items.find((i) => i.id === selectedId) || null;

  return (
    <div className="app-root">
      {/* 상단 헤더 */}
      <header className="app-header-bar">
        <div className="app-header-title">Room Design</div>
        <div className="app-header-sub">
          나만의 방 인테리어를 웹에서 디자인해보세요.
        </div>
      </header>

      {/* 메인 레이아웃: 왼쪽 사이드바 / 오른쪽 방 */}
      <div className="main-layout">
        {/* 왼쪽 사이드바 (360px 고정) */}
        <aside className="sidebar">
          {/* 가구 추가 박스 (원래 Toolbar 카드 그대로 사용) */}
          <Toolbar onAdd={handleAdd} />

          {/* 가구 속성 + 방 크기 옵션 (기존 PropertyPanel 그대로) */}
          <PropertyPanel
            item={selectedItem}
            onChangeItem={handleChangeItem}
            onDeleteItem={handleDeleteItem}
            roomSize={roomSize}
            setRoomSize={setRoomSize}
          />
        </aside>

        {/* 오른쪽 방 캔버스 영역 */}
        <main className="canvas-area">
          <RoomCanvas
            roomSize={roomSize}
            items={items}
            selectedId={selectedId}
            onSelect={handleSelect}
            onMove={handleMove}
            onReset={handleReset}
          />
        </main>
      </div>
    </div>
  );
}
 