from sklearn.cluster import DBSCAN
import numpy as np
class DBscanGps:
    eps = 5
    min_samples = 2
    data = []
    
    def new_data(self,location):
        self.data.append(location)
        return self.dbscan_clustering()

    def push_negatives_to_end(lst):
        return [x for x in lst if x != -1] + [x for x in lst if x == -1]

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
        print(labels)


if __name__ == "__main__":
    dbscan = DBscanGps()
    dbscan.new_data([6,9])
    dbscan.new_data([6,10])
    dbscan.new_data([20,21])
    dbscan.new_data([2,2])
    dbscan.new_data([3,1])
    dbscan.new_data([20,20])
    #dbscan.new_data([21,21])