from flask import Flask

app = Flask(__name__)


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


# port_number = 5000

if __name__ == "__main__":
    # app.run(debug=True , port=port_number)
    app.run(debug=True, host='0.0.0.0')
