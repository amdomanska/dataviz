export const HistogramMarks = ({ bins, xScale, yScale, innerHeight, color }) => {
  return (
    <>
      {bins.map((bin, index) => (
        <rect
          key={index}
          x={xScale(bin.x0)}
          y={yScale(bin.length)}
          width={xScale(bin.x1) - xScale(bin.x0)}
          height={innerHeight - yScale(bin.length)}
          fill={color}
        />
      ))}
    </>
  );
};