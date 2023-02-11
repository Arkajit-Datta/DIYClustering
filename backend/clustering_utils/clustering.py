from gps_clustering import DBscanGps
from multiple_classifer import MultipleClustering
from range_clustering import RangeClustering
from sentence_clustering import DBscanSentence
import os
import sys
import uuid
TEST_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.abspath(os.path.join(TEST_DIR, "../"))
sys.path.insert(0, PROJECT_DIR)
from dbUtils import get_rules,get_children_from_tree_node,update_data_point,update_tree_info

def get_clustering_object(clustering_type,event_name, uuid, level_of_rule,parameter):
    if clustering_type == "similarity":
        obj = DBscanSentence()
        data = get_children_from_tree_node(event_name, uuid, level_of_rule)
        data = [[x["_id"],x[parameter]] for x in data]
        obj.set_data(data)
        return obj
    elif clustering_type == "location":
        obj = DBscanGps()
        data = get_children_from_tree_node(event_name, uuid, level_of_rule)
        data = [[x["_id"],x[parameter]] for x in data]
        obj.set_data(data)
        return obj
    elif clustering_type == "range_clustering":
        return RangeClustering()
    elif clustering_type == "multiple_classifier":
        return MultipleClustering()

def cluster(event,data):
    rules = get_rules(event)
    print(rules)
    tree_info = {"root":{}}
    parent_node = "root"
    for i,rule in enumerate(rules):
        classifier,parameter = rule
        clustering_obj = get_clustering_object(classifier,event,parent_node,i-1,parameter)
        cluster = clustering_obj.new_data(data[parameter])
        if parameter in ["range_clustering","multiple_classifier"]:
            if cluster in tree_info[parent_node].keys():
                update_data_point(event,i,tree_info[parent_node][cluster],data["_id"])
            else:
                tree_info[parent_node][cluster] = str(uuid.uuid4())
                if i==len(rules)-1:
                    pass
                else:
                    tree_info[tree_info[parent_node][cluster]] = {}
                    update_data_point(event,i,tree_info[parent_node][cluster],data["_id"])
            parent_node = tree_info[parent_node][cluster]
        else:
            data = get_children_from_tree_node(event, parent_node, i-1)
            for i,x in enumerate(cluster):
                if x in tree_info[parent_node].keys():
                    update_data_point(event,i,tree_info[parent_node][x],data[i]["_id"])
                else:
                    tree_info[tree_info[parent_node][x]] = {}
                    update_data_point(event,i,tree_info[parent_node][x],data[i]["_id"])

    update_tree_info(event,tree_info)

        
if __name__ == "__main__":
    cluster("Event Car",{"name":"anirudh","rating":8,"Comfortable":"good"})
        
