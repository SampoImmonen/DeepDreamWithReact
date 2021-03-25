from fastapi import FastAPI, File, UploadFile, Form, Response

from starlette.responses import StreamingResponse
from PIL import Image
import io

from deepdream import *

#initialize global variables
initialize()


app = FastAPI()

#route to test server connection
@app.get("/home")
def root():
    return {'status' : 'ok'}

def deepdream(img):
    return img

@app.post("/deepdream")
async def handledeepdream(image: UploadFile = Form(...),
                          octavestep: str = Form(...),
                          octavesmin: str = Form(...),
                          octavesmax: str = Form(...),
                          num_iters: str = Form(...),
                          layer_index: str = Form(...)
                          ):
    
    print(octavestep)
    print(octavesmax)
    print(octavesmin)
    print(num_iters)
    print(layer_index)
    #print(octavesmin)
    #print("request received")
    print(image.content_type)
    content = await image.read()
    deepimage = img2deepdream2img(content, layer_index=int(layer_index), octave_scale=float(octavestep), octave_min=int(octavesmin), octave_max=int(octavesmax), n_iters=int(num_iters), orig_add=True)
    #deepimage.show()
    buf = io.BytesIO()
    deepimage.save(buf, format='PNG')
    buf.seek(0)
    return StreamingResponse(buf, media_type="image/png", headers={'Content-Disposition':'inline; filename="deepdream.png"'})
