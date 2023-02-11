from mongoDb import baseDb
from create_event import CreateEvent, EventCollection

baseDb_obj = baseDb()

def get_all_schema_from_db():
    return baseDb_obj.find_data(collection="events", find="multiple")
    