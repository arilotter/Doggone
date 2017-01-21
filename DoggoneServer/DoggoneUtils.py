import tensorflow as tf, sys
from math import sin, cos, atan2, sqrt, radians
from base64 import b64encode, b64decode
import json

def get_distance(lat1, lon1, lat2, lon2):
    R = 6371e3
    q1 = radians(lat1)
    q2 = radians(lat2)
    dq = radians(lat2-lat1)
    dl = radians(lon2-lon1)

    a = sin(dq/2) * sin(dq/2) + cos(q1) * cos(q2) * sin(dl/2) * sin(dl/2)
    c = 2 * atan2(sqrt(a), sqrt(1-a))
    return R * c


class JSON_Ext(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, "ObjectId"):
            return str(obj)
        else:
            return super(JSON_Ext, self).default(obj)


#ImageNet Classifier
class Classifier():
    def __init__(self, graph, labels):
        with tf.gfile.FastGFile(graph, 'rb') as f:
            self.graph_def = tf.GraphDef()
            self.graph_def.ParseFromString(f.read())
            del(self.graph_def.node[1].attr["dct_method"])
            _ = tf.import_graph_def(self.graph_def, name='')

            self.label_lines = [line.rstrip() for line
            in tf.gfile.GFile(labels)]


    def classify_from_file(self, image, results=5):
        return self.classify(tf.gfile.FastGFile(image, 'rb').read(), results)

    def classify(self, imagedata, results=5):
        with tf.Session() as sess:
            # Feed the image_data as input to the graph and get first prediction
            softmax_tensor = sess.graph.get_tensor_by_name('final_result:0')

            predictions = sess.run(softmax_tensor,
                                   {'DecodeJpeg/contents:0': imagedata})

            # Sort to show labels of first prediction in order of confidence
            top_k = predictions[0].argsort()[-len(predictions[0]):][::-1][:results]

            for node_id in top_k:
                human_string = self.label_lines[node_id]
                score = predictions[0][node_id]
                print('%s (score = %.5f)' % (human_string, score))

            return [(self.label_lines[node_id], predictions[0][node_id]) for node_id in top_k]