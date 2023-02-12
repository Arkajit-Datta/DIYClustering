from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import logging
import uvicorn
from dbUtils import get_all_schema_from_db, add_event, add_event_collection, get_data_points, get_cluster_data_points, update_event
from clustering_utils import cluster
from make_tree import FormatTree
logging.basicConfig(
    level=logging.INFO, format="[%(asctime)s] %(levelname)s: %(message)s"
)
logger = logging.getLogger(__name__)
logging.getLogger("pipeline").setLevel(logging.INFO)

app = FastAPI(title="DyClustering", version="1.0.0")

#CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    logging.info("This api is up")
    return JSONResponse(
        status_code=200,
        content={
            "message": "The API is alive"
        }
    )

@app.get("/allEvent/")
def get_all_event():
    logger.info("Getting the information of all schemas")
    try:
        data = get_all_schema_from_db()
    except Exception as e:
        logger.error("Issue at get_all_schema", exc_info=True)
        return JSONResponse(
            status_code=500, 
            content={
                "error": "Couldn't get the data"
            }
        )
    return JSONResponse(
        status_code=200,
        content={
            "data": data
        }
    )

@app.post("/addEvent/")
def add_event_route(item: dict):
    try:
        add_event(name=item['name'], parameters=item['parameters'])
        logger.info("Event Added Succesfully")
    except Exception as e:
        logger.error("Issue in Adding the Event", exc_info=True)
        return JSONResponse(
            status_code=500,
            content={
                "message": "Error"
            }
        )
    return JSONResponse(
        status_code=200,
        content={
            "message": "Event Added"
        }
    )

@app.post("/updateEvent")
def updateEvent(item: dict):
    try:
        update_event(name=item['name'], parameters=item['parameters'])
        logger.info("Event Added Succesfully")
    except Exception as e:
        logger.error("Issue in Adding the Event", exc_info=True)
        return JSONResponse(
            status_code=500,
            content={
                "message": "Error"
            }
        )
    return JSONResponse(
        status_code=200,
        content={
            "message": "Event Added"
        }
    )


@app.post("/addDataPoint")
def add_data_point(item: dict):
    try:
        data = add_event_collection(event_name=item['schemaName'], parameters=item['parameters'])
        logger.info("Data Point Added to the collection successfully")
    except Exception as e:
        logger.error("Issue in adding the data point in collection", exc_info=True)
        return JSONResponse(
            status_code=500,
            content={
                "message": "Error in adding the Data Point"
            }
        )
        
    cluster(event=item['schemaName'], data=data)
    
    return JSONResponse(
        status_code=200,
        content={
            "message": "Data Point Added Succesfully & Clustering has commenced"
        }
    )

@app.get("/getAllDataPoints/{eventName}")
def get_all_data_points(eventName: str):
    data = get_data_points(event_name=eventName)
    return JSONResponse(
        status_code=200,
        content={
            "data": data
        }
    )

@app.get("/cluster/{eventName}/{clusterId}")
def get_cluster_data(clusterId: str, eventName: str):
    data = get_cluster_data_points(cluster_id=clusterId, event_name=eventName)
    return JSONResponse(
        status_code=200,
        content={
            "data": data
        }
    )

@app.get("/getTree/{eventName}")
def get_tree(eventName: str):
    
    try:
        tree = FormatTree().format_tree(event_name=eventName)
    except Exception as e:
        logger.error("There was an error in formatting the tree")
        return JSONResponse(
            status_code=500,
            content={
                "message":"Error in formatting the tree" 
            }
        )
    return JSONResponse(
        status_code=200,
        content={
            "data": tree
        }
    )
    




if __name__ == "__main__":
    uvicorn.run(
        app,
        port=5000,
        host="127.0.0.1",
    )

