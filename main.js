!function(){const e=require("path"),{app:n,BrowserWindow:o,ipcMain:t}=require("electron"),{getRandomNumberBetween:s}=require("./preload/util.js"),a=require("./preload/flags.js");let i=null,r=!1;const{headless:l,dev:u,multiUser:c,userName:w,UA:d}=a();let p=void 0;w?p=`persist:${w}`:!c&&n.requestSingleInstanceLock()||(p=`${Math.random()}`),n.commandLine.appendSwitch("autoplay-policy","no-user-gesture-required"),n.on("window-all-closed",function(){n.quit()}),n.on("ready",function(){if((i=new o({title:"Fuck 学习强国",width:1e3,height:600,show:!1,icon:e.join(__dirname,"logo.png"),webPreferences:{nodeIntegration:!1,webSecurity:!l,preload:e.join(__dirname,"preload/preload.js"),partition:p}})).setMenu(null),u&&i.webContents.openDevTools(),d)i.webContents.setUserAgent(d);else{const e=i.webContents.getUserAgent().replace(/\w+-xuexiqiangguo.+? /,"").replace(/Electron.+? /,"");i.webContents.setUserAgent(e)}i.loadURL("https://www.xuexi.cn/"),i.once("ready-to-show",()=>{i.show()}),i.on("closed",()=>{i=null}),i.webContents.on("new-window",(e,n)=>{e.preventDefault(),i.webContents.loadURL(n)}),i.webContents.setAudioMuted(!0),setInterval(async()=>{await new Promise(e=>{setTimeout(()=>{e()},1e3*s(0,2e3))}),r||i.webContents.reload()},864e5)}),t.on("lock",()=>{r=!0}),t.on("unlock",()=>{r=!1}),t.on("islocked",e=>{e.returnValue=r});let g=[];t.on("tasks-getAll",e=>{e.returnValue=g}),t.on("tasks-set",(e,n)=>{g=n}),t.on("tasks-add",(e,...n)=>{u&&console.log(n),g.push(...n)}),t.on("isHeadless",e=>{e.returnValue=l}),t.on("log",(e,...n)=>{console.log(...n)});t.on("save-cookies",async()=>{const e=i.webContents.session.cookies,n=i.webContents.getURL(),o=+new Date/1e3+31536e4,t=t=>{e.set({url:n,...t,expirationDate:o},e=>{if(e)throw e})};e.on("changed",(e,n,o)=>{"__UID__"!=n.name&&"token"!=n.name||!("expired"==o||"explicit"==o&&(e=>(e-+new Date/1e3)/86400/365)(n.expirationDate)<8)||(u&&console.log([e,n,o]),t(n))}),(await(()=>new Promise((n,o)=>{e.get({domain:"xuexi.cn"},(e,t)=>{e?o(e):n(t.filter(e=>"__UID__"==e.name||"token"==e.name))})}))()).forEach(e=>{t(e)})})}();