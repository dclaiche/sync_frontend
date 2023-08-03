import deepmerge from 'deepmerge';
import React from 'react';
import { Text, Rect } from 'react-native-svg';


const MyTooltip = (props) => {

  const {
    theme: { label, formatter, shape },
    value,
    position,
  } = deepmerge(defaultProps, props);

  if (!value || !position) {
    return null;
  }

  return (
    <React.Fragment>
       <Rect
        x={position.x - shape.width / 2 + shape.dx}
        y={0}
        rx={shape.rx}
        fill={shape.color}
        opacity={shape.opacity}
        height={shape.height}
        width={shape.width}
      />
      <Text
        x={position.x }
        y={-10}
        fontSize={label.fontSize}
        fontWeight={label.fontWeight}
        fontFamily={label.fontFamily}
        fill={label.color}
        opacity={label.opacity}
        textAnchor={label.textAnchor}
      >
        {formatter(value)}
      </Text>
    </React.Fragment>
  );
};

export default MyTooltip;

const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000); // Convert to milliseconds
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
}

const defaultProps = {
  theme: {
    label: {
      color: 'grey',
      fontSize: 10,
      fontWeight: 700,
      textAnchor: 'middle',
      opacity: 1,
      dx: 0,
      dy: 16.5,
    },
    shape: {
      width: 0.5,
      height: 180,
      dx: 0,
      dy: 20,
      rx: 0,
      color: 'grey',
    },
    formatter: (v) => formatDate(v.x),
  },
};
