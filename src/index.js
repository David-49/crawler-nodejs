import axios from "axios";
import http from "http";
import cheerio from "cheerio";

const url = "https://www.google.com";

async function main() {
  const pageHTML = await axios.get(url);
  const visitedURLs = [];

  const $ = cheerio.load(pageHTML);
  const title = $("title").text();
  console.log("Titre: " + title);

  //   console.log(pageHTML);
}

main();

// const server = http.createServer();

// server.listen(4000, "localhost");
// server.on("listening", () => {
//   console.log("Serveur démarré : http://localhost:4000/");
// });
