import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, SafeAreaView} from 'react-native';
import PagerView from 'react-native-pager-view';
import SlideScreen from '../components/SlideScreen';
import SlideScreen2 from '../components/SlideScreen2';
import SlideScreen3 from '../components/SlideScreen3';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import { StackActions } from '@react-navigation/native';


const Alpaca = ({ navigation }) => {
  const [selectedPageIndex, setSelectedPageIndex] = useState(0);

  const onPageScroll = e => {
    const position = e.nativeEvent.position;
    const offset = e.nativeEvent.offset;

    if (offset > 0.5) {
      setSelectedPageIndex(position + 1);
    } else {
      setSelectedPageIndex(position);
    }
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
    <SafeAreaView style={styles.container}>
    <View style={styles.container}>
      <Icon name="x" size={25} marginLeft={15} onPress={() => navigation.dispatch(StackActions.pop(1))}/>
      <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('../../assets/alpaca_logo.jpg')}/>
      </View>
      <PagerView
        style={styles.viewPager}
        initialPage={0}
        onPageScroll={onPageScroll}>
        <View key="1">
          <SlideScreen/>
        </View>
        <View key="2">
          <SlideScreen2/>
        </View>
        <View key="3">
          <SlideScreen3 navigation={navigation}/>
        </View>
      </PagerView>
      </ScrollView>
      <View style={styles.dotContainer}>{renderDots()}</View>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  icon: {
    size: 25,
    marginLeft: 15,
  },
  contentContainer: {
    width: '100%',
    height: '100%',
 
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    height: '25%',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  viewPager: {
    width: '100%',
    height: '70%'
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
    backgroundColor: '#e8c003',
  },
  inactiveDot: {
    backgroundColor: 'gray',
  },
});

export default Alpaca;