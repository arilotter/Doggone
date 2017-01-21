# API

## `GET /find/<string:longitude>/<string:latitude>/<int:radius>/<string:usr_type>/<string:rec_type>`

* `longitude`: of your location
* `latitude`: of your location
* `radius`: search radius in **METRES!**
* `usr_type`: Type of dog that the user selected, can be the same as
* `rec_type`: Type of dog that machine selected

Returns data like:
```
{
  "dogs": [
    {
      "uuid": "2a5debde-e012-11e6-a675-b8e85642309e",
      "usr_type": "Beagle",
      "rec_type": "Beagle",
      "lat": "-75.193111",
      "lon": "39.151799",
      "name": "Rover",
      "distance": 89089
    },
    {
      "uuid": "2a5debde-e012-11e6-a675-b8e85642309e",
      "usr_type": "Beagle",
      "rec_type": "Beagle",
      "lat": "-75.191111",
      "lon": "39.952799",
      "name": "Rex",
      "distance": 162
    },
    {
      "uuid": "2a5debde-e012-11e6-a675-b8e85642309e",
      "usr_type": "Beagle",
      "rec_type": "Beagle",
      "lat": "-75.192222",
      "lon": "39.952399",
      "name": "John",
      "distance": 94
    }
  ]
}
```

## `POST` /upload

* Only send the JPG data as a post request, result will be:

```
{
  "data_id": "2a5debde-e012-11e6-a675-b8e85642309e",
  "classify": [
    {
      "dog_type": "Pug",
      "confidence": "0.940"
    },
    {
      "dog_type": "French Bulldog",
      "confidence": "0.012"
    },
    {
      "dog_type": "Bull Mastiff",
      "confidence": "0.010"
    },
    {
      "dog_type": "Brabancon Griffon",
      "confidence": "0.006"
    },
    {
      "dog_type": "Pekinese",
      "confidence": "0.002"
    }
  ]
}
```

`data_id` is unique ID needed for next `/lost` and images (ie, `data_id.jpg`)

## `POST /lost`

* Send JSON data in this format:

```
{
  "uuid": "1236",
  "name": "John",
  "usr_type": "Beagle",
  "rec_type": "Beagle",
  "lat": "-75.192222",
  "lon": "39.952399",
  "agressive": 1,
  "details": "Info here"
}
```

Note that lat/lon are floats, and uuid is the `data_id` from `/upload`

## Getting images

`server.com/woof/data_id.jpg`


