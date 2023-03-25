class RangeClustering:
    division_parameter = 4
    range = (0,10)

    def set_division_parameter(self,division_parameter):
        self.division_parameter = division_parameter

    def set_range(self,range):
        self.range = range
    
    def new_data(self,data):
        data = int(data)
        width = max(self.range)/self.division_parameter
        return data//width
            
