import axios from "axios";
import { con } from "./mysql_connection.js";
import mysql from "mysql";
import getHrefs from "get-hrefs";

//let urlRegex = /(\b(https?):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;

function sliceIntoChunks(arr, chunkSize) {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    res.push(chunk);
  }
  return res;
}

async function fetchAndInsert(url) {
  const response = await axios.get(url);
  const body = await response.data;

  const urls = getHrefs(body, { baseUrl: url });

  const sqlQuery = `INSERT INTO data_scrapped (url, body) VALUES (
  ${mysql.escape(url)}, 
  ${mysql.escape(body)}
  )`;

  con.query(sqlQuery, (error, results, fields) => {
    if (error) {
      return console.error("Error:", error.message);
    }
    console.log(results);
  });

  const uniqUrls = Array.from(new Set(urls));

  return sliceIntoChunks(uniqUrls, 100);
}

async function main(url) {
  const urls = await fetchAndInsert("https://en.wikipedia.org/wiki/Main_Page");

  urls.forEach((urlBatch) => {
    urlBatch.forEach((url) => {
      fetchAndInsert(url);
    });
  });
}

main();
