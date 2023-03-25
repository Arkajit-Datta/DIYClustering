import sys
import os

TEST_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.abspath(os.path.join(TEST_DIR, "../"))
sys.path.insert(0, PROJECT_DIR)

from dbUtils import get_tree

class FormatTree:

    def dfs(self, node):
        name = self.name_formatter(node)
        store = {'name': node, 'label': name, 'children': []}
        if node in self.tree:
            for key in self.tree[node]:
                child = self.tree[node][key]
                store['children'].append(self.dfs(child))
        return store
    
    def name_formatter(self, name):
        splitted_name = name.split("_")
        try:
            result = f"{splitted_name[0]} ({splitted_name[1]})"
        except Exception as e:
            result = name
        return result
    
    def format_tree(self, event_name):
        self.tree = get_tree(event_name=event_name)
        return self.dfs("root")
    
if __name__ == "__main__":
    obj = FormatTree().format_tree(event_name="Event Car")
    print(obj)