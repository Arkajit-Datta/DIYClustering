from sklearn.cluster import DBSCAN
import numpy as np
from sentence_transformers import SentenceTransformer
class DBscanSentence:
    eps = 7
    min_samples = 2
    model = SentenceTransformer('paraphrase-MiniLM-L6-v2')
    data = []
    
    def new_data(self,sentence):
        embedding = self.model.encode(sentence) 
        self.data.append(embedding)
        return self.dbscan_clustering()
        
    def dbscan_clustering(self):
        dbscan = DBSCAN(eps = self.eps, min_samples=self.min_samples)
        dbscan.fit(np.array(self.data))
        labels = dbscan.labels_
        vec = []
        neg_vec = []
        for i in range(len(labels)):
            if labels[i] == -1:
                neg_vec.append(self.data[i])
            else:
                vec.append(self.data[i])
        vec.extend(neg_vec)
        self.data = vec
        return labels[-1]


if __name__ == "__main__":
    dbscan = DBscanSentence()
    dbscan.new_data("plot no 8, lokayata colony")
    dbscan.new_data("plot no 10, lokayata colony")
    dbscan.new_data("e-11/2, rci quarters")
    dbscan.new_data("e-11/1, rci quarters")