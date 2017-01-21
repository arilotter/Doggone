export default {
  home: {
    initalRoute: true,
    title: 'Home',
    component: require('./scenes/Home').default
  },
  camera: {
    title: 'Take a picture of your dog',
    component: require('./scenes/DogCamera').default
  },
  recognized: {
    title: 'Dog has been recoginzed',
    component: require('./scenes/LostDogRecognized').default
  },
  browse: {
    title: 'Browse dogs',
    component: require('./scenes/BrowseDogs').default
  }
};
