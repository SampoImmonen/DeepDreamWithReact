import torch
import torch.nn as nn
import numpy as np
import torchvision.models as models
import torchvision.transforms as T
import matplotlib.pyplot as plt
from PIL import Image
import io

def initialize():
    """
    initialize global variables
    """
    print("inititializing model")
    global model
    model = models.vgg16(pretrained=True)
    global device
    device = "cuda" if torch.cuda.is_available() else "cpu"
    print(f"using device: {device}")
    model.to(device)


#Transforms used to transform image into a tensor
NormalTransform = T.Compose([
    T.ToTensor(),
    T.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])

def imagetotensor(content, T, resize = False, device="cuda"):
    """
    could be integrated into image_to_tensor
    but applied transformation can change between models
    
    """
    
    img = np.asarray(Image.open(io.BytesIO(content)))/255
    img = img[:, :, :3]
    print(img.shape)
    a = NormalTransform(img).unsqueeze(0)
    return a.to(device).float()
        
def tensortoimage(t):
    mean = np.array([0.485, 0.456, 0.406]).reshape([1, 1, 3])
    std = np.array([0.229, 0.224, 0.225]).reshape([1, 1, 3])
    t = t.squeeze().transpose(0,2).transpose(0,1)
    t = t.detach().cpu().numpy()
    t = std*t+mean
    t=t*255
    t = np.uint8(np.clip(t,0,255))
    img = Image.fromarray(t)
    return img

def dream_step(model, img, layer_index=10, n_iters=50, lr = 0.1, control=None, category=None):
    """
    passes img through the network for n_iters amount of times
    calculating the loss from the layer_index
    """
    
    
    b = torch.autograd.Variable(img, requires_grad=True)
    
    optimizer = torch.optim.Adam([b], lr =lr)
    mean = np.array([0.485, 0.456, 0.406]).reshape([3, 1, 1])
    std = np.array([0.229, 0.224, 0.225]).reshape([3, 1, 1])
    
    for _ in range(n_iters):
        optimizer.zero_grad()
        out = subnetwork_output(b, model, layer_index, category=category)
        loss = calculate_loss(out, control)
        out.backward(loss)
        optimizer.step()
        
        img_data = b.data.cpu().numpy()
        img_data[0,:,:,:] = np.clip(img_data[0,:,:,:], -mean/std, (1-mean)/std)
        b.data[0,:,:,:]  = torch.tensor(img_data)
        
        #print(loss.item())
        
    return b.data
    
    
    
def subnetwork_output(img, model, layer_index, category=None):
    """
    output of the layer specified by layer_index
    """
    max_layer = get_layer_count(model)
    if layer_index>max_layer:
        print("Layer index is too large")
        raise ValueError
    if category:
        return model(img).squeeze()[category]
        pass
    else:
        x = img
        index=0
        for layer in model.features:
            x = layer(x)
            if 'Conv' in repr(layer):
                index+=1
            if index==layer_index:
                break
    
    return x
def octave_function(img, model, octave_scale=1.3):
    """
    implements the octaves to get deepdream details on multiple scales
    down sizes image deepdreams on that and combine dreams on all scales
    """
def get_layer_count(model):
    return len([1 for layer in model.features if 'Conv' in repr(layer)])

def calculate_loss(features, control=None):
    
    if control!= None:
        ch, w, h = features[0].shape
        a = features.view(ch, -1)
        #print(a.shape)
        b = control.view(ch, -1)
        #print(b.shape)
        A = torch.mm(a.T, b)
        index = torch.max(A, 1)[1]
        return -b[:, index].view(ch, w, h).unsqueeze(0)
    return -features


def dreamdeep(img, layer_index, octave_scale, octave_min, octave_max, n_iters, orig_add=True):
    
    h, w = img.size()[2:]
    print(h, w)
    b = img
    control_features = None
    for n in range(octave_min, octave_max+1):
        resize = T.Compose([
            T.Resize((int(h*(octave_scale**n)),int(w*(octave_scale**n))))])

        #control_resized = resize(control)

        new_img = (resize(img))

        if orig_add:
            new_img = (new_img + resize(b))/2
        print(new_img.size())
        img = dream_step(model, new_img, layer_index=layer_index, n_iters=n_iters, control=control_features)
    return img



def img2deepdream2img(content, layer_index, octave_scale, octave_min, octave_max, n_iters, orig_add=True):
    img = imagetotensor(content, NormalTransform, device=device)
    deepdream = dreamdeep(img, layer_index, octave_scale, octave_min, octave_max, n_iters, orig_add=True)
    return tensortoimage(deepdream)

