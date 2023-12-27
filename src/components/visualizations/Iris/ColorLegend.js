const xOffset = 25;
const yOffset = 20;
export const ColorLegend = ({colorScale, tickSize, innerWidth}) => (
    colorScale.domain().map((domainValue, i) => (
        <g transform={`translate(${innerWidth+xOffset},${50+i*(tickSize+yOffset)})`}>
            <circle
                fill={colorScale(domainValue)}
                r={tickSize}
            />
            <text
                textAnchor="start"
                x="0.75em"
                dy="0.3em"
            >{domainValue}</text>
        </g>
    )
));