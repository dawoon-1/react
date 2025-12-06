import { BED_SIZE_PRESETS } from "../furniturePresets";

export default function PropertyPanel({
  item,
  onChangeItem,
  onDeleteItem,
  roomSize,
  setRoomSize
}) {
  return (
    <div className="property-panel">

      <div className={`panel-box ${item ? "selected-panel" : ""}`}>
        <h3>{item ? "가구 속성 수정" : "가구를 선택하세요"}</h3>

        {!item && <p>왼쪽에서 가구를 클릭하세요.</p>}

        {item && (
          <>
            <div className="prop-row">
              <label>이름</label>
              <input
                value={item.label}
                onChange={(e) => onChangeItem(item.id, { label: e.target.value })}
              />
            </div>

            {item.type === "bed" && (
              <div className="prop-row">
                <label>침대 사이즈</label>
                <select
                  value={item.bedSize}
                  onChange={(e) => {
                    const size = BED_SIZE_PRESETS[e.target.value];
                    onChangeItem(item.id, {
                      bedSize: e.target.value,
                      width: size.width,
                      height: size.height,
                    });
                  }}
                >
                  <option value="single">싱글</option>
                  <option value="superSingle">슈퍼싱글</option>
                  <option value="king">킹</option>
                </select>
              </div>
            )}

            <div className="prop-row two-cols">
              <div>
                <label>가로(px)</label>
                <input
                  type="number"
                  value={item.width}
                  onChange={(e) =>
                    onChangeItem(item.id, { width: Number(e.target.value) })
                  }
                />
              </div>
              <div>
                <label>세로(px)</label>
                <input
                  type="number"
                  value={item.height}
                  onChange={(e) =>
                    onChangeItem(item.id, { height: Number(e.target.value) })
                  }
                />
              </div>
            </div>

            <div className="prop-row">
              <label>회전(deg)</label>
              <input
                type="number"
                value={item.rotation}
                onChange={(e) =>
                  onChangeItem(item.id, { rotation: Number(e.target.value) })
                }
              />
            </div>

            <div className="prop-row">
              <label>색상</label>
              <input
                type="color"
                value={item.color}
                onChange={(e) =>
                  onChangeItem(item.id, { color: e.target.value })
                }
              />
            </div>

            <button className="danger-btn" onClick={() => onDeleteItem(item.id)}>
              가구 삭제
            </button>
          </>
        )}
      </div>

      <div className="panel-box">
        <h3>방 크기</h3>

        <div className="prop-row two-cols">
          <div>
            <label>가로(px)</label>
            <input
              type="number"
              value={roomSize.width}
              onChange={(e) =>
                setRoomSize({ ...roomSize, width: Number(e.target.value) })
              }
            />
          </div>

          <div>
            <label>세로(px)</label>
            <input
              type="number"
              value={roomSize.height}
              onChange={(e) =>
                setRoomSize({ ...roomSize, height: Number(e.target.value) })
              }
            />
          </div>
        </div>

        <div className="prop-row">
          <label>평수(Enter 적용)</label>
          <input
            type="number"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const p = Number(e.target.value);
                if (!p) return;
                setRoomSize({ width: p * 110, height: p * 110 });
                e.target.value = "";
              }
            }}
          />
        </div>
      </div>

    </div>
  );
}
