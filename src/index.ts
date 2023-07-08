import http from "http";

export const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      data: "It Works!",
    }),
  );
});

const PORT = 3001;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
