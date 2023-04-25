import React, { useState } from 'react';
import { Button, View, StyleSheet, TouchableOpacity } from 'react-native';
import PagerView from 'react-native-pager-view';
import SlideScreen from '../components/SlideScreen';

const ModalContent = () => {
  const [selectedPageIndex, setSelectedPageIndex] = useState(0);

  const onPageSelected = e => {
    setSelectedPageIndex(e.nativeEvent.position);
  };

  const renderDots = () => {
    const dots = [];
    for (let i = 0; i < 3; i++) {
      dots.push(
        <TouchableOpacity
          key={`dot-${i}`}
          style={[
            styles.dot,
            selectedPageIndex === i ? styles.activeDot : styles.inactiveDot,
          ]}
        />,
      );
    }
    return dots;
  };

  return (
    <View style={styles.container}>
      <PagerView
        style={styles.viewPager}
        initialPage={0}
        onPageSelected={onPageSelected}>
        <View key="1">
          <SlideScreen text="Welcome to Screen 1" />
        </View>
        <View key="2">
          <SlideScreen text="Welcome to Screen 2" />
        </View>
        <View key="3">
          <SlideScreen text="Welcome to Screen 3" />
        </View>
      </PagerView>
      <View style={styles.buttonContainer}>
        <Button title="Get Started" onPress={() => {}} />
      </View>
      <View style={styles.dotContainer}>{renderDots()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewPager: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 60,
    alignSelf: 'center',
  },
  dotContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: 'blue',
  },
  inactiveDot: {
    backgroundColor: 'gray',
  },
});

export default ModalContent;