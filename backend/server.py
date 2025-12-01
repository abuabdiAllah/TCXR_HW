import json
from http.server import BaseHTTPRequestHandler, HTTPServer

SERVER_PORT = 3080
# Load JSON files at startup
with open("./testdata/studentlist.json") as f:
    student_list = json.load(f)

with open("./testdata/institutionlist.json") as f:
    institution_list = json.load(f)



class SimpleServer(BaseHTTPRequestHandler):

    def _set_headers(self, status=200):
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "*")
        self.send_header("Access-Control-Allow-Headers", "*")
        self.end_headers()

    # Handle OPTIONS (CORS preflight)
    def do_OPTIONS(self):
        self._set_headers()

    # ---------------------------
    # Handle GET routes
    # ---------------------------
    def do_GET(self):
        path = self.path
        print(path)
        match(path):
            case "/api/students":
                self._set_headers()
                self.wfile.write(json.dumps(student_list).encode("utf-8"))

            case "/api/institutions":
                self._set_headers()
                self.wfile.write(json.dumps(institution_list).encode("utf-8"))

            case _:
                self._set_headers(404)
                self.wfile.write(json.dumps({"error": "Not Found"}).encode("utf-8"))

    # ---------------------------
    # Handle POST routes
    # ---------------------------
    def do_POST(self):
        path = self.path
        match(path):
            case "/api/students":
                # Read request body (if needed)
                content_length = int(self.headers.get("Content-Length", 0))
                post_body = self.rfile.read(content_length).decode("utf-8")

                # Mimic Express behavior: return empty JSON {}
                self._set_headers()
                self.wfile.write(json.dumps({}).encode("utf-8"))
            case _:
                self._set_headers(404)
                self.wfile.write(json.dumps({"error": "Not Found"}).encode("utf-8"))


# Run the server
def run(port=SERVER_PORT):
    server = HTTPServer(("localhost", port), SimpleServer)
    print(f"Mock server running on http://localhost:{port}")
    server.serve_forever()


if __name__ == "__main__":
    run()
