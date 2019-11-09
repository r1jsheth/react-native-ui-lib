import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet, ScrollView, Animated, Easing} from 'react-native';
import {Colors, Image, Card, View, Text} from 'react-native-ui-lib'; //eslint-disable-line
import _ from 'lodash';

const data = [
  {
    title: 'Parrot',
    description:
      'Parrots, also known as psittacines, are birds of the roughly 393 species in 92 genera that make up the order Psittaciformes, found in most tropical and subtropical regions. The order is subdivided into three superfamilies: the Psittacoidea, the Cacatuoidea, and the Strigopoidea.',
    image: 'https://pbs.twimg.com/profile_images/378800000736064818/a8fbf8e2b843f6d6756c8fbd831fb2ba.jpeg',
  },
  {
    title: 'Owl',
    description:
      'DescriptionOwls are birds from the order Strigiformes, which includes about 200 species of mostly solitary and nocturnal birds of prey typified by an upright stance, a large, broad head, binocular vision, binaural hearing, sharp talons, and feathers adapted for silent flight.',
    image: 'https://i.pinimg.com/originals/e5/e3/92/e5e3927bdc7b3afae1e0503757dfee42.jpg',
  },
  {
    title: 'Penguin',
    description:
      'DescriptionPenguins are a group of aquatic flightless birds. They live almost exclusively in the Southern Hemisphere, with only one species, the Galapagos penguin, found north of the equator. Highly adapted for life in the water, penguins have countershaded dark and white plumage, and their wings have evolved into flippers.',
    image: 'https://sites.google.com/site/cabrillolab/_/rsrc/1359185743777/penguin-research-links/Gentoo.png',
  },
  {
    title: 'Stork',
    description:
      'DescriptionStorks are large, long-legged, long-necked wading birds with long, stout bills. They belong to the family called Ciconiidae, and make up the order Ciconiiformes. Ciconiiformes previously included a number of other families, such as herons and ibises, but those families have been moved to other orders. ',
    image: 'https://cdn130.picsart.com/296060988068201.jpg?c256x256',
  },
  {
    title: 'Goose',
    description:
      'DescriptionGeese are waterfowl of the family Anatidae. This group comprises the genera Anser and Branta. Chen, a genus comprising \'white geese\', is sometimes used to refer to a group of species that are more commonly placed within Anser. Some other birds, mostly related to the shelducks, have "goose" as part of their names.',
    image: 'https://static-s.aa-cdn.net/img/ios/1216464827/8c6ebccbcff77b69747998fbd1456883?v=1',
  },
];

export default class PlaygroundScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    _.forEach(data, item => Image.prefetch(item.image));
    this.entranceAnim = new Animated.Value(0);
    // this.entranceAnim = _.times(4, () => new Animated.Value(0));
  }

  static options = {
    topBar: {
      visible: false,
    },
  };

  componentDidMount() {
    /* Add performance hit */
    // this.slow(10);
    
    setTimeout(() => {
    /* Animate using stagger api */
    //   Animated.stagger(
    //     200,
    //     this.entranceAnim.map(anim =>
    //       Animated.timing(anim, {
    //         toValue: 100,
    //         duration: 600,
    //         easing: Easing.bezier(0.23, 1, 0.32, 1),
    //         useNativeDriver: true,
    //       }),
    //     ),
    //   ).start();

      /* Loop with timeout delay */
      // _.forEach(this.entranceAnim, (anim, index) => {
      //   setTimeout(() => {
      //     Animated.timing(anim, {
      //       toValue: 100,
      //       duration: 600,
      //       easing: Easing.bezier(0.23, 1, 0.32, 1),
      //       useNativeDriver: true,
      //     }).start();
      //   }, index * 250);
      // });

      /* Use a single animated value */
      Animated.timing(this.entranceAnim, {
        toValue: 100,
        duration: 1300,
        easing: Easing.bezier(0.23, 1, 0.32, 1),
        useNativeDriver: true,
      }).start();
    }, 1000);
  }

  slow(slowCount) {
    setTimeout(() => {
      _.times(5000, () => {
        console.log('slow log');
      });

      if (slowCount > 0) {
        this.slow(slowCount - 1);
      }
    }, 10);
  }

  renderCard(index) {
    const style = {};
    if (index < 4) {
      // const animValue = this.entranceAnim[index];
      const animValue = this.entranceAnim;
      style.opacity = animValue.interpolate({
        inputRange: [index * 25, (index + 1) * 25],
        // inputRange: [0, 100],
        outputRange: [0, 1],
      });

      style.transform = [
        {
          translateX: animValue.interpolate({
            inputRange: [index * 25, (100 - index * 25) / 2 + index * 25, 100],
            // inputRange: [0, 70, 100],
            outputRange: [-30, 10 - index * 10, 0],
            extrapolate: 'clamp',
          }),
        },
      ];
    }

    return (
      <Animated.View style={style}>
        <Card padding-20 marginB-20>
          <View row centerV>
            <Image source={{uri: data[index].image}} style={{height: 50, width: 50, borderRadius: 2}} />
            <Text marginL-10 text40>
              {data[index].title}
            </Text>
          </View>

          <Text marginT-10 tex80 numberOfLines={3} dark20>
            {data[index].description}
          </Text>
        </Card>
      </Animated.View>
    );
  }

  render() {
    return (
      <ScrollView>
        <View flex padding-20>
          {this.renderCard(0)}
          {this.renderCard(1)}
          {this.renderCard(2)}
          {this.renderCard(3)}
          {this.renderCard(4)}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});