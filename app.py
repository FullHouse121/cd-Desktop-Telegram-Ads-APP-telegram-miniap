from flask import Flask, render_template, send_from_directory, jsonify
from flask_cors import CORS
import os


app = Flask(__name__, static_folder="static", template_folder=".")
CORS(app)  


@app.route('/')
def index():
    return render_template("index.html")


@app.route('/static/<path:filename>')
def static_files(filename):
    return send_from_directory("static", filename)


@app.route('/favicon.ico')
def favicon():
    return send_from_directory("static", "favicon.ico")


@app.route('/<path:path>')
def catch_all(path):
    return render_template("index.html")


@app.errorhandler(404)
def page_not_found(e):
    return render_template("404.html"), 404


@app.errorhandler(500)
def internal_server_error(e):
    return render_template("500.html"), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)