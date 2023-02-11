class MultipleClustering:
    classes = []
    
    def new_data(self,data):
        if data in self.classes:
            return self.classes.index(data)
        else:
            self.classes.append(data)
            return self.classes.index(data)
