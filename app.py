from flask import Flask, request, render_template, jsonify
import joblib
import numpy as np
from sklearn.linear_model import LogisticRegression

app = Flask(__name__)


@app.route("/")
def homepage():
    return render_template("index.html")

@app.route("/take_the_shot")
def shot_page():
    return render_template("machine_learning.html")


# allow the use of POST request with methods=["POST"]
@app.route("/api/predict", methods=["POST"])
def predict():
    if request.method == "POST":
        x_values = request.get_json()
        model = joblib.load("./models/logistic_regression_model.sav")
        prediction_values = [[
                int(x_values['period']),
                float(x_values['shot_clock']),
                int(x_values['dribbles']),
                float(x_values['touch_time']),
                float(x_values['shot_dist']),
                int(x_values['pts_type']),
                float(x_values['close_def_dist'])
            ]]
        

        prediction = model.predict(np.array(prediction_values).tolist()).tolist()

        # return the predicted result
        return jsonify({"prediction": prediction})


if __name__ == "__main__":
    app.run(debug=True)