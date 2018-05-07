from flask import Flask, render_template
import csv
import os

def create_app():
    app = Flask(__name__)

    @app.route('/', methods=['GET', 'POST'])
    def index(event=None, context=None):
        with open('data/crash_records.csv', 'r') as f:
            reader = csv.reader(f)
            headers = reader.__next__()
            crashes = [dict(zip(headers, row)) for row in reader]


        google_maps_api_key = os.environ.get('GOOGLE_MAPS_API_KEY')

        return render_template('index.html', crashes=crashes, google_maps_api_key=google_maps_api_key)

    return app
