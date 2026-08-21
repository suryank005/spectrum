import http.server
import socketserver
import os
import sys

PORT = 3000

class CleanUrlHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Extract path without query parameters or hash
        clean_path = self.path.split('?')[0].split('#')[0]
        
        # Check if the clean path exists on disk
        target_path = self.translate_path(clean_path)
        if not os.path.exists(target_path) and not clean_path.endswith('/'):
            # If path + .html exists, rewrite self.path
            html_target = self.translate_path(clean_path + '.html')
            if os.path.exists(html_target):
                if '?' in self.path:
                    _, query = self.path.split('?', 1)
                    self.path = clean_path + '.html?' + query
                else:
                    self.path = clean_path + '.html'
                    
        return super().do_GET()

if __name__ == '__main__':
    socketserver.TCPServer.allow_reuse_address = True
    print(f"Serving HTTP with Clean URLs support on http://localhost:{PORT}", flush=True)
    with socketserver.TCPServer(("", PORT), CleanUrlHandler) as httpd:
        httpd.serve_forever()
