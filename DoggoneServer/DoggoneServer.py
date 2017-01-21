from flask import Flask, request
from DoggoneUtils import *
import os
import sys
import uuid
import json
from json import encoder
import pymongo
from pymongo import MongoClient

app = Flask(__name__)

def root_path():
    # Infer the root path from the run file in the project root (e.g. manage.py)
    fn = getattr(sys.modules['__main__'], '__file__')
    root_path = os.path.abspath(os.path.dirname(fn))
    return root_path
print(root_path())

dog_graph = os.path.join(root_path(), "nn_dog_graph.pb")
dog_labels = os.path.join(root_path(), "nn_dog_labels.txt")
imagenet = Classifier(dog_graph, dog_labels)


#Connect to MongoDB

db_client = MongoClient()
client = MongoClient('localhost', 27017)
db_doggone = client.doggone
db_lost = db_doggone.lost
db_found = db_doggone.found



@app.route('/find/<string:longitude>/<string:latitude>/<int:radius>/<string:usr_type>/<string:rec_type>', methods=['GET'])
def get_task(longitude, latitude, radius, usr_type, rec_type):
    found_dogs = []
    for dog in db_lost.find():
        if '_id' in dog:
            del(dog['_id'])

        lon1 = float(dog.get("lon", 0))
        lat1 = float(dog.get("lat", 0))
        type1 = dog.get("rec_type") # Recognized
        type2 = dog.get("usr_type") # User specified

        distance = get_distance(lon1, lat1, float(longitude), float(latitude))
        if distance <= radius:
            if usr_type == type1 or usr_type == type2 or rec_type == type1 or rec_type == type2:
                dog["distance"] = int(distance)
                found_dogs.append(dog)

    return json.dumps(found_dogs)

@app.route('/upload', methods = ['POST'])
def upload():
    if request.method == 'POST':
        data_id = str(uuid.uuid1())
        classification = []
        for dog_type, confidence in imagenet.classify(request.data):
            classification.append({
                "dog_type": dog_type.title(),
                "confidence": str(format(confidence, '0.3f'))
            })

        dog_data = {
            "data_id": data_id,
            "classify": classification
        }

        with open(os.path.join(root_path(), "woof", data_id + ".jpg"), "wb") as f:
            f.write(request.data)
        return json.dumps(dog_data)

@app.route('/lost', methods=['POST'])
def add_lost_dog():
    dog_data = json.loads(request.data)
    mongobj = db_lost.insert_one(dog_data).inserted_id
    return str(mongobj)




if __name__ == '__main__':
    app.run()
