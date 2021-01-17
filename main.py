from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
analyzer = SentimentIntensityAnalyzer()

import time

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/time', methods=['GET', 'POST'])
def get_current_time():
    print(request)
    if request.method =='POST':
        req = request.json
        print(req['user'])
        vs = analyzer.polarity_scores(req['user'])
        print(vs)
        return jsonify(user=vs)
    return {'time': 'sss'}

if __name__ == '__main__':
    app.run(debug = True)
