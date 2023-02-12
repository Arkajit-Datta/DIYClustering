from sklearn.cluster import DBSCAN
import numpy as np
class DBscanGps:
    eps = 5
    min_samples = 2
    data = []
    loc = []
    
    def set_data(self,data):
        self.data = data

    def new_data(self,location):
        for _,value in self.data:
            self.loc.append(value)
        self.loc.append(location)
        return self.dbscan_clustering()

    def dbscan_clustering(self):
        dbscan = DBSCAN(eps = self.eps, min_samples=self.min_samples)
        dbscan.fit(np.array(self.data))
        return dbscan.labels_


if __name__ == "__main__":
    dbscan = DBscanGps()
    dbscan.new_data([6,9])
    dbscan.new_data([6,10])
    dbscan.new_data([20,21])
    dbscan.new_data([2,2])
    dbscan.new_data([3,1])
    dbscan.new_data([20,20])
    #dbscan.new_data([21,21])