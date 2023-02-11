from dbUtils.mongoDb import baseDb
from dbUtils.create_event import CreateEvent, EventCollection

baseDb_obj = baseDb()

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
            outlayer.extend(baseDb_obj.find_data(collection=event_name, filter={f"assigned_cluster_{level_of_rule}": children[child_key]}, find="multiple"))
            continue
        final_data.extend(baseDb_obj.find_data(collection=event_name, filter={f"assigned_cluster_{level_of_rule}": children[child_key]}, find="multiple"))
    final_data.extend(outlayer)
    return final_data

def get_tree(event_name):
    data = baseDb_obj.find_data(collection="events", filter={"name": event_name} ,find = "one")
    return data['tree']

def add_event(name: str, parameters: list) -> None:
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
    CreateEvent(name=name, parameters=parameters, rules=rules)

def add_event():
    pass