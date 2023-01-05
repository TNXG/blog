function reloadhello() {
    document.getElementById("xineyc_hello").innerHTML = hello();
}

function hello() {
    now = new Date(), hour = now.getHours()
    if (hour > 22) {
        return ("须弥的夜晚......")
    } else if (hour > 19) {
        return ("博士，傍晚了，太阳开始下山了，我们的一天又将要过去了。")
    } else if (hour > 17) {
        return ("博士，下午好！罗德岛目前的航行数据十分正常，您大可放心。")
    } else if (hour > 14) {
        return ("博士，中午好！我可以冒昧的问一下您中午午饭吃的是什么吗？")
    } else if (hour > 12) {
        return ("博士，上午好！请问上午安排的工作完成了么？")
    } else if (hour > 9) {
        return ("博士，早上好！一日之计在于晨！")
    } else if (hour > 6) {
        return ("博士，天还很早，还可以在休息会哦！")
    } else if (hour > 4) {
        return ("博士起来吃泡面了啊，要我帮你么？")
    } else if (hour > 3) {
        return ("哼哼，格里芬的人形们今天也很努力哦......")
    } else if (hour > 2) {
        return ("天晚了，博士。该休息了，早睡早起才会有好身体哟。")
    } else {
        return ("博士。快睡觉！您都不看看现在几点钟了。这个样子，您明天工作会没有精神的！")
    }
}

console.log(`
     _  __   _              __  __    
    | |/ /  (_)  ___    __  \ \/ /  ____
    |   /  / / / __ \  / _ \ \ \/ / /___/
   /   |  / / / / / / /  __/ / / / /____
  /_/|_/ /_/ /_ //_/  \___/ /_/  \_____/  
                                           
    `)
