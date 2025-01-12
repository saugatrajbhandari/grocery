import {View, StyleSheet, Image} from 'react-native';
import React, {memo, useMemo} from 'react';
import AutoScroll from '@homielab/react-native-auto-scroll';
import {imageData} from '../../Utils/dummyData';
import {ScreenWidth} from '../../Utils/Scaling';

const ProductSlider = () => {
  const rows = useMemo(() => {
    const result = [];

    for (let index = 0; index < imageData.length; index += 4) {
      result.push(imageData.slice(index, index + 4));
    }

    return result;
  }, []);

  return (
    <View pointerEvents="none">
      <AutoScroll
        style={styles.autoScroll}
        endPaddingWidth={0}
        duration={10000}>
        <View style={styles.gridContainer}>
          {rows.map((row, index) => {
            return <MemoizedRow key={index} row={row} rowIndex={index} />;
          })}
        </View>
      </AutoScroll>
    </View>
  );
};

export default ProductSlider;

const MemoizedRow: React.FC<{row: typeof imageData; rowIndex: number}> = memo(
  ({row, rowIndex}) => {
    const horizontalShift = rowIndex % 2 === 0 ? -18 : 18;

    return (
      <View style={styles.row}>
        {row.map((image, imageIndex) => {
          return (
            <View
              key={imageIndex}
              style={[
                styles.itemContainer,
                {transform: [{translateX: horizontalShift}]},
              ]}>
              <Image source={image} style={styles.image} />
            </View>
          );
        })}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },

  itemContainer: {
    marginBottom: 12,
    marginHorizontal: 10,
    width: ScreenWidth * 0.26,
    height: ScreenWidth * 0.26,
    backgroundColor: '#e9f7f8',
    justifyContent: 'center',
    borderRadius: 25,
    alignItems: 'center',
  },

  autoScroll: {
    position: 'absolute',
    zIndex: -2,
  },
  gridContainer: {
    justifyContent: 'center',
    overflow: 'visible',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
});
