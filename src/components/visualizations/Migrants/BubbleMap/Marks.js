export const Marks = ({data, sizeScale, sizeValue, projection}) => (
    data.map((d,i) => {
        const [x,y] = projection(d.location);
        return (
            <circle
                className={"mark--circular"}
                key={i}
                cx={x}
                cy={y}
                r={sizeScale(sizeValue(d))}
            ></circle>
        )
    })
);