from mongoDb import baseDb

class CreateEvent(baseDb):
    def __init__(self, name: str, parameters: dict, rules: int) -> None:
        super().__init__()
        self.structure = {
            "name": name,
            "tree": {"root":[]},
            "clusterinfo":{},
            "rules": rules,
            "parameters": parameters, 
        }
        
        self.insert_data(collection="events", data = self.structure)
        
    
class EventCollection(baseDb):
    def __init__(self, event_name, parameters) -> None:
        super().__init__()
        self.structure = {}.update(parameters)
        self.number_of_rules = None
        self._initialise_rules(event_name=event_name)
        self.insert_data(collection=event_name, data=self.structure)
        
    def _get_number_of_rules(self, event_name):
        data = self.find_data(collection="events", filter={"name": event_name}, find="one")
        return data['rules']
    
    def _initialise_rules(self, event_name) -> None:
        # query rules from database
        if self.number_of_rules is None:
            self.number_of_rules = self._get_number_of_rules(event_name=event_name)
            
        for rule in range(self.number_of_rules):
            self.structure[f"assigned_cluster_{rule+1}"] = ""
        
        
    
    
            