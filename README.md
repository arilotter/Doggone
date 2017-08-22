# Whereis.dog?! An app built for PennApps XV

<p align="center"> 
<img src="https://github.com/arilotter/Doggone/raw/master/DoggoneClient/src/scenes/img/dog.png" width="400" />
</p>

## Inspiration
We were very motivated to use technologies we had not used prior to the event; machine learning and React Native. While we came into the event with many ideas, the one we thought was best-suited to this hackathon was a trained neural network that could help people find lost dogs. It's very difficult to find lost dogs using flyers, since chances are that the people who see your dog won't also see you flyers. We thought whereis.dog would be the perfect tool for a community to help find a lost dog without the hassle of having to roam around posting flyers or asking everyone in their neighbourhood.

## What it does
whereis.dog has two parts: Lost Dog and Found Dog

In the "**Lost Dog**" section, the owner of a lost dog uploads images, contact information, and details about their dog into our database. This information is made available to users who take pictures of similar looking dogs.

In the "**Found Dog**" section, if a lost dog is found, you are prompted to take a picture and share your location. The image of the dog gets run through our neural network that has been trained to classify dogs by breed. The breed and possible missing dog matches are returned, from which the user can select dogs that look similar to the unclaimed dog they've found. They are then provided with options to call the owner of the dog to help return it.

## How we built it
We trained a neural network using TensorFlow to classify images dogs by breed. This network was trained over the course of 6 hours using over 21,000 images. The backend is written in Flask, a Python webapp framework, for easy interoperability with TensorFlow. The backend uses MongoDB to store the metadata for each dog. The frontend is written using React-Native, compiled for Android, and it integrates Material Design. Using Bootstrap, we also created a single page website advertising and showcasing our app. We also integrated the Google Maps API to show lost dogs around North America. Currently, this data is randomized, but it will be replaced with real lost dog data from whereis.dog once we've collected enough.

## Challenges we ran into
This was not our first project idea. We started by trying to build a machine learning algorithm that would train itself to interact with arbitrary LCD screens over GPIO ports. However, we ran into issues using neural networks that could, given a continuous input, generate time-aware output. Having abandoned that idea early on, we decided to create whereis.dog (originally called DogGone). Initially, we prototyped the app using React, but limitations with camera APIs and cross-platform inconsistencies on mobile browsers led us to switch to React-Native. Similarly, we began the project using Firebase, but upon investigating its capabilities we decided to stick with MongoDB, a technology we'd used before.

## Accomplishments that we're proud of
- Building our first React-Native app, using modern tooling and design patterns.
- Successfully training a neural network to act as an image classification system
- Participating in our very first Hackathon!

## We learned to
- Use React and React-native for creating applications on the web and mobile devices
- Create and train neural networks to be used for various classification and prediction purposes
- Implement a non-SQL database system, make use of Google's API console, and create a RESTful server for our app to interact with.

## What's next for whereis.dog
As we approached our deadline, our code quality approached unredeemable. The app needs serious refactoring, since many things were quickly hacked together as the deadline approached. Since we're using React-Native, an iOS app is the next logical step. Some general user interaction testing may be done to improve usability, and general interface tweaking and refinement will be done.

## Video in action
Click the image below for a video of Whereis.dog?!


[![Whereis.dog Video on Youtube](http://img.youtube.com/vi/_T6tKdnwmE4/0.jpg)](http://www.youtube.com/watch?v=_T6tKdnwmE4 "Whereis.dog")
