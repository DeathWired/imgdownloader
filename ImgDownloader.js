const download = require('images-downloader').images;
const dest = './images'
const url = 'https://www.pexels.com/'
const rl = require('readline-sync');
var query = rl.question("what do you want to search? ")
var query2 = rl.question('How many images do you want? (numbers only) ')

const puppeteer = require('puppeteer');
(async () => {
    //Launching/letting you choose to see chrome or not (false/true)
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
  
    try{
    await page.goto(url);
    await page.type('#search', query)
    await page.keyboard.press('Enter')
    await page.waitForNavigation();
    const issueSrcs = await page.evaluate(() => {
      const srcs = Array.from(
        document.querySelectorAll(".photo-item__img")
      ).map((image) => image.getAttribute("src"));
      return srcs;
    });
    images = Array.from(issueSrcs)
    images = images/*.map(images => images.split('?')[0])*/.slice(0,query2);
    download(images, dest)
  .then(result => {
    console.log('images downloaded')
    })
    .catch(error => console.log("downloaded error", error))	
    //console.log(images);
    console.log('Done')
    await browser.close();
  }
    catch{
    console.log('error')
    await page.setViewport({width:1920, height:1080});
    await page.screenshot({path: 'error.png', fullpage:true});
  await browser.close();
    }
})();