from sklearn.cluster import DBSCAN
import numpy as np
from sentence_transformers import SentenceTransformer
import os
import sys

class DBscanSentence:
    eps = 7
    min_samples = 2
    model = SentenceTransformer('paraphrase-MiniLM-L6-v2')
    data = []
    encodings = []
    
    def set_data(self,data):
        self.data = data

    def new_data(self,sentence):
        for _,value in self.data:
            embedding = self.model.encode(value) 
            self.encodings.append(embedding)
        embedding = self.model.encode(sentence) 
        self.encodings.append(embedding)
        return self.dbscan_clustering()
        
    def dbscan_clustering(self):
        dbscan = DBSCAN(eps = self.eps, min_samples=self.min_samples)
        dbscan.fit(np.array(self.encodings))
        return dbscan.labels_


if __name__ == "__main__":
    dbscan = DBscanSentence()
    dbscan.new_data("plot no 8, lokayata colony")
    dbscan.new_data("plot no 10, lokayata colony")
    dbscan.new_data("e-11/2, rci quarters")
    dbscan.new_data("e-11/1, rci quarters")