import puppeteer from 'puppeteer-core';
(async () => {
  try {
    const browser = await puppeteer.launch({ executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe' });
    const page = await browser.newPage();
    await page.goto('http://localhost:5173/');
    await new Promise(r => setTimeout(r, 2000));
    const html = await page.content();
    console.log('HTML SNIPPET:');
    console.log(html.substring(0, 800));
    const rootHasChildren = await page.$eval('#root', el => el.children.length > 0);
    console.log('Root has children?', rootHasChildren);
    const bodyStyles = await page.$eval('body', el => getComputedStyle(el).display);
    console.log('Body display:', bodyStyles);
    await browser.close();
  } catch (e) { console.error(e); }
})();
