import {useState, useMemo} from "react";
import {pointer, timeFormat} from "d3";

export const VerticalTooltip = ({data, innerHeight, innerWidth, xScale}) => {
    const [mousePos, setMousePos] = useState(null);
    const date = mousePos ? xScale.invert(mousePos).setHours(0,0,0,0) :  -1;

    let casesNumber = null;
    if (data && date !== -1){
        const dataByDay = data.filter(d => d.date === date);
        casesNumber = dataByDay[0].cases;
    }

    const handleMouseMove = (e) => {
        let mouseX = pointer(e)[0]; // get the x-coordinate of mouse relative to the SVG
        setMousePos(mouseX);
    }

    const tooltipWidth = 300;
    const tooltipHeight = 35;
    const xOffset = 5;


    return (
        <g onMouseMove={e => handleMouseMove(e)}
        onMouseLeave={e => setMousePos(null)}>
            <rect width={innerWidth} height={innerHeight} fill="white" opacity={0} />
            {
                date !== -1 &&
                <>
                    <line x1={xScale(date)} x2={xScale(date)} y1={0} y2={innerHeight} stroke="#635F5D" strokeWidth={1.5}/>
                    <g width={tooltipWidth} height={tooltipHeight}>
                        <rect x={mousePos + 10} y={10} width={tooltipWidth} height={tooltipHeight} fill="white"
                              stroke="#635F5D"/>
                        <text
                            textAnchor="start"
                            x={mousePos + 10 + xOffset}
                            dy={35}
                            fontWeight="bold"
                        >{timeFormat("%d %B %Y")(date)}: {casesNumber}</text>
                    </g>
                </>
            }
        </g>
    )
}