from pymongo import MongoClient

class baseDb:
    def __init__(self) -> None:
        self.client = MongoClient("mongodb+srv://arkajit:arkajit@cluster0.dmii1.mongodb.net/?retryWrites=true&w=majority")
        self.db = self.client["DyClustering"]
    
    def insert_data(self, collection, data) -> None:
        db_collection = self.db[collection]
        db_collection.insert_one(data)
    
    def update_data(self, collection, filter, updated_data, multiple = False) -> None:
        db_collection = self.db[collection]
        updated_data = {"$set":updated_data}
        if multiple:
            db_collection.update_many(filter=filter, update=updated_data)
            return 
        db_collection.update_one(filter=filter, update=updated_data)
    
    def find_data(self, collection, filter = None, find = "one"):
        db_collection = self.db[collection]
        if find == "one":
            return db_collection.find_one(filter) if filter else db_collection.find_one()
        elif find == "multiple":
            return db_collection.find(filter) if filter else db_collection.find()


        