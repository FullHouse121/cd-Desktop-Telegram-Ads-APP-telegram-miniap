from flask import Flask, render_template, send_from_directory, jsonify
from flask_cors import CORS
import os

app = Flask(
    __name__,
    static_folder="static",
    template_folder="."
)


CORS(app)


@app.route('/')
def index():
    return render_template("index.html")


@app.route('/health')
def health():
    return jsonify(status="ok"), 200


@app.route('/static/<path:filename>')
def static_files(filename):
    static_path = os.path.join(app.static_folder, filename)
    if os.path.isfile(static_path):
        return send_from_directory(app.static_folder, filename)
    return render_template("404.html"), 404


@app.route('/favicon.ico')
def favicon():
    favicon_path = os.path.join(app.static_folder, "favicon.ico")
    if os.path.isfile(favicon_path):
        return send_from_directory(app.static_folder, "favicon.ico")
    return '', 204


@app.route('/<path:path>')
def catch_all(path):
    static_path = os.path.join(app.static_folder, path)
    if os.path.isfile(static_path):
        return send_from_directory(app.static_folder, path)
    return render_template("index.html")


@app.errorhandler(404)
def page_not_found(e):
    return render_template("404.html"), 404


@app.errorhandler(500)
def internal_server_error(e):
    return render_template("500.html"), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    debug_mode = os.environ.get("FLASK_ENV", "").lower() == "development"
    app.run(host="0.0.0.0", port=port, debug=debug_mode)