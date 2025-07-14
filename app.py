from flask import Flask, render_template, send_from_directory, jsonify, request
from flask_cors import CORS
import os
import logging
from dotenv import load_dotenv
load_dotenv()

app = Flask(
    __name__,
    static_folder="static",
    template_folder="."
)

CORS(app)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@app.route('/')
def index():
    """Render main page"""
    return render_template("index.html")


@app.route('/health')
def health():
    """Health check endpoint"""
    return jsonify(status="ok"), 200


@app.route('/static/<path:filename>')
def static_files(filename):
    """Serve static files"""
    static_path = os.path.join(app.static_folder, filename)
    if os.path.isfile(static_path):
        return send_from_directory(app.static_folder, filename)
    logger.warning(f"Static file not found: {filename}")
    return render_template("404.html"), 404


@app.route('/favicon.ico')
def favicon():
    """Serve favicon"""
    favicon_path = os.path.join(app.static_folder, "favicon.ico")
    if os.path.isfile(favicon_path):
        return send_from_directory(app.static_folder, "favicon.ico")
    return '', 204


@app.route('/robots.txt')
def robots():
    """Serve robots.txt"""
    robots_path = os.path.join(app.static_folder, "robots.txt")
    if os.path.isfile(robots_path):
        return send_from_directory(app.static_folder, "robots.txt")
    return '', 204


@app.route('/sitemap.xml')
def sitemap():
    """Serve sitemap.xml"""
    sitemap_path = os.path.join('.', 'sitemap.xml')
    if os.path.isfile(sitemap_path):
        return send_from_directory('.', 'sitemap.xml')
    return '', 204


@app.route('/<path:path>')
def catch_all(path):
    """
    Catch-all route: serve static file if exists,
    otherwise render index.html (SPA fallback)
    """
    static_path = os.path.join(app.static_folder, path)
    if os.path.isfile(static_path):
        return send_from_directory(app.static_folder, path)

    logger.info(f"Fallback route triggered for path: {path}")
    return render_template("index.html")


@app.errorhandler(404)
def page_not_found(e):
    """Custom 404 page"""
    logger.warning(f"404 Error: {request.url}")
    return render_template("404.html"), 404


@app.errorhandler(500)
def internal_server_error(e):
    """Custom 500 page with error logging"""
    logger.error(f"500 Error: {e} on {request.url}")
    return render_template("500.html"), 500


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    debug_mode = os.environ.get("FLASK_ENV", "").lower() == "development"
    app.run(host="0.0.0.0", port=port, debug=debug_mode)