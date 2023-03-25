class MultipleClustering:
    classes = []
    
    def new_data(self,data):
        if data not in self.classes:
            self.classes.append(data)
        return self.classes.index(data)
