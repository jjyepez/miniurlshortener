const router = require('express').Router();
const path = require('path');
const fs = require('fs');

router

    .get('/list', (req, res, next) => {
        const url = path.join(__dirname, '../data/urls.json');
        res.sendFile(url);
    })

    .get('/:urlCode', (req, res, next) => {
        const urlCode = req.params['urlCode'];
        const query = req.query;
        const jsonUrl = path.join(__dirname, '../data/urls.json');
        if (Object.keys(query).length === 0) {
            const urls = fs.readFileSync(jsonUrl);
            const json = JSON.parse(urls.toString()) || {};
            if (!json[urlCode]) {
                res.status(404);
                res.send('404');
                return;
            }
            const redirectToUrl = json[urlCode].location;
            json[urlCode].visits++;
            fs.writeFileSync(jsonUrl, JSON.stringify(json));

            res.redirect(redirectToUrl);
            return;
        } else {
            const urls = fs.readFileSync(jsonUrl);
            const newUrl = req.query['url'] || 401;
            const json = JSON.parse(urls.toString()) || {};
            json[urlCode] = {
                location: newUrl,
                visits: 0
            };
            fs.writeFileSync(jsonUrl, JSON.stringify(json));
            res.send(`Short url created at ${urlCode}, will redirect to ${newUrl}`)
        }
    })

module.exports = router;