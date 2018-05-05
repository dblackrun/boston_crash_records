from flask import Flask, render_template
import csv
import json

def create_app():
    app = Flask(__name__)

    @app.route('/', methods=['GET', 'POST'])
    def index(event=None, context=None):
        with open('data/crash_records.csv', 'r') as f:
            reader = csv.reader(f)
            headers = reader.__next__()
            crashes = [dict(zip(headers, row)) for row in reader]

        with open('config.json') as json_data:
            config = json.load(json_data)
            google_maps_api_key = config['google_maps_api_key']

        return render_template('index.html', crashes=crashes, google_maps_api_key=google_maps_api_key)

    return app
