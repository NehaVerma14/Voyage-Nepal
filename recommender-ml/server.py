from flask import Flask, request
from recommender_final import script
import flask
app = Flask(__name__)


# @app.route('/')
# def index():
#     return flask.jsonify({"success": "This is a success Message"})


@app.route('/recommends', methods=['GET', 'POST'])
def say_hello():
    if request.method == 'POST':
        user_data = request.get_json()

        place_name = user_data['placename']
        user_age = user_data['age']
        user_coordinates_x = user_data['x']
        user_coordinates_y = user_data['y']

        def func():
            x1, y1 = script(
                place_name, user_age, user_coordinates_x, user_coordinates_y)
            return x1, y1
        x1, y1 = func()
        return flask.jsonify({"userData":  {
            "NearYou": x1,
            "special_recommendation": y1
        }})
    elif request.method == "GET":
        return flask.jsonify({"success": "This is a success Message"})


if __name__ == '__main__':
    app.run(host="localhost", port=8181, debug=True)