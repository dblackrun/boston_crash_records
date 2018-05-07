# Boston Crash Map

Mapping crash records from the city of Boston's open data. Source data can be found [here](https://data.boston.gov/dataset/vision-zero-crash-records)

View app [here](https://boston-crash-map.herokuapp.com/)

* Clone the repository

```
cd path_to_folder
git clone https://github.com/dblackrun/boston_crash_records.git
cd boston_crash_records
```

* Get Google Maps API Key from [here](https://developers.google.com/maps/documentation/javascript/get-api-key)

* Create config.json

```
vi config.json
```

* Add API key as environment variable named GOOGLE_MAPS_API_KEY

* Create virtualenv

```
virtualenv -p python3.6 env
```

* Install requirements

```
source env/bin/activate
pip install -r requirements.txt
```

* Run app

```
python app.py
```

* To update data, replace data/crash_records.csv file with data from [here](https://data.boston.gov/dataset/vision-zero-crash-records)
