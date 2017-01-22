from flask import Flask, request, send_from_directory
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
@app.route('/find/<string:status>/<string:longitude>/<string:latitude>/<int:radius>/<string:usr_type>/<string:rec_type>', methods=['GET'])
def get_task(status, longitude, latitude, radius, usr_type, rec_type):
    found_dogs = []
    db_select = db_lost if status == "lost" else db_found
    for dog in db_select.find():
        if '_id' in dog:
            del(dog['_id'])

        lon1 = float(dog.get("lon", 0))
        lat1 = float(dog.get("lat", 0))
        type1 = dog.get("rec_type") # Recognized
        type2 = dog.get("usr_type") # User specified
        found = dog.get("found", False)
        if found:
            continue

        distance = get_distance(lon1, lat1, float(longitude), float(latitude))
        if distance <= radius:
            if usr_type == "all" or usr_type == type1 or usr_type == type2 or rec_type == type1 or rec_type == type2:
                dog["distance"] = int(distance)
                found_dogs.append(dog)
    found_dogs = {"dogs": found_dogs}
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

@app.route('/add/lost', methods=['POST'])
def add_lost_dog():
    dog_data = json.loads(request.data)
    mongobj = db_lost.insert_one(dog_data).inserted_id
    return str(mongobj)

@app.route('/add/found', methods=['POST'])
def add_found_dog():
    dog_data = json.loads(request.data)
    mongobj = db_found.insert_one(dog_data).inserted_id
    return str(mongobj)


@app.route('/woof/<path:path>')
def send_js(path):
    return send_from_directory(os.path.join(root_path(), 'woof'), path)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
