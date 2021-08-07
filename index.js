const fs = require("fs");
const puppeteer = require("puppeteer");

(async () => {
    try{
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        //specify chapter page url
        await page.goto(
            "https://tokyorevengersmanga.com/manga/tokyo-manji-revengers-vol-1-chapter-1-reborn/"
        );

        console.log("page has loaded")

        const chapter = await page.evaluate(() => {
            const pages = Array.from(
                document.querySelectorAll("img.aligncenter")
            ).map((image) => image.getAttribute("src"));


            return pages
        });

        fs.writeFileSync("./data.json", JSON.stringify(chapter));
        console.log("File is created!");

       
        const nextPage = await page.evaluate(() => {
            var obj = document.querySelectorAll("span.next-prev-text");

            return obj[1];
        })

        await page.click(nextPage);
        await page.waitForNavigation();

        console.log("on 2nd page?")
        

        
        await browser.close();


    }catch(error){
        console.log(error);
    }
/*
    fs.readFile('./data.json', 'utf-8', (err,data) => {
        if(err){
            console.log('error reading file', err);
            return;
        }try{
            const value = JSON.parse(data);
            console.log(value);
        }catch(err){
            console.log(err);
        }
    }) ;*/

})();






