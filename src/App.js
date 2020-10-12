import React, {useState} from 'react';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {Button} from "@material-ui/core";
const App = () => {
    let [disBut, disButTog] = useState(false);
    return (
        <Grid alignItems="center" justify="center" container>
            <Paper style={{padding: "15px"}}>
                <form action="">
                    <Grid direction="column" container>
                        <TextField id="offset" label="Корды в формате 50x50"
                                   defaultValue={localStorage.offset}
                                   onChange={()=>
                                       localStorage.offset = document.getElementById("offset").value}/>
                        <TextField id="link" label="Ссылочка (через пробел если несколько)"
                                   defaultValue={localStorage.links}
                                  onChange={()=>
                                      localStorage.links = document.getElementById("link").value}/>
                        <Button
                            containerElement='label'
                            label='Фоточка png с артом'>
                            <input type="file" onChange={toDataURL}/>
                        </Button>
                        <Button disabled={disBut} onClick={() => {
                            disButTog(true);
                            const wssLinks = localStorage.links.split(" ");
                            const PixelBot = require('./core')
                            const Store = require('./store')
                            ;(async () => {
                                console.log('> Производится запуск [PixelX - github.com/aeonixlegit/PixelX]')
                                console.log('> Переписано на React [by hevav]')
                                await Store.load()
                                wssLinks.forEach((link)=> {
                                    new PixelBot(link, Store, wssLinks.indexOf(link), wssLinks.length)
                                })
                            })()
                        }}>
                            {!disBut && "клик сюда (ня)"}
                            {disBut && "закрой страницу для выхода"}
                        </Button>
                    </Grid>
                </form>
            </Paper>
            <img id="previewImg" src={localStorage.photoUrl}/>
            <canvas id="canvas228"/>
        </Grid>
    );
}

const toDataURL = file => {
    let input = file.target;

    let reader = new FileReader();
    reader.onload = function(){
        let dataURL = reader.result;
        localStorage.photoUrl = dataURL;
        document.getElementById('previewImg').src = dataURL;
    };
    reader.readAsDataURL(input.files[0]);
}

export default App;
