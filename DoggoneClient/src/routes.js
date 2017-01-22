export default {
  home: {
    initalRoute: true,
    title: 'Home',
    component: require('./scenes/Home').default
  },
  camera: {
    title: 'Take a picture of the dog you found',
    component: require('./scenes/DogCamera').default,
    children: {
      recognized: {
        title: 'Dog has been recoginzed',
        component: require('./scenes/LostDogRecognized').default,
        children: {
          detail: {
            title: 'Dog Detail View',
            component: require('./scenes/DogDetails').default
          }
        }
      }
    }
  },
  browse: {
    title: 'Browse dogs',
    component: require('./scenes/BrowseDogs').default
  }
};

