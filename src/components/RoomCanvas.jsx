import FurnitureItem from "./FurnitureItem";
import html2canvas from "html2canvas";

export default function RoomCanvas({
  roomSize,
  items,
  selectedId,
  onSelect,
  onMove,
  onReset
}) {

  // 🔥 방 영역 PNG 저장
  const handleSaveImage = async () => {
    const room = document.getElementById("room-canvas-export");

    if (!room) return;

    const canvas = await html2canvas(room, {
      backgroundColor: "#ffffff", // PNG 배경 하얗게
      scale: 2,                   // 고화질
    });

    const link = document.createElement("a");
    link.download = "my_room.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="room-wrapper card">
      <div className="room-header">
        <h2>내 방</h2>

        <div style={{ display: "flex", gap: "10px" }}>
          <button className="reset-small-btn" onClick={onReset}>
            전체 초기화
          </button>

          {/* PNG 저장 버튼 */}
          <button className="reset-small-btn" onClick={handleSaveImage}>
            PNG 저장
          </button>
        </div>
      </div>

      <div className="room-canvas">
        <div
          id="room-canvas-export"   // 🔥 캡쳐 대상
          className="room-outline"
          style={{
            width: roomSize.width,
            height: roomSize.height,
          }}
        >
          {items.map((item) => (
            <FurnitureItem
              key={item.id}
              item={item}
              isSelected={item.id === selectedId}
              onSelect={onSelect}
              onMove={onMove}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
