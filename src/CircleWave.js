export const CircleWave = ({ peaks, size = 64, image }) => {
  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        borderRadius: "100%",
        border: "1px solid black",
        margin: 6
      }}
    >
      {peaks.map((item, i) => {
        let rotation = (360 / peaks.length) * i;
        return (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: size / 2,
              width: 0.25,
              height: size / 2,
              transformOrigin: "bottom center",
              transform: `rotateZ(${rotation}deg)`
            }}
          >
            <div
              style={{
                position: "absolute",
                bottom: size / 2,
                left: 0,
                width: 1,
                height: item / 6,
                background:
                  "linear-gradient(hsla(0,0%,100%,1), hsla(0,0%,0%,1))",
                backgroundImage: `url("${image}")`,
                backgroundPosition: `50% ${(-100 / peaks.length) * i}%`,
                backgroundSize: `${size / 2}px`
              }}
            ></div>
          </div>
        );
      })}
    </div>
  );
};
