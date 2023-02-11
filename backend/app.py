from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import logging
import uvicorn
from dbUtils import get_all_schema_from_db


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
def add_schema(item: dict):
    
    
    
    return JSONResponse(
        status_code=200,
        content={
            "data": item
        }
    )


@app.post("/addDataPoint")
def add_data_point(item: dict):
    return JSONResponse(
        status_code=200,
        content={
            "data": item
        }
    )

if __name__ == "__main__":
    uvicorn.run(
        app,
        port=5000,
        host="127.0.0.1",
    )

