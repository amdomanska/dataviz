import {useState, useMemo, useEffect} from "react";
import {pointer} from "d3";

export const VerticalTooltip = ({data, innerHeight, innerWidth, xScale, colorScale, tickSize, setYearHovered}) => {
    const [mousePos, setMousePos] = useState(null);
    const year = mousePos ? Math.round(xScale.invert(mousePos)) :  -1;
    console.log(year);

    const filteredData = useMemo(() => {
        return data.filter(d => d.year === year)
    }, [year]);

    useEffect(() => {
        setYearHovered(year);
    }, [year]);


    const handleMouseMove = (e) => {
        console.log("mouseMove")
        let mouseX = pointer(e)[0]; // get the x-coordinate of mouse relative to the SVG
        setMousePos(mouseX);
    }

    const tooltipWidth = 450;
    const tooltipHeight = 250;
    const xOffset = 25;
    const yOffset = 15;


    return (
        <g onMouseMove={e => handleMouseMove(e)}
        onMouseLeave={e => setMousePos(null)}>
            <rect width={innerWidth} height={innerHeight} fill="white" opacity={0} />
            {
                year !== -1 &&
                <>
                    <line x1={xScale(year)} x2={xScale(year)} y1={0} y2={innerHeight} stroke="#635F5D" strokeWidth={1.5}/>
                    <g width={tooltipWidth} height={tooltipHeight}>
                        <rect x={mousePos + 10} y={10} width={tooltipWidth} height={tooltipHeight} fill="white"
                              stroke="#635F5D"/>
                        <text
                            textAnchor="start"
                            x={mousePos + 10 + xOffset}
                            dy={35}
                            fontWeight="bold"
                        >Year: {year}</text>
                        {
                            filteredData.map((d, i) =>
                                <g
                                    className="color-legend"
                                    transform={`translate(${mousePos + xOffset},${55 + i * (tickSize + yOffset)})`}
                                    key={i}
                                >
                                    <circle
                                        fill={colorScale(d.disorder)}
                                        r={tickSize}
                                    />
                                    <text
                                        textAnchor="start"
                                        x="0.75em"
                                        dy="0.3em"
                                    >{d.disorder}: {d.cases}</text>
                                </g>
                            )
                        }
                    </g>
                </>
            }
        </g>
    )
}