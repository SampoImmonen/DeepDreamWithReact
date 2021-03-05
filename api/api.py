from flask import Flask

app = Flask(__name__)

@app.route('/test')
def test():
    """
    method to test api connection
    """

    return {'status' : 'ok'}
