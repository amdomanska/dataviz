export const Marks = ({data, xScale, xValue, yScale, yValue, innerHeight, format}) => (
    data.map((d, idx) => (
        <rect
            key={idx}
            x={xScale(d.x0)}
            y={yScale(yValue(d))}
            height={innerHeight - yScale(yValue(d))}
            width={xScale(d.x1) - xScale(d.x0) - 1}
            className="mark mark--rect"
        >
            <title>{format(d.x1)} ({yValue(d)})</title>
        </rect>
    ))
)