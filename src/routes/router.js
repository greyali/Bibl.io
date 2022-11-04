const express = require("express");
const libgen = require("libgen");
const router = express.Router();

router.get("/hello", async (_req, res) => {
  res.status(200).json({ message: "Hello World!" });
});

router.get("/libgen/?:search", async (_req, res) => {
  console.log("req received in the backend with param: ", _req.params.search);
  const search = _req.params.search;
  const mirrorURL = await libgen.mirror();
  console.log(mirrorURL);
  const options = {
    mirror: mirrorURL,
    query: search,
    count: 52,
    sort: "author",
    reverse: true,
  };

  const results = [];
  try {
    const data = await libgen.search(options);
    data.forEach((item) => {
      results.push({
        title: item.title,
        author: item.author,
        year: item.year,
        language: item.language,
        extension: item.extension,
        md5: item.md5,
        downloadurl: `http://libgen.is/get.php?md5=${item.md5}`,
        google_id: item.Googlebookid,
        openlib_id: item.OpenLibraryID,
        description: item.descr,
      });
    });
    res.status(200).json({ message: results });
  } catch (error) {
    results.push(error);
    res.status(200).json({ message: results });
  }
});

module.exports = router;
