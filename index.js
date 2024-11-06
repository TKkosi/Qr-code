import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

inquirer
    .prompt([
        {
            message: "TYPE IN YOUR URL", 
            name: "URL"
        },
    ])
    .then( (answers) => {
        const url = answers.URL;
        let fileName = url.split('/');
        fileName = fileName[2].split('.')[0];
        var qr_svg = qr.image(url);
        qr_svg.pipe(fs.createWriteStream(`${fileName}.png`));

        fs.writeFile("URL.txt", url, (err) => {
            if (err) throw err;
            console.log("the file has been saved!");
        } );
    })
    .catch( (error) => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
        } else {
            // Something else went wrong
        }               
    });