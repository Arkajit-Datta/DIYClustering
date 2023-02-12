from dbUtils.mongoDb import baseDb
from dbUtils.create_event import CreateEvent, EventCollection
import re

baseDb_obj = baseDb()

# Get Calls
def get_all_schema_from_db():
    events = baseDb_obj.find_data(collection="events", find="multiple")
    return [
        {
            "id": index + 1,
            "name": event['name'],
            "parameters": event['parameters'],
        }
        for index, event in enumerate(events)
    ]
def get_rules(event_name):
    data = baseDb_obj.find_data(collection="events", filter={"name": event_name} ,find = "one")
    return data['rules']

def get_children_from_tree_node(event_name, uuid, level_of_rule): 
    data =  baseDb_obj.find_data(collection="events", filter={"name": event_name} ,find = "one")
    if uuid not in data['tree']:
        return []
    children, children_keys = data['tree'][uuid], list(data['tree'][uuid].keys())
    children_keys.sort()
    outlayer, final_data = [],[]
    for child_key in children_keys:
        if child_key == -1:
            outlayer.extend(baseDb_obj.find_data(collection=event_name, filter={f"assigned_cluster_{level_of_rule+1}": children[child_key]}, find="multiple"))
            continue
        final_data.extend(baseDb_obj.find_data(collection=event_name, filter={f"assigned_cluster_{level_of_rule+1}": children[child_key]}, find="multiple"))
    final_data.extend(outlayer)
    return final_data

def get_tree(event_name):
    data = baseDb_obj.find_data(collection="events", filter={"name": event_name} ,find = "one")
    return data['tree']

def get_data_points(event_name):
    datas = baseDb_obj.find_data(collection=event_name ,find = "multiple")
    data_list = []
    for index, data in enumerate(datas):
        keys = list(data.keys())
        res = {
            key: data[key]
            for key in keys
            if not re.search(r"assigned_cluster_", key) and key != "_id"
        }
        data_list.append(
            {
                "id": index+1,
                "parameters": res,
                "schemaName": event_name
            }
        )
    print(data_list)
    return data_list

def get_cluster_data_points(cluster_id, event_name):
    datas = baseDb_obj.find_data(collection=event_name ,find = "multiple")
    filtered_inside_cluster = []
    for data in datas:
        values = list(data.values())
        if cluster_id in values:
            filtered_inside_cluster.append(data)
            
    data_list = []
    for index, data in enumerate(filtered_inside_cluster):
        keys = list(data.keys())
        res = {
            key: data[key]
            for key in keys
            if not re.search(r"assigned_cluster_", key)
        }
        data_list.append(
            {
                "id": index+1,
                "parameters": res,
                "schemaName": event_name
            }
        )
    return data_list
    
        
# Add Calls
def add_event(name: str, parameters: list):
    '''
        rules: 
            1. location -> gps
            2. similarity -> sentence_clustering
            3. range_clustering -> range based
            4. multiple_classifier -> multiple_classifier
    '''
    # formulate the rules list
    rules, end = [],[]
    for parameter in parameters:
        if not parameter['cluster']:
            continue
        if parameter['type']  in {'location', 'similarity'}:
            end.append([parameter['type'],parameter['name']])
            continue
        rules.append([parameter['type'],parameter['name']])
    rules.extend(end)
    
    create_event_obj = CreateEvent(name=name, parameters=parameters, rules=rules)
    create_event_obj.insert()
    
def add_event_collection(event_name, parameters) -> None:
    event_collection = EventCollection(event_name=event_name, parameters=parameters)
    return event_collection.find_data(collection=event_name, filter={"_id": event_collection.inserted_id})

# Update Calls
def update_data_point(event_name, level, uuid, data_id):
    baseDb_obj.update_data(collection=event_name, filter={"_id": data_id}, updated_data={f"assigned_cluster_{level}": uuid})

def update_tree_info(event_name, tree):
    baseDb_obj.update_data(collection="events", filter={"name": event_name}, updated_data={"tree": tree})
    
def update_event(name: str, parameters: list):
    rules, end = [],[]
    for parameter in parameters:
        if not parameter['cluster']:
            continue
        if parameter['type']  in {'location', 'similarity'}:
            end.append([parameter['type'],parameter['name']])
            continue
        rules.append([parameter['type'],parameter['name']])
    rules.extend(end)
    
    create_event_obj = CreateEvent(name=name, parameters=parameters, rules=rules)
    create_event_obj.update()