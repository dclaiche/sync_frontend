import React from 'react';
import { View, Dimensions } from 'react-native';
import { Chart, Line, VerticalAxis, HorizontalAxis, Tooltip } from 'react-native-responsive-linechart';
import MyToolTip from './myToolTip';

const { width } = Dimensions.get('window');

const TestGraph = () => {
    const raw = {
        "timestamp": [
            1681257600,
            1681344000,
            1681430400,
            1681516800,
            1681776000,
            1681862400,
            1681948800,
            1682035200,
            1682121600,
            1682380800,
            1682467200,
            1682553600,
            1682640000,
            1682726400,
            1682985600,
            1683072000,
            1683158400,
            1683244800,
            1683331200,
            1683590400,
            1683676800,
            1683763200,
            1683849600,
            1683936000,
            1684195200,
            1684281600,
            1684368000,
            1684454400,
            1684540800,
            1684800000,
            1684886400,
            1684972800,
            1685059200,
            1685145600,
            1685491200,
            1685577600,
            1685649600
        ],
        "equity": [
            100000,
            100000,
            99999.69972361941,
            99998.62343980902,
            99998.02175719278,
            99944.6415883984,
            99889.68411761933,
            99815.78920812515,
            99812.45420758217,
            99811.51666084577,
            99656.86021570799,
            99696.82959104248,
            100511.35,
            100511.35,
            100511.35,
            100511.35,
            100511.35,
            100511.35,
            100511.35,
            100511.35,
            100511.35,
            100511.35,
            100511.35,
            100511.35,
            100511.35,
            100511.35,
            100511.35,
            100511.35,
            100511.35,
            100511.35,
            100511.35,
            100511.35,
            100511.35,
            100511.35,
            100511.35,
            100511.35,
            100511.35
        ],
        "profit_loss": [
            0,
            0,
            -0.280470457387891,
            -1.07628381039,
            -0.60168261624,
            -53.38016790783,
            -54.95747077908,
            -73.89490949417,
            -3.33500054298,
            -0.93754673641,
            -154.65644513777,
            39.96937533449,
            814.7156050506295,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0
        ],
        "profit_loss_pct": [
            0,
            0,
            -0.0000028047045739,
            -0.000013567544809528097,
            -0.000019584372163645778,
            -0.0005533861569665882,
            -0.0011029609736109287,
            -0.0018419102149153095,
            -0.0018752602269507283,
            -0.001884635696171862,
            -0.003431200453875608,
            -0.0030315066213639228,
            0.0051156510428389985,
            0.0051156510428389985,
            0.0051156510428389985,
            0.0051156510428389985,
            0.0051156510428389985,
            0.0051156510428389985,
            0.0051156510428389985,
            0.0051156510428389985,
            0.0051156510428389985,
            0.0051156510428389985,
            0.0051156510428389985,
            0.0051156510428389985,
            0.0051156510428389985,
            0.0051156510428389985,
            0.0051156510428389985,
            0.0051156510428389985,
            0.0051156510428389985,
            0.0051156510428389985,
            0.0051156510428389985,
            0.0051156510428389985,
            0.0051156510428389985,
            0.0051156510428389985,
            0.0051156510428389985,
            0.0051156510428389985,
            0
        ],
        "base_value": 100000,
        "timeframe": "1D"
      }
    
      const data = raw.timestamp.map((timestamp, index) => {
        return { x: timestamp, y: raw.equity[index] };
    });

    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000); // Convert to milliseconds
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    }

    const xValues = raw.timestamp;
    const yValues = raw.equity;

    const xMin = Math.min(...xValues);
    const xMax = Math.max(...xValues);
    const yMin = Math.min(...yValues)*.999;
    const yMax = Math.max(...yValues)*1.001;

    return (
        <View>
                <Chart
                    data={data} 
                    style={{ height: 200, width: width, marginTop: 0}}
                    xDomain={{ min: xMin, max: xMax }}
                    yDomain={{ min: yMin, max: yMax }}
                    padding={{ top: 20, bottom: 0, left: 0, right: 0 }}
                    
                >
                <Line smoothing="none" theme={{stroke: {color: 'green', width: 4, opacity: 1, dashArray: []}, selected: {height: 5, width: 1, color: 'black'}}} tooltipComponent={<MyToolTip />}/>
                <VerticalAxis theme={{axis: {visible: false}, }}/>
                </Chart>
        </View>
    );
};

export default TestGraph;