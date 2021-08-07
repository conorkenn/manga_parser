const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  try {
    const browser = await puppeteer.launch({
      ignoreHTTPSErrors: true,
      headless: false
    });
    const page = await browser.newPage();

    //starting page
    await page.goto(
      "https://tokyorevengersmanga.com/manga/tokyo-manji-revengers-vol-1-chapter-1-reborn/"
    );
    
    let i = 0;
   
    
    while(i < 3){
        console.log("page has loaded")
        const chapter = await page.evaluate(() => {
        const pages = Array.from(
            document.querySelectorAll("img.aligncenter")
        ).map((image) => image.getAttribute("src"));
        return pages
        });

        fs.writeFileSync("./data.json", JSON.stringify(chapter));
        //fs.appendFile("./data.json", JSON.stringify(chapter))
        //console.log("File is created!");

        const next = await page.$$(".next-prev-text");
        const [popup] = await Promise.all([
        new Promise((resolve) => page.once('popup', async p => {
            await p.waitForNavigation({
            waitUntil: 'networkidle0'
            });
            resolve(p);
        })),
        console.log(i + " " + next),
        next[1].click()
        ]);
        
    }

    // do your job on the next page with 'popup' here

    await browser.close();
  } catch (error) {
    console.log(error);
  }
})();
