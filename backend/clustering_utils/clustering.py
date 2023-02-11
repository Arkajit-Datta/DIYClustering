from gps_clustering import DBscanGps
from multiple_classifer import MultipleClustering
from range_clustering import RangeClustering
from sentence_clustering import DBscanSentence
def get_clustering_object(clustering_type):
    if clustering_type == "similarity":
        return DBscanSentence()
    elif clustering_type == "location":
        return DBscanGps
    elif clustering_type == "range":
        return RangeClustering
    elif clustering_type == "multiple":
        return MultipleClustering

def cluster(event,data):
    rules = fetch_rules(event)
    tree_info = fetch_tree_info(event)
    for key in rules.keys():
        clustering_obj = get_clustering_object(rules[key])
        cluster = clustering_obj.new_data(data[key])
        
        
