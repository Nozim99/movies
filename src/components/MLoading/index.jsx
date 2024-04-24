import { memo } from "react"

const MLoading = () => {
  return (
    <div>
      <div style={{
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        position: "absolute",
        backgroundColor: "#fff",
        zIndex: 100,
      }}></div>
      <div className="main_loading">
        <div>
          <div className="main_loading-loading">
            <div className="main_loading-loader"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(MLoading);